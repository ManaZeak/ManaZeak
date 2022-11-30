/**
 * The enum is used to offset the value of the volume bar.
 * @type {Readonly<{BIG: number, SMALL: number, HUGE: number}>}
 */
 const VolumeControl = Object.freeze({
    SMALL: 0.01, // 1% volume update
    BIG: 0.1, // 10% volume update
    HUGE: 0.25 // 25% volume update
});


export default VolumeControl;
