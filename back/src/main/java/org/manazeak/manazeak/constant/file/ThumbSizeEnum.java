package org.manazeak.manazeak.constant.file;

/**
 * Contains the different size of the thumbnails.
 */
public enum ThumbSizeEnum {

    TINY("tiny", 50, 50),
    SMALL("small", 128, 128),
    MEDIUM("medium", 256, 256),
    LARGE("large", 512, 512),
    ORIGINAL("orig", 0, 0);

    private final String folderName;

    private final int height;

    private final int width;

    ThumbSizeEnum(String folderName, int height, int width) {
        this.folderName = folderName;
        this.height = height;
        this.width = width;
    }

    public String getFolderName() {
        return folderName;
    }

    public int getHeight() {
        return height;
    }

    public int getWidth() {
        return width;
    }
}
