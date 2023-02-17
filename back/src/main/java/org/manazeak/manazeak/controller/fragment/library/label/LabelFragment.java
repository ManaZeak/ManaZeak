package org.manazeak.manazeak.controller.fragment.library.label;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.library.label.LabelFragmentEnum;
import org.manazeak.manazeak.service.library.label.LabelService;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Contains the endpoints to get the label fragments.
 */
@FragmentController
@RequiredArgsConstructor
public class LabelFragment {

    private final LabelService labelService;

    /**
     * Send the information to display the information about a label.
     *
     * @param labelId The id of the label.
     * @param model   The object to build the HTML page.
     * @return The page path to build.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/library/label/{labelId}/")
    public String getLabelDetail(@PathVariable @NotNull(message = "general.error.no_id") @NumberFormat Long labelId,
                                 Model model) {
        model.addAttribute("label", labelService.getLabelDetail(labelId));

        return LabelFragmentEnum.LABEL_DETAIL.getPage();
    }

}
