package org.manazeak.manazeak.service.security.invite;

import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.DateUtil;
import org.manazeak.manazeak.util.HashUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

/**
 * This class handles the invite code operations.
 */
@Service
public class InviteCodeServiceImpl implements InviteCodeService {

    /**
     * The invite code DAO.
     */
    private final InviteCodeDAO inviteCodeDAO;
    /**
     * The user DAO.
     */
    private final MzkUserDAO mzkUserDAO;
    @Value("${app.inviteCodeDepth}")
    private int inviteCodeDepth;

    public InviteCodeServiceImpl(InviteCodeDAO inviteCodeDAO, MzkUserDAO mzkUserDAO) {
        this.inviteCodeDAO = inviteCodeDAO;
        this.mzkUserDAO = mzkUserDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean checkInviteCode(String inviteCodeValue) {
        // Getting the invite code from the database.
        Optional<InviteCode> inviteCode = inviteCodeDAO.getInviteCodeByValueAndIsActiveTrue(inviteCodeValue);
        // If the invite code was found, then it's a correct one.
        return inviteCode.isPresent();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void useInviteCode(String inviteCodeValue, MzkUser newUser) {
        // Get the invite code from the database.
        Optional<InviteCode> inviteCodeOpt = inviteCodeDAO.getInviteCodeByValueAndIsActiveTrue(inviteCodeValue);
        if (inviteCodeOpt.isEmpty()) {
            throw new MzkRuntimeException("The invite code wasn't found in the database.");
        }
        // Mark the invite code as used.
        InviteCode inviteCode = inviteCodeOpt.get();
        inviteCode.setIsActive(false);
        // Saving the invite code in the database.
        inviteCodeDAO.save(inviteCode);
        // Setting the used invite code on the new user.
        newUser.setInviteCode(inviteCode);
        mzkUserDAO.save(newUser);
        // Generating a new invite code for the parent.
        generateInviteCode(mzkUserDAO.getMzkUserByInviteCodeListContains(inviteCode));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void generateInviteCode(MzkUser user) {
        // Generating the object that will be hashed.
        StringBuilder inviteSeed = new StringBuilder();
        inviteSeed.append(user.getUsername());
        inviteSeed.append(DateUtil.formatDateTime(LocalDateTime.now(), DateUtil.FULL_TIME_FORMATTER));
        // Generating the invite code object.
        InviteCode inviteCode = new InviteCode();
        inviteCode.setIsActive(true);
        inviteCode.setValue(HashUtil.getMd5Hash(inviteSeed));
        // Saving the invite code into the database.
        inviteCodeDAO.save(inviteCode);
        // Linking the invite code to the user.
        user.addInviteCode(inviteCode);
        mzkUserDAO.save(user);
    }
}
