/**
 * This enum is containing the different repeat modes of manazeak.
 * @type {Readonly<{REPEAT_VIEW: number, NO_REPEAT: number, REPEAT_TRACK: number}>}
 */
const RepeatModeEnum = Object.freeze({
    NO_REPEAT: 0, // The repeat mode is disabled
    REPEAT_TRACK: 1, // Repeating the current track
    REPEAT_VIEW: 2 // Repeating all the tracks in the view
});


export default RepeatModeEnum;
