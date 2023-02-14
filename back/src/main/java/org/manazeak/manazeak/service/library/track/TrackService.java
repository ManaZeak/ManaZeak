package org.manazeak.manazeak.service.library.track;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.track.Track;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.util.HashUtil;
import org.manazeak.manazeak.util.file.FileUtil;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

/**
 * Allows to handle the tracks of the application.
 */
@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackDAO trackDAO;


    /**
     * Get a track with its id. Throws an exception if the track doesn't exists.
     *
     * @param trackId The id of the track.
     * @return The track.
     */
    public Track getTrackById(Long trackId) {
        return trackDAO.findById(trackId)
                .orElseThrow(MzkExceptionHelper.generateSupplierObjectNotFoundException("user.track.not_found"));
    }

    /**
     * Delete the moodbar of a track.
     *
     * @param trackId The id of the track associated to the moodbar.
     */
    public void regenerateMoodbar(Long trackId) {
        // Getting the track by its id.
        Track track = getTrackById(trackId);
        // Checking if the track mood exists.
        Path moodFile = ResourcePathEnum.MOOD_FOLDER.getPath().resolve(
                HashUtil.getMd5HashLower(track.getLocation()) + FileExtensionEnum.MOOD.getExtension());
        Path moodMetaFile = ResourcePathEnum.MOOD_METADATA_FOLDER.getPath().resolve(
                HashUtil.getMd5HashLower(track.getLocation()) + FileExtensionEnum.WEBP.getExtension());
        FileUtil.deleteFile(moodFile);
        FileUtil.deleteFile(moodMetaFile);
    }
}
