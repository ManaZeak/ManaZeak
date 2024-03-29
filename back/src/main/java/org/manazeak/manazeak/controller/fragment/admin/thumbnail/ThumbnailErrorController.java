package org.manazeak.manazeak.controller.fragment.admin.thumbnail;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.manazeak.manazeak.entity.dto.admin.thumbnail.ThumbnailErrorCriteriaDto;
import org.manazeak.manazeak.service.library.thumb.ThumbnailService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Allows to interact with the thumbnail error for the UI.
 */
@RequiredArgsConstructor
@FragmentController
@Slf4j
public class ThumbnailErrorController {

    private final ThumbnailService thumbnailService;

    /**
     * Get the page containing the base element of the page.
     *
     * @return The page containing the static elements for the thumbnail errors.
     */
    @Security(PrivilegeEnum.ADMV)
    @GetMapping("/admin/thumb/layout/")
    public String getThumbnailErrorCommonPage() {
        return AdminFragmentEnum.THUMBNAIL_ERROR_BASE.getPage();
    }

    /**
     * Get the page containing the list of the errors of thumbnails.
     *
     * @param criteria The criteria to apply to the request.
     * @return The page containing the list of thumbnails error.
     */
    @Security(PrivilegeEnum.ADMV)
    @PostMapping("/admin/thumb/list/")
    public String getThumbnailList(@RequestBody @NotNull ThumbnailErrorCriteriaDto criteria,
                                   Model model) {
        model.addAttribute("size", thumbnailService.getThumbnailErrorNumbersByCriteria(criteria));
        model.addAttribute("errors", thumbnailService.getThumbnailErrorByCriteria(criteria));
        return AdminFragmentEnum.THUMBNAIL_ERROR_LIST.getPage();
    }
}
