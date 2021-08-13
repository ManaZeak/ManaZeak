package org.manazeak.manazeak.manager.track.tag;

import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.FieldKey;
import org.jaudiotagger.tag.Tag;
import org.jaudiotagger.tag.TagException;
import org.manazeak.manazeak.entity.dto.audio.AudioFileContainerDto;
import org.manazeak.manazeak.exception.MzkTagException;
import org.manazeak.manazeak.util.file.FileUtil;
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
     * Get the tag of a file.
     *
     * @return The information about the tag of the file.
     */
    public AudioFile getFileTag(Path filePath) throws MzkTagException {
        try {
            // Reading the audio file and handles errors.
            return AudioFileIO.read(filePath.toFile());
        } catch (CannotReadException e) {
            LOG.error("Cannot read the audio file.", e);
            throw new MzkTagException("Cannot read a tag of the file : " + filePath,
                    "error.tag.audio_frame", filePath.toString(), e);
        } catch (TagException e) {
            LOG.error("Error when reading tag", e);
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
     * @return The information extracted.
     */
    public AudioFileContainerDto extractAudioFile(Tag tag) {
        // Extracting the cover art from the file.
        tag.getFirst(FieldKey.COVER_ART);
        return null;
    }

}
