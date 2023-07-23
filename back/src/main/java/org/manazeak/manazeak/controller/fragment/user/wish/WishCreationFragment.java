package org.manazeak.manazeak.controller.fragment.user.wish;

import jakarta.validation.Valid;
import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.response.ResponseFragmentEnum;
import org.manazeak.manazeak.controller.page.user.wish.WishFragmentEnum;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.manazeak.manazeak.manager.MessageManager;
import org.manazeak.manazeak.service.security.user.wish.WishService;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * Controller used to create a wish for a user.
 */
@FragmentController
public class WishCreationFragment {

    /**
     * The service for manipulating wishes
     */
    private final WishService wishService;

    /**
     * Manager for manipulating messages.
     */
    private final MessageManager messageManager;

    public WishCreationFragment(WishService wishService, MessageManager messageSource) {
        this.wishService = wishService;
        this.messageManager = messageSource;
    }

    /**
     * Get the modal for creating the user information.
     *
     * @param model the data contained inside the page.
     * @return the fragment for creating the wish.
     */
    @RestSecurity(PrivilegeEnum.WISH)
    @GetMapping("/modal/wish/")
    public String getModalWishUserCreation(Model model) {
        model.addAttribute("wish", new UserWishDto());
        return WishFragmentEnum.WISH_CREATION.getPage();
    }

    /**
     * Save the user wishes into the database if the input is correct.
     *
     * @param model  The information contained in the page.
     * @param result Contains the information about the validations.
     * @param wish   The wish that must be saved.
     * @return the page.
     */
    @RestSecurity(PrivilegeEnum.WISH)
    @PostMapping("/modal/wish/")
    public String saveUserWish(@ModelAttribute("wish") @Valid UserWishDto wish, BindingResult result, Model model) {
        // Returning into the modal of wish creation.
        if (result.hasErrors()) {
            return WishFragmentEnum.WISH_CREATION.getPage();
        }
        // Creating a wish for the user.
        wishService.saveCurrentUserWish(wish);
        model.addAttribute("title", messageManager.getMessage("modal.wish.log.title"));
        model.addAttribute("message", messageManager.getMessage("modal.wish.log.message"));
        // Returns a JSON with the status.
        return ResponseFragmentEnum.SUCCESS_RESPONSE.getPage();
    }
}
