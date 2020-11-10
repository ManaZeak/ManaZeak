package org.manazeak.manazeak.controller.html.fragment.user.wish;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.user.wish.WishFragmentEnum;
import org.manazeak.manazeak.entity.dto.KommunicatorObject;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;

/**
 * Controller used to create a wish for a user.
 */
@FragmentController
public class WishCreationFragment {

    /**
     * Get the modal for creating the user information.
     *
     * @param model the data contained inside the page.
     * @return the fragment for creating the wish.
     */
    @GetMapping("/wish")
    public String getModalWishUserCreation(Model model) {
        model.addAttribute("wish", new UserWishDto());
        return WishFragmentEnum.WISH_CREATION.getPage();
    }

    /**
     * Save the user wishes into the database if the input is correct.
     * @return the page.
     */
    public String saveUserWish() {

    }

    /**
     * Create a wish for the current user.
     *
     * @return The status of the request.
     */
    @RestSecurity(PrivilegeEnum.WISH)
    @PostMapping("/wish")
    public KommunicatorObject createWishForCurrentUser(@RequestParam @Valid UserWishDto wishDto) {
        wishService.saveCurrentUserWish(wishDto);
        return new KommunicatorObject();
    }

    private Model getWishCreationPage() {

    }
}
