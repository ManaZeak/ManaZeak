package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;

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

    private List<ScannedArtistDto> artists = new ArrayList<>();

    private ScannedArtistDto artistFolder = null;

    private String albumFolder = null;

    @Override
    public FileVisitResult preVisitDirectory(Path path, BasicFileAttributes basicFileAttributes) throws IOException {
        // The first directory encountered is the artist folder.
        if (artistFolder == null) {
            artistFolder = new ScannedArtistDto(path.getFileName().toString());
        } else if (albumFolder == null) {
            albumFolder = path.getFileName().toString();
        } else {
            // No further directories expected.
            throw new MzkRuntimeException("Library folder nested too deep.", "");
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFile(Path path, BasicFileAttributes basicFileAttributes) throws IOException {
        return null;
    }

    @Override
    public FileVisitResult visitFileFailed(Path path, IOException e) throws IOException {
        return null;
    }

    @Override
    public FileVisitResult postVisitDirectory(Path path, IOException e) throws IOException {
        return null;
    }
}
