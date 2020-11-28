package org.manazeak.manazeak.controller.html.fragment.user.wish;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.response.ResponseFragmentEnum;
import org.manazeak.manazeak.controller.page.user.wish.WishFragmentEnum;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.manazeak.manazeak.service.message.MessageManager;
import org.manazeak.manazeak.service.security.user.wish.WishService;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    @GetMapping("/wish")
    public String getModalWishUserCreation(Model model) {
        model.addAttribute("wish", new UserWishDto());
        return WishFragmentEnum.WISH_CREATION.getPage();
    }

    /**
     * Save the user wishes into the database if the input is correct.
     *
     * @return the page.
     */
    @RestSecurity(PrivilegeEnum.WISH)
    @PostMapping("/wish")
    public String saveUserWish(@ModelAttribute("wish") @Valid UserWishDto wish, BindingResult result, Model model) {
        // Returning into the modal of wish creation.
        if (result.hasErrors()) {
            return WishFragmentEnum.WISH_CREATION.getPage();
        }
        // Creating a wish for the user.
        wishService.saveCurrentUserWish(wish);
        model.addAttribute("message", messageManager.getMessage("user.wish.success"));
        model.addAttribute("title", messageManager.getMessage("user.wish.title"));
        // Returns a JSON with the status.
        return ResponseFragmentEnum.EMPTY_PAGE.getPage();
    }
}
