package org.manazeak.manazeak.datacreation.security.user;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.constant.security.RoleEnum;
import org.manazeak.manazeak.daos.reference.CountryDAO;
import org.manazeak.manazeak.daos.reference.LocaleDAO;
import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.RoleDAO;
import org.manazeak.manazeak.datacreation.security.invite.InviteCodeDataCreation;
import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.service.security.user.UserService;
import org.manazeak.manazeak.util.DateUtil;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * This class allows to create data for the unit tests.
 */
@Component
public class MzkUserDataCreation {

    private final UserService userService;

    private final MzkUserDAO mzkUserDAO;

    private final InviteCodeDataCreation inviteCodeDataCreation;

    private final InviteCodeDAO inviteCodeDAO;

    private final LocaleDAO localeDAO;

    private final CountryDAO countryDAO;

    private final RoleDAO roleDAO;

    public MzkUserDataCreation(UserService userService, InviteCodeDataCreation inviteCodeDataCreation,
                               InviteCodeDAO inviteCodeDAO, MzkUserDAO mzkUserDAO, LocaleDAO localeDAO,
                               CountryDAO countryDAO, RoleDAO roleDAO) {
        this.userService = userService;
        this.inviteCodeDataCreation = inviteCodeDataCreation;
        this.mzkUserDAO = mzkUserDAO;
        this.localeDAO = localeDAO;
        this.countryDAO = countryDAO;
        this.roleDAO = roleDAO;
        this.inviteCodeDAO = inviteCodeDAO;
    }

    /**
     * Creates a default user in the database.
     *
     * @return the user that was created.
     */
    public MzkUser createDefaultMzkUser() {
        MzkUser user = generateDefaultUser();
        mzkUserDAO.save(user);
        return user;
    }

    /**
     * Creates a modified user into the database.
     *
     * @return the user that was created.
     */
    public MzkUser generateModifiedUser() {
        MzkUser user = generateDefaultUser();
        user.setLocale(localeDAO.findById(UserTestConstants.LOCALE_ID_EDITED).get());
        user.setCountry(countryDAO.findById(UserTestConstants.COUNTRY_ID_EDITED).get());
        user.setName(UserTestConstants.NAME_EDITED);
        user.setBirthDate(DateUtil.parseString(UserTestConstants.BIRTH_DATE_EDITED, DateUtil.US_DATE_FORMATTER));
        user.setBio(UserTestConstants.BIO_EDITED);
        user.setMail(UserTestConstants.MAIL_EDITED);
        user.setSurname(UserTestConstants.SURNAME_EDITED);

        return user;
    }


    /**
     * Creates a new user with the specified parent.
     *
     * @param parent the user that will be the parent of the user.
     */
    public MzkUser createUserWithParent(MzkUser parent, String suffix) {
        final List<InviteCode> invites = inviteCodeDAO.getInviteCodesByParent(parent);
        // Looking for the active invite code
        InviteCode invite = null;
        for (InviteCode inv : invites) {
            if (inv.getIsActive()) {
                invite = inv;
            }
        }
        Assertions.assertNotNull(invite, "The invite code shouldn't be null.");

        // Create the new user
        MzkUser user = generateMzkUser(suffix + 3);
        // Setting the invite code of the user
        user.setInviteCode(invite);
        invite.setIsActive(false);
        mzkUserDAO.save(user);
        inviteCodeDAO.save(invite);
        // Creating a new invite code for the parent and for the user.
        inviteCodeDataCreation.createInviteCode(suffix + 2, parent);
        inviteCodeDataCreation.createInviteCode(suffix + 1, user);
        return user;
    }

    /**
     * Create multiple users that are parent of each.
     *
     * @return the last user created.
     */
    public MzkUser createMultipleMzkUser(int userToCreate) {
        int suffix = 0;
        InviteCode parentInviteCode = inviteCodeDAO.getInviteCodeByValueAndIsActiveTrue(UserTestConstants.INVITE_CODE).get();
        // Creating users with suffixes.
        for (int i = 0; i < userToCreate; ++i) {
            suffix++;
            MzkUser user = generateMzkUser(String.valueOf(suffix));
            // Linking the user with it's parent.
            user.setInviteCode(parentInviteCode);
            // Create an invite code for him
            parentInviteCode = inviteCodeDataCreation.createInviteCode(String.valueOf(suffix), user);
            mzkUserDAO.save(user);
        }
        // Getting the last created user.
        Optional<MzkUser> user = userService.findByUsername(UserTestConstants.USERNAME + suffix);
        if (user.isEmpty()) {
            throw new MzkRuntimeException("The user " + UserTestConstants.USERNAME + suffix + " doesn't exist.", "");
        }
        return user.get();
    }

    /**
     * Generate a user with the default values with a suffix.
     *
     * @param suffix This will be added to all the unique fields.
     * @return The user generated, the user isn't saved into the database.
     */
    public MzkUser generateMzkUser(String suffix) {
        MzkUser user = new MzkUser();
        user.setUsername(UserTestConstants.USERNAME + suffix);
        user.setPassword(UserTestConstants.PASSWORD);
        user.setRole(roleDAO.getRoleByRoleId(RoleEnum.USER.getId()));
        user.setIsActive(true);
        user.setIsComplete(true);
        user.setCreationDate(LocalDateTime.now());
        return user;
    }

    /**
     * Create the base of the default user in the application.
     *
     * @return The user.
     */
    private MzkUser generateDefaultUser() {
        MzkUser user = new MzkUser();
        user.setUsername(UserTestConstants.USERNAME);
        user.setPassword(UserTestConstants.PASSWORD);
        user.setMail(UserTestConstants.MAIL);
        user.setRole(roleDAO.getRoleByRoleId(RoleEnum.USER.getId()));
        user.setIsActive(true);
        user.setIsComplete(true);
        user.setCreationDate(LocalDateTime.now());
        return user;
    }
}
