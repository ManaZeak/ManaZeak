package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.entity.dto.library.scan.ScannedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedTrackDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.file.FileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.FileVisitor;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.List;

/**
 * Controls the actions that must be done when iterating through the files and folders.
 */
public class AudioFileVisitor implements FileVisitor<Path> {

    /**
     * Logger for the visitor.
     */
    private static final Logger LOG = LoggerFactory.getLogger(AudioFileVisitor.class);

    /**
     * The list of scanned artist encountered during the library scan.
     */
    private final List<ScannedArtistDto> artists = new ArrayList<>();

    /**
     * The list of covers found during the library scan.
     */
    private final List<Path> coverPaths = new ArrayList<>();

    /**
     * The current artist folder during the scan.
     */
    private ScannedArtistDto currentArtistFolder = null;

    /**
     * The current album folder during the scan.
     */
    private ScannedAlbumDto currentAlbumFolder = null;

    /**
     * Boolean used to ignore the first folder of the library since nothing is extracted from it.
     */
    private boolean isFirstFolder = true;

    /**
     * Called before entering into a directory
     *
     * @param path                The current path.
     * @param basicFileAttributes The information about the directory.
     * @return The status of the visit.
     */
    @Override
    public FileVisitResult preVisitDirectory(Path path, BasicFileAttributes basicFileAttributes) {
        // Skipping the .stfolder, no music stored here.
        if (path.getFileName().toString().equals(".stfolder")) {
            return FileVisitResult.SKIP_SUBTREE;
        }
        // Ignoring the starting folder.
        if (isFirstFolder) {
            isFirstFolder = false;
            return FileVisitResult.CONTINUE;
        }
        // The first directory encountered is the artist folder.
        if (currentArtistFolder == null) {
            currentArtistFolder = new ScannedArtistDto(path);
        } else if (currentAlbumFolder == null) {
            currentAlbumFolder = new ScannedAlbumDto(path);
        } else {
            // No further directories expected. This exception will not be showed to the front.
            throw new MzkRuntimeException("Library folder nested too deep.");
        }
        return FileVisitResult.CONTINUE;
    }

    /**
     * Each file encountered by the visitor is processed here.
     * Add the tracks and the covers to the lists.
     *
     * @param path                The path of the current file.
     * @param basicFileAttributes The information about the file.
     * @return The status of the visit.
     */
    @Override
    public FileVisitResult visitFile(Path path, BasicFileAttributes basicFileAttributes) {
        // Adding the track to the current album
        if (FileUtil.isAudioFileByExtension(path)) {
            // Create the track with the information of the file.
            ScannedTrackDto track = new ScannedTrackDto(path, basicFileAttributes);
            // Adding the track to the album.
            currentAlbumFolder.addTrack(track);
        } else if (FileUtil.isCoverFileByExtension(path)) {
            // Adding the cover.
            coverPaths.add(path);
        }
        return FileVisitResult.CONTINUE;
    }

    /**
     * Handling an error when navigating through the files.
     *
     * @param path The path that caused the error.
     * @param e    The exception encountered.
     * @return nothing
     * @throws IOException The exception encountered when visiting a file or a folder.
     */
    @Override
    public FileVisitResult visitFileFailed(Path path, IOException e) throws IOException {
        LOG.error("Error during the walk in the path {}", path, e);
        throw e;
    }

    /**
     * Called when exiting a directory.
     *
     * @param path The current path.
     * @param e    Error when processing the sub elements.
     * @return The status of the visit.
     */
    @Override
    public FileVisitResult postVisitDirectory(Path path, IOException e) {
        // Test if we are exiting the album folder.
        if (currentAlbumFolder != null) {
            // Adding the album to the current artist.
            currentArtistFolder.addAlbum(currentAlbumFolder);
            // Clearing the album.
            currentAlbumFolder = null;
        } else if (currentArtistFolder != null) {
            // Adding the artist to the list of artists.
            artists.add(currentArtistFolder);
            // Clearing the artist
            currentArtistFolder = null;
        }
        return FileVisitResult.CONTINUE;
    }

    /**
     * @return The list of the artists found during the library folder scan.
     */
    public List<ScannedArtistDto> getArtists() {
        return artists;
    }

    /**
     * @return The list of the cover paths found during the library scan.
     */
    public List<Path> getCoverPaths() {
        return coverPaths;
    }
}
