package org.manazeak.manazeak.util.audio.tag;

import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.AudioHeader;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.FieldKey;
import org.jaudiotagger.tag.Tag;
import org.jaudiotagger.tag.TagException;
import org.jaudiotagger.tag.TagField;
import org.manazeak.manazeak.constant.tag.FieldsTagEnum;
import org.manazeak.manazeak.entity.dto.audio.AudioFileContainerDto;
import org.manazeak.manazeak.entity.dto.audio.AudioFileHeaderContainerDto;
import org.manazeak.manazeak.exception.MzkTagException;
import org.manazeak.manazeak.util.file.FormatFileCheckerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Path;
import java.util.logging.Level;

/**
 * Read the information contained in the track.
 */
public final class TagReaderUtil {

    private static final Logger LOG = LoggerFactory.getLogger(TagReaderUtil.class);

    static {
        // Disable loggers for jaudiotagger.
        java.util.logging.Logger[] pin = new java.util.logging.Logger[]{
                java.util.logging.Logger.getLogger("org.jaudiotagger")
        };

        for (java.util.logging.Logger l : pin)
            l.setLevel(Level.WARNING);
    }

    private TagReaderUtil() {

    }

    /**
     * Getting the data contained in the track tags.
     *
     * @param audioFilePath The path of the track.
     * @return The information about the file.
     * @throws MzkTagException Error when processing a tag.
     */
    public static AudioFileContainerDto extractTagFromAudioFile(Path audioFilePath) throws MzkTagException {
        // Reading the information from the track tag.
        AudioFile audioFile = getFileTag(audioFilePath);
        // Extract the tag from the headers of the audio file.
        AudioFileContainerDto container = extractAudioHeaderInformation(audioFile);
        // Extract the information from the tag of the file.
        extractAudioFile(container, audioFile, FormatFileCheckerUtil.isMp3File(audioFilePath));

        return container;
    }


    /**
     * Get the tag of a file.
     *
     * @param filePath The path of the track.
     * @return The information about the tag of the file.
     * @throws MzkTagException Error when processing tags.
     */
    private static AudioFile getFileTag(Path filePath) throws MzkTagException {
        try {
            // Reading the audio file and handles errors.
            return AudioFileIO.read(filePath.toFile());
        } catch (CannotReadException e) {
            throw new MzkTagException("Cannot read a tag of the file : " + filePath,
                    "error.tag.audio_frame", filePath.toString(), e);
        } catch (TagException e) {
            throw new MzkTagException("Error when reading the file : " + filePath, "error.tag.reading",
                    filePath.toString(), e);
        } catch (InvalidAudioFrameException e) {
            LOG.error("Audio frame error in the file : {}", filePath);
            throw new MzkTagException("Error when reading the file invalid audio frame for the file : " + filePath,
                    "error.tag.audio_frame", filePath.toString(), e);
        } catch (ReadOnlyFileException e) {
            LOG.error("The opened file : {} is read only mode", filePath);
            throw new MzkTagException("The file is in read-only mode : " + filePath, "error.tag.read_only",
                    filePath.toString(), e);
        } catch (IOException e) {
            throw new MzkTagException("IO Error when reading the file: " + filePath, "error.file_system.io_error",
                    filePath.toString(), e);
        }
    }

    /**
     * Extract the headers contained in the audio file.
     *
     * @param audioFile The information about the audio file that is extracted.
     * @return The information extracted from the audio file.
     */
    private static AudioFileContainerDto extractAudioHeaderInformation(AudioFile audioFile) {
        // Creating the audio file container.
        AudioFileContainerDto container = new AudioFileContainerDto();

        // Creating the headers of the file.
        AudioFileHeaderContainerDto extractedHeader = new AudioFileHeaderContainerDto();

        // Getting the information from the headers.
        AudioHeader header = audioFile.getAudioHeader();
        if (header != null) {
            extractedHeader.setBitrate(header.getByteRate());
            extractedHeader.setTrackLength(header.getPreciseTrackLength());
            extractedHeader.setSampleRate(header.getSampleRateAsNumber());
            extractedHeader.setSize(audioFile.getFile().length());
        }

        // Adding the headers into the container.
        container.setHeaders(extractedHeader);

        return container;
    }

    /**
     * Extract the information contained a audio file.
     *
     * @param container The container of the information extracted from the audio file.
     * @param audioFile The information about the track.
     * @param isMp3     If the track is a mp3.
     */
    private static void extractAudioFile(AudioFileContainerDto container, AudioFile audioFile, boolean isMp3) {
        // Reading the tag.
        Tag tag = audioFile.getTag();
        // Extracting the data that is shared between flac and mp3.
        container.setTitle(tag.getFirst(FieldKey.TITLE).trim());
        container.setArtist(tag.getFirst(FieldKey.ARTIST));
        container.setDate(tag.getFirst(FieldKey.YEAR).trim());
        container.setAlbum(tag.getFirst(FieldKey.ALBUM).trim());
        container.setGenre(tag.getFirst(FieldKey.GENRE).trim());
        container.setComposer(tag.getFirst(FieldKey.COMPOSER).trim());
        container.setAlbumArtist(tag.getFirst(FieldKey.ALBUM_ARTIST).trim());
        container.setCountry(tag.getFirst(FieldKey.COUNTRY).trim());
        container.setCompilation(tag.getFirst(FieldKey.IS_COMPILATION).trim());
        container.setLyrics(tag.getFirst(FieldKey.LYRICS).trim());
        // Getting the information for disk information
        container.setDiscNumber(tag.getFirst(FieldKey.DISC_NO).trim());
        container.setDiskTotal(tag.getFirst(FieldKey.DISC_TOTAL).trim());
        // Getting the information for track number information
        container.setTrackTotal(tag.getFirst(FieldKey.TRACK_TOTAL).trim());
        container.setTrackNumber(tag.getFirst(FieldKey.TRACK).trim());

        // If the file is an MP3
        if (isMp3) {
            extractSpecificMp3Tag(tag, container);
        } else {
            extractSpecificFlacTag(tag, container);
        }

        // Extracting the cover art from the file.
        TagField coverBinary = tag.getFirstField(FieldKey.COVER_ART);
        container.setCover(coverBinary);
    }


    /**
     * Extract the fields specific to the mp3 files.
     *
     * @param tag       The information about the tag.
     * @param container The information extracted from the tracks.
     */
    private static void extractSpecificMp3Tag(Tag tag, AudioFileContainerDto container) {
        // Getting the performer
        container.setPerformer(tag.getFirst(FieldKey.ORIGINAL_ARTIST).trim());
        container.setReleaseDate(tag.getFirst(FieldKey.ORIGINAL_YEAR).trim());
        // Getting the label
        container.setLabel(tag.getFirst(FieldKey.COPYRIGHT).trim());
        container.setProducer(tag.getFirst(FieldKey.RECORD_LABEL));
    }

    /**
     * Extract the tags specific to the flac files.
     *
     * @param tag       The information about the tag.
     * @param container contains the information about the track.
     */
    private static void extractSpecificFlacTag(Tag tag, AudioFileContainerDto container) {
        // Getting the performers.
        container.setPerformer(tag.getFirst(FieldsTagEnum.PERFORMER.name()).trim());
        // Getting the release date of the track.
        container.setReleaseDate(tag.getFirst(FieldsTagEnum.RELEASEDATE.name()).trim());
        container.setLabel(tag.getFirst(FieldKey.RECORD_LABEL).trim());
        container.setProducer(tag.getFirst(FieldKey.PRODUCER).trim());
    }
}