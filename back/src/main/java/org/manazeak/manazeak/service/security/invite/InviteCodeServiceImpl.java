package org.manazeak.manazeak.service.security.invite;

import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.util.HashUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public void useInviteCode(String inviteCodeValue) {
        // Get the invite code from the database.
        Optional<InviteCode> inviteCode = inviteCodeDAO.getInviteCodeByValueAndIsActiveTrue(inviteCodeValue);
        // Mark the invite code as used.
        // Generate a new invite code for the user.
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void generateInviteCode(MzkUser user) {
        // Generating the object that will be hashed.
        StringBuilder inviteSeed = new StringBuilder();
        inviteSeed.append(user.getUsername());
        inviteSeed.append(LocalDate.now());
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
