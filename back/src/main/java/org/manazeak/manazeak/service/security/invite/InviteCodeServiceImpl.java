package org.manazeak.manazeak.service.security.invite;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkValidationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * This class handles the invite code operations.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class InviteCodeServiceImpl implements InviteCodeService {

    /**
     * The invite code DAO.
     */
    private final InviteCodeDAO inviteCodeDAO;

    @Value("${app.inviteCodeDepth}")
    private int inviteCodeDepth;

    /**
     * {@inheritDoc}
     */
    @Override
    public void checkInviteCode(String inviteCodeValue) throws MzkValidationException {
        // Getting the invite code from the database.
        Optional<InviteCode> inviteCode = inviteCodeDAO.getInviteCodeByValueAndIsActiveTrue(inviteCodeValue);
        // If the invite code wasn't found, then it's not the correct one.
        if (inviteCode.isEmpty()) {
            throw new MzkValidationException("{user.register.error.wrong_invite_code}");
        }
        // Getting the parent from the invite code.
        MzkUser parent = inviteCode.get().getParent();
        // If the parent is not active then the user cannot be invited.
        if (!Boolean.TRUE.equals(parent.getIsActive())) {
            throw new MzkValidationException("{user.invite_code.error.user_deactivated}");
        }
        // Getting the depth of the parent
        Optional<Integer> userDepthOpt = inviteCodeDAO.getParentUserDepth(parent.getUserId());
        // JESUS is the parent, the user is allowed to register.
        if (userDepthOpt.isEmpty()) {
            return;
        }
        // Adding one to get the depth of the current user.
        int userDepth = userDepthOpt.get() + 1;
        // If the user is too far from the creator, we refuse him.
        if (userDepth > inviteCodeDepth) {
            throw new MzkValidationException("{user.register.error.invite_code_deep}");
        }
    }
}
