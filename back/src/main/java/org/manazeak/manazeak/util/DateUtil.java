package org.manazeak.manazeak.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * This class allows to manipulate dates in the application.
 */
public class DateUtil {

    public static final DateTimeFormatter FR_DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/uuuu");

    /**
     * Allows to parse a date from a string.
     * @param strDate the string containing a date.
     * @return the date.
     */
    public static LocalDate parseString(String strDate, DateTimeFormatter formatter) {
        // If the string is null, then there is no date to get
        if (strDate == null || strDate.isEmpty()) {
            return null;
        }
        return LocalDate.parse(strDate, formatter);
    }
}
