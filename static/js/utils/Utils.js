class Utils {
  constructor() {}

  precisionRound(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  secondsToTimecode(time) {
      let transformedTime = {
          d: 0,
          h: 0,
          m: 0,
          s: 0
      };
      // Cutting total seconds
      transformedTime.d = Math.floor(time / 86400);
      transformedTime.h = Math.floor((time - (transformedTime.d * 86400)) / 3600);
      transformedTime.m = Math.floor((time - (transformedTime.d * 86400) - (transformedTime.h * 3600)) / 60);
      transformedTime.s = Math.floor(time - (transformedTime.d * 86400) - (transformedTime.h * 3600) - (transformedTime.m * 60));
      // Adding an extra 0 for values inferior to 10
      transformedTime.d = transformedTime.d < 10 ? "0" + transformedTime.d : transformedTime.d;
      transformedTime.h = transformedTime.h < 10 ? "0" + transformedTime.h : transformedTime.h;
      transformedTime.m = transformedTime.m < 10 ? "0" + transformedTime.m : transformedTime.m;
      transformedTime.s = transformedTime.s < 10 ? "0" + transformedTime.s : transformedTime.s;
      // Formatting output
      if (transformedTime.d > 0) {
          return transformedTime.d + "d " + transformedTime.h + "h " + transformedTime.m + "m " + transformedTime.s + "s";
      }

      else if (transformedTime.h > 0) {
          return transformedTime.h + ":" + transformedTime.m + ":" + transformedTime.s;
      }

      else {
          return transformedTime.m + ":" + transformedTime.s;
      }
  }  
}

export default Utils;
