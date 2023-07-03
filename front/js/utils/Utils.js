class Utils {


  constructor() {
    // If an instance of Utils already exists, we just return it
    if (Utils.instance) {
      return Utils.instance;
    }
    // Set object instance
    Utils.instance = this;

    return this;
  }


  parseHTMLFragment(htmlString) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlString, 'text/html');
    return dom.body.firstChild;
  }


  removeAllObjectKeys(object) {
    Object.keys(object).forEach(key => {
      delete object[key];
    });
  }


  clearAllEvents(evtIds) {
    if (evtIds.length > 0 && Evts) {
      for (let i = 0; i < evtIds.length; ++i) {
        Evts.removeEvent(evtIds);
      }
    }
  }


  appendLinkInHead(path) {
    if (path) {
      /* Search for existing link with same path */
      let alreadyExists = false;
      for (let i = 0; i < document.head.children.length; ++i) {
        const meta = document.head.children[i];
        if (meta.nodeName === 'LINK' && meta.href === `${window.location}${path}`) {
          alreadyExists = true;
          break;
        }
      }
      /* Only append style if not already existing in document header */
      if (!alreadyExists) {
        const link = document.createElement('LINK');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
      }
    }
  }



  /** @method
   * @name secondsToTimecode
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Convert a time in seconds into a time DD HH MM SS
   * @param {number} time - The time in seconds to convert
   * @return {string} - The output string according to time duration */
   secondsToTimecode(time) {
    const transformedTime = {
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
    if (transformedTime.d < 10) {
      transformedTime.d = `0${transformedTime.d}`;
    }

    if (transformedTime.h < 10) {
      transformedTime.h = `0${transformedTime.h}`;
    }

    if (transformedTime.m < 10) {
      transformedTime.m = `0${transformedTime.m}`;
    }

    if (transformedTime.s < 10) {
      transformedTime.s = `0${transformedTime.s}`;
    }

    // Formatting output
    if (transformedTime.d > 0) {
      return `${transformedTime.d}d ${transformedTime.h}h ${transformedTime.m}m ${transformedTime.s}s`;
    } else if (transformedTime.h > 0) {
      return `${transformedTime.h}:${transformedTime.m}:${transformedTime.s}`;
    } else {
      return `${transformedTime.m}:${transformedTime.s}`;
    }
  }


  formatDate(string) {
    const date = new Date(string);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }


  /**
   * @method
   * @name precisionRound
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description
   * <blockquote>
   * Do a Math.round with a given precision (ie amount of integers after the coma). 
   * </blockquote>
   * @param {Nunmber} value - The value to precisely round (> 0)
   * @param {Number} precision - The number of integers after the coma (> 0)
   * @return {Number} - The rounded value 
   **/
   precisionRound(value, precision) {
    if (typeof value !== 'number' || typeof precision !== 'number') {
      return -1;
    }
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }



  getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:0,g:0,b:0},
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch(e) {
      /* security error, img on diff domain */
      return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;
  }


  getRelativeLuminance(c) {
    return (0.2126 * (c.r / 255)) + (0.7152 * (c.g / 255)) + (0.0722 * (c.r / 255))
  }


  getImageLightness(img) {
    // create canvas
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var data = imageData.data;
    var r,g,b,avg;
    var colorSum = 0;

    for (let x = 0; x < data.length; x += 4) {
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];
        avg = Math.floor((r + g + b) / 3);
        colorSum += avg;
    }

    return Math.floor(colorSum / (img.width * img.height)) / 255;
  }


  lightenDarkenColor(color, amount) {
    // Test that caller sent mandatory arguments
    if ((color === undefined || color === null) || (amount === undefined || amount === null)) {
      return new Error('Utils.lightenDarkenColor : Missing arguments color or amount');
    }
    // Test that color is an hex code
    if (!/^[a-fA-F0-9]+$/i.test(color)) {
      color = this.rgbToHex(color);
    }
    // Pound color value to remove # char and memorize it had one
    let usePound = false;
    if (color[0] === '#') {
      color = color.slice(1);
      usePound = true;
    }
    // Check that alpha value is properly bounded to [0, 1]
    if (amount < -100 || amount > 100) {
      return new Error('Utils.lightenDarkenColor : Amount is not a valid float in [-100, 100]');
    }

    if (amount === 0) {
      return (usePound ? '#' : '') + color.toLowerCase();
    }

    if (amount > 0) {
      amount += 16;
    } else {
       amount -= 16;
    }
    // Perform method purpose
    const num = parseInt(color, 16);
    // Red channel bounding
    let r = (num >> 16) + amount;
    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }
    // Blue channel bounding
    let b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
    // Green channel bounding
    let g = (num & 0x0000FF) + amount;
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    // Format returned hex value
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  }


  hexToRgb(c) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }


  rgbToHex(c) {
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length == 1 ? `0${hex}` : hex;
    };
    return `#${componentToHex(c.r)}${componentToHex(c.g)}${componentToHex(c.b)}`;
  }


}


export default Utils;
