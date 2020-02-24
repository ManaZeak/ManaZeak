/**
 * This enum is containing the different repeat modes of manazeak.
 * @type {Readonly<{REPEAT_VIEW: number, NO_REPEAT: number, REPEAT_TRACK: number}>}
 */
const RepeatModeEnum = Object.freeze({
    // The repeat mode is disabled.
    NO_REPEAT: 0,
    // Repeating the current track.
    REPEAT_TRACK: 1,
    // Repeating all the tracks in the view.
    REPEAT_VIEW: 2
});

export default RepeatModeEnum;
