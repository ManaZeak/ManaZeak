package org.manazeak.manazeak.constant.file;

import com.google.inject.internal.util.ImmutableList;
import org.manazeak.manazeak.exception.MzkFileFormatException;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

public enum FileMagicNumberEnum {
    JPG(FileExtensionEnum.JGP, 0xFF, 0xD8, 0xFF),
    PNG(FileExtensionEnum.PNG, 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A);

    private final FileExtensionEnum extension;
    private final ImmutableList<Integer> magicNumbers;

    /**
     * Build the magic number information.
     *
     * @param extension    the associated extension.
     * @param magicNumbers the bytes associated to the magic number.
     */
    FileMagicNumberEnum(FileExtensionEnum extension, Integer... magicNumbers) {
        this.extension = extension;
        this.magicNumbers = ImmutableList.copyOf(Arrays.asList(magicNumbers));
    }

    /**
     * Get the file extension.
     *
     * @param file The file to check.
     * @return the file extension of the given file.
     */
    public static FileExtensionEnum getFileExtension(MultipartFile file) throws MzkFileFormatException {
        // Checking for each format the values.
        for (FileMagicNumberEnum magic : FileMagicNumberEnum.values()) {
            // Reading the file just uploaded.
            try (InputStream stream = file.getInputStream()) {
                int byteLength = magic.getMagicNumbers().size();
                // Creating a table of the number of bytes required to the check.
                byte[] bytes = new byte[byteLength];
                // Checking if we can read the good amount of bytes.
                if (stream.read(bytes, 0, byteLength) != byteLength) {
                    // Skipping to the next value.
                    continue;
                }
                // Checking the magic numbers on a file.
                if (isMagicByteValid(bytes, magic.getMagicNumbers())) {
                    return magic.getExtension();
                }
            } catch (IOException e) {
                throw new MzkRuntimeException("error.file_system.io_error", "error.file_system.io_error_title", e);
            }
        }
        // No format has been found for the file, sending an exception.
        throw new MzkFileFormatException("The file doesn't have any recognized format.");
    }

    /**
     * Check that a file has all the correct magic bytes. To define it's type.
     *
     * @param bytes      The bytes contained inside the file.
     * @param magicBytes The expected magic bytes for the format.
     * @return True if the magic bytes match, false otherwise.
     */
    private static boolean isMagicByteValid(byte[] bytes, List<Integer> magicBytes) {
        boolean isValid = true;
        for (int i = 0; i < bytes.length; ++i) {
            if (Byte.toUnsignedInt(bytes[i]) != magicBytes.get(i)) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    public FileExtensionEnum getExtension() {
        return extension;
    }

    public ImmutableList<Integer> getMagicNumbers() {
        return magicNumbers;
    }
}
