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

    private static final Logger LOG = LoggerFactory.getLogger(AudioFileVisitor.class);
    private final List<ScannedArtistDto> artists = new ArrayList<>();
    private ScannedArtistDto artistFolder = null;
    private ScannedAlbumDto albumFolder = null;

    private boolean isFirstFolder = true;

    @Override
    public FileVisitResult preVisitDirectory(Path path, BasicFileAttributes basicFileAttributes) {
        // Skipping the .stdfolder, no music stored here.
        if (path.getFileName().toString().equals(".stdfolder")) {
            return FileVisitResult.SKIP_SUBTREE;
        }
        // Ignoring the starting folder.
        if (isFirstFolder) {
            isFirstFolder = false;
            return FileVisitResult.CONTINUE;
        }
        // The first directory encountered is the artist folder.
        if (artistFolder == null) {
            artistFolder = new ScannedArtistDto(path);
        } else if (albumFolder == null) {
            albumFolder = new ScannedAlbumDto(path.getFileName().toString());
        } else {
            // No further directories expected.
            throw new MzkRuntimeException("Library folder nested too deep.", "");
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFile(Path path, BasicFileAttributes basicFileAttributes) {
        // Adding the track to the current album
        if (FileUtil.isAudioFileByExtension(path)) {
            // Create the track with the information of the file.
            ScannedTrackDto track = new ScannedTrackDto(path, basicFileAttributes);
            // Adding the track to the album.
            albumFolder.addTrack(track);
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFileFailed(Path path, IOException e) throws IOException {
        LOG.error("Error during the walk in the path {}", path, e);
        throw e;
    }

    @Override
    public FileVisitResult postVisitDirectory(Path path, IOException e) {
        // Test if we are exiting the album folder.
        if (albumFolder != null) {
            // Adding the album to the current artist.
            artistFolder.addAlbum(albumFolder);
            // Clearing the album.
            albumFolder = null;
        } else if (artistFolder != null) {
            // Adding the artist to the list of artists.
            artists.add(artistFolder);
            // Clearing the artist
            artistFolder = null;
        }
        return FileVisitResult.CONTINUE;
    }

    public List<ScannedArtistDto> getArtists() {
        return artists;
    }
}
