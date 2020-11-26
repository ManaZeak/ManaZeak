package org.manazeak.manazeak.controller.html.fragment.user.wish;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.GeneralFragmentEnum;
import org.manazeak.manazeak.controller.page.user.wish.WishFragmentEnum;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.manazeak.manazeak.service.security.user.wish.WishService;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    public WishCreationFragment(WishService wishService) {
        this.wishService = wishService;
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
    public String saveUserWish(@RequestBody @Valid UserWishDto wish, BindingResult result) {
        // Returning into the modal of wish creation.
        if (result.hasErrors()) {
            return WishFragmentEnum.WISH_CREATION.getPage();
        }
        // Creating a wish for the user.
        wishService.saveCurrentUserWish(wish);
        // Returns an empty fragment in case of success.
        return GeneralFragmentEnum.EMPTY_PAGE.getPage();
    }
}
