package org.manazeak.manazeak.datacreation.security.user;

import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;
import org.springframework.stereotype.Component;

/**
 * This class allows to create data to edit a user.
 */
@Component
public class MzkUserEditDataCreation {

    /**
     * @return A standard user edition dto.
     */
    public MzkUserEditDto getMzkUserEditDto() {
        MzkUserEditDto edit = new MzkUserEditDto();
        edit.setLocaleId(UserTestConstants.LOCALE_ID_EDITED);
        edit.setCountryId(UserTestConstants.COUNTRY_ID_EDITED);
        edit.setName(UserTestConstants.NAME_EDITED);
        edit.setEmail(UserTestConstants.MAIL_EDITED);
        edit.setBirthdate(UserTestConstants.BIRTH_DATE_EDITED);
        edit.setBio(UserTestConstants.BIO_EDITED);
        edit.setSurname(UserTestConstants.SURNAME_EDITED);

        return edit;
    }

}
