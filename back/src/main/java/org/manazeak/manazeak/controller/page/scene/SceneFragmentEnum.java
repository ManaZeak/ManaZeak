package org.manazeak.manazeak.controller.page.scene;

/**
 * Contains all the urls of the scene.
 */
public enum SceneFragmentEnum {
    MAIN_PAGE("fragments/scene/mainpage.html");

    private final String page;

    SceneFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
