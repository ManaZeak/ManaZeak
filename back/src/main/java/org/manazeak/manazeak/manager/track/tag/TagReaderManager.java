package org.manazeak.manazeak.manager.track.tag;

import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.FieldKey;
import org.jaudiotagger.tag.Tag;
import org.jaudiotagger.tag.TagException;
import org.jaudiotagger.tag.TagField;
import org.manazeak.manazeak.constant.tag.FieldsTagEnum;
import org.manazeak.manazeak.entity.dto.audio.AudioFileContainerDto;
import org.manazeak.manazeak.exception.MzkTagException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Path;

/**
 * Allows to read the tag of a audio file.
 */
public class TagReaderManager {

    private static final Logger LOG = LoggerFactory.getLogger(TagReaderManager.class);

    /**
     * Extract the fields specific to the mp3 files.
     * @param tag The informations about the 
     * @param container
     */
    private static void extractSpecificMp3Tag(Tag tag, AudioFileContainerDto container) {
        // Splitting the information for the disk number information.
        final String diskInfo = tag.getFirst(FieldKey.DISC_NO);
        if (diskInfo.contains("/")) {
            String[] listDiskInfo = diskInfo.split("/");
            container.setDiskNumber(listDiskInfo[0]);
            container.setDiskTotal(listDiskInfo[1]);
        } else {
            LOG.warn("The track {} by {} has an invalid disk information. ({})", container.getTitle(),
                    container.getArtist(), diskInfo);
        }
        // Splitting the information for the track number.
        final String trackNumberInfo = tag.getFirst(FieldKey.TRACK_TOTAL);
        if (trackNumberInfo.contains("/")) {
            String[] listDisk = trackNumberInfo.split("/");
            container.setTrackNumber(listDisk[0]);
            container.setTrackTotal(listDisk[1]);
        } else {
            LOG.warn("The track {} by {} has an invalid track number information ({})", container.getTitle(),
                    container.getArtist(), diskInfo);
        }
        // Getting the performer

    }

    /**
     * Extract the tags specific to the flac files.
     * @param tag The
     * @param container
     */
    private static void extractSpecificFlacTag(Tag tag, AudioFileContainerDto container) {
        // Getting the
        container.setPerformer(tag.getFirst(FieldsTagEnum.ORIGINAL_ARTIST.name()));

    }

    /**
     * Get the tag of a file.
     *
     * @return The information about the tag of the file.
     */
    public AudioFile getFileTag(Path filePath) throws MzkTagException {
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
     * Extract the information contained a audio file.
     *
     * @return The information extracted.
     */
    public AudioFileContainerDto extractAudioFile(Tag tag, boolean isMp3) {
        // Contains the data extracted from the audio file.
        final AudioFileContainerDto container = new AudioFileContainerDto();
        // Extracting the data that is shared between flac and mp3.
        container.setTitle(tag.getFirst(FieldKey.TITLE));
        container.setArtist(tag.getFirst(FieldKey.ARTIST));
        container.setDate(tag.getFirst(FieldKey.YEAR));
        container.setAlbum(tag.getFirst(FieldKey.ALBUM));
        container.setComposer(tag.getFirst(FieldKey.COMPOSER));

        // If the file is an MP3
        if (isMp3) {
            extractSpecificMp3Tag(tag, container);
        } else {

        }
        // Extracting the cover art from the file.
        TagField coverBinary = tag.getFirstField(FieldKey.COVER_ART);
        container.setCover(coverBinary);
        // Extracting the
        return container;
    }

}
