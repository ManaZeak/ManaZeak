package org.manazeak.manazeak.util;

import java.sql.Timestamp;
import java.time.*;
import java.time.format.DateTimeFormatter;

/**
 * This class allows to manipulate dates in the application.
 */
public final class DateUtil {

    public static final DateTimeFormatter FR_DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/uuuu");

    public static final DateTimeFormatter US_DATE_FORMATTER = DateTimeFormatter.ofPattern("uuuu-MM-dd");

    public static final DateTimeFormatter FULL_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd kk:HH:mm:ss.SSS");

    private DateUtil() {

    }

    /**
     * Allows to parse a date from a string.
     *
     * @param strDate   The string containing a date.
     * @param formatter The formatter that will be used to parse the date.
     * @return the date.
     */
    public static LocalDate parseString(String strDate, DateTimeFormatter formatter) {
        // If the string is null, then there is no date to get
        if (strDate == null || strDate.isEmpty()) {
            return null;
        }
        return LocalDate.parse(strDate, formatter);
    }

    /**
     * Allows to parse a date from a string.
     *
     * @param millis the time in long.
     * @return the date.
     */
    public static LocalDateTime parseLocalDateTimeString(Long millis) {
        // If the string is null, then there is no date to get
        if (millis == null) {
            return null;
        }
        return Instant.ofEpochMilli(millis).atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    /**
     * Get a SQL timestamp from a LocalDate.
     *
     * @param date The date to transform into a timestamp.
     * @return The converted timestamp.
     */
    public static Timestamp getTimeStamp(LocalDate date) {
        if (date == null) {
            return null;
        }
        return Timestamp.valueOf(date.atTime(LocalTime.MIDNIGHT));
    }

    /**
     * Get a SQL timestamp from a LocaleDateTime.
     * @param date The
     * @return
     */
    public static Timestamp getTimeStamp(LocalDateTime date) {
        if (date == null) {
            return null;
        }
        return Timestamp.valueOf(date);
    }

    /**
     * Formats a date and a time into a string with the given format.
     *
     * @param date   The date that will be formatted.
     * @param format The format that will be used.
     * @return The formatted date as a string.
     */
    public static String formatDateTime(LocalDateTime date, DateTimeFormatter format) {
        return date.format(format);
    }

    /**
     * Formats a date into a string with the given format.
     *
     * @param date      The date that will be formatted.
     * @param formatter The format that will be used.
     * @return The formatted date as a string.
     */
    public static String formatDate(LocalDate date, DateTimeFormatter formatter) {
        return date.format(formatter);
    }
}
