/**
 * The enum is used to offset the value of the volume bar.
 * @type {Readonly<{BIG: number, SMALL: number, HUGE: number}>}
 */
const VolumeControllerEnum = Object.freeze({
    // Move the volume a little bit.
    SMALL: 0.01,
    // Move the volume.
    BIG: 0.1,
    // Move the volume a lot
    HUGE: 0.25
});

export default VolumeControllerEnum;
