import VisuComponentStereo from '../utils/VisuComponentStereo.js';
import CanvasUtils from '../utils/CanvasUtils.js';
import ColorUtils from '../utils/ColorUtils.js';


class PeakMeter extends VisuComponentStereo {


  /** @summary PeakMeter displays a splited or merged peak meter for audio signal
   * @author Arthur Beaulieu
   * @since 2020
   * @augments VisuComponentStereo
   * @description <blockquote>This component display a peak meter in several configuration. It can include a scale and its legend
   * and be oriented vertically or horizontally. Modified https://github.com/esonderegger/web-audio-peak-meter</blockquote>
   * @param {object} options - The peak meter options
   * @param {string} options.type - The component type as string
   * @param {object} options.player - The player to take as processing input (if inputNode is given, player source will be ignored)
   * @param {object} options.renderTo - The DOM element to render canvas in
   * @param {number} options.fftSize - The FFT size for analysis. Must be a power of 2. High values may lead to heavy CPU cost
   * @param {object} [options.audioContext=null] - The audio context to base analysis from
   * @param {object} [options.inputNode=null] - The audio node to take source instead of player's one
   * @param {boolean} [options.merged=false] - Merge left and right channel into one output
   * @param {object} [options.legend] - The peak meter legend options
   * @param {number} [options.legend.dbScaleMin=60] - The min scale value
   * @param {number} [options.legend.dbScaleTicks=6] - The tick distance, must be a multiple of scale min
   * @param {object} [options.colors] - The oscilloscope background and signal color
   * @param {string} [options.colors.background=ColorUtils.defaultPrimaryColor] - The background color
   * @param {string} [options.colors.min=#56D45B] - The gradient min value
   * @param {string} [options.colors.step0=#AFF2B3] - The gradient second value
   * @param {string} [options.colors.step1=#FFAD67] - The gradient third value
   * @param {string} [options.colors.step2=#FF6B67] - The gradient fourth value
   * @param {string} [options.colors.max=#FFBAB8] - The gradient max value **/
  constructor(options) {
    super(options);
    // Peak gradient
    if (!options.colors?.gradient) {
      this._peakGradient = ColorUtils.defaultAudioGradient;
    } else {
      this._peakGradient = options.colors.gradient;
    }
    // Update canvas CSS background color
    const bgColor = (options.colors ? options.colors.background || ColorUtils.defaultBackgroundColor : ColorUtils.defaultBackgroundColor);
    if (this._merged === true) {
      this._canvasL.style.backgroundColor = bgColor;
    } else {
      this._canvasL.style.backgroundColor = bgColor;
      this._canvasR.style.backgroundColor = bgColor;
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------  VISUCOMPONENTSTEREO OVERRIDES  ----------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fillAttributes
   * @private
   * @override
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Internal method to fill internal properties from options object sent to constructor.</blockquote>
   * @param {object} options - The frequency circle options
   * @param {string} options.type - The component type as string
   * @param {object} options.player - The player to take as processing input (if inputNode is given, player source will be ignored)
   * @param {object} options.renderTo - The DOM element to render canvas in
   * @param {number} options.fftSize - The FFT size for analysis. Must be a power of 2. High values may lead to heavy CPU cost
   * @param {object} [options.audioContext=null] - The audio context to base analysis from
   * @param {object} [options.inputNode=null] - The audio node to take source instead of player's one **/
  _fillAttributes(options) {
    super._fillAttributes(options);
    this._orientation = options.orientation || 'horizontal';
    this._legend = options.legend || null;

    if (this._legend) {
      this._dbScaleMin = options.legend.dbScaleMin || 60;
      this._dbScaleTicks = options.legend.dbScaleTicks || 15;
    } else {
      this._dbScaleMin = 60;
      this._dbScaleTicks = 15;
    }

    this._amplitudeL = 0;
    this._amplitudeR = 0;
    this._peakL = 0;
    this._peakR = 0;
    this._peakSetTimeL = null;
    this._peakSetTimeR = null;
    this._dom.scaleContainer = null;
    this._dom.labels = [];
  }


  /** @method
   * @name _buildUI
   * @private
   * @override
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Create and configure canvas then append it to given DOM element.</blockquote> **/
  _buildUI() {
    super._buildUI();

    if (this._orientation === 'horizontal') {
      this._dom.container.classList.add('horizontal-peakmeter');
    }

    if (this._legend) {
      this._dom.scaleContainer = document.createElement('DIV');
      this._dom.scaleContainer.classList.add('scale-container');
      this._dom.container.insertBefore(this._dom.scaleContainer, this._dom.container.firstChild);
    }

    if (this._merged === true) {
      this._dom.container.removeChild(this._canvasR);
    }

    this._updateDimensions();

    if (this._legend) {
      this._createPeakLabel();
      this._createScaleTicks();
    }
  }


  /** @method
   * @name _setAudioNodes
   * @private
   * @override
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Build audio chain with source.</blockquote> **/
  _setAudioNodes() {
    super._setAudioNodes();
    this._peakSetTimeL = this._audioCtx.currentTime;
    this._peakSetTimeR = this._audioCtx.currentTime;
  }


  /** @method
   * @name _pause
   * @private
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>On pause event callback.</blockquote> **/
  _pause() {
    super._pause();
    if (this._legend) {
      this._dom.labels[0].textContent = '-∞';
      this._dom.labels[1].textContent = '-∞';
    }
  }


  /** @method
   * @name _onResize
   * @private
   * @override
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>On resize event callback.</blockquote> **/
  _onResize() {
    super._onResize();
    this._updateDimensions();

    if (this._legend) {
      this._createPeakLabel();
      this._createScaleTicks();
    }
  }


  /** @method
   * @name _processAudioBin
   * @private
   * @override
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Real time method called by WebAudioAPI to process PCM data. Here we make a 8 bit frequency
   * and time analysis. Then we use utils method to draw radial oscilloscope, linear point oscilloscope, background points
   * and radial frequency bars.</blockquote> **/
  _processAudioBin() {
    if (this._isPlaying === true) {
      this._clearCanvas();

      if (this._merged === true) {
        this._mergedStereoAnalysis();
      } else {
        this._stereoAnalysis();
      }
      // Draw next frame
      requestAnimationFrame(this._processAudioBin);
    }
  }


  /*  ----------  PeakMeter internal methods  ----------  */


  /** @method
   * @name _mergedStereoAnalysis
   * @private
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Perform a merged Left and Right analysis with 32 bit time domain data.</blockquote> **/
  _mergedStereoAnalysis() {
    const data = new Float32Array(this._fftSize);
    this._nodes.analyser.getFloatTimeDomainData(data);
    // Compute average power over the interval and average power attenuation in DB
    let sumOfSquares = 0;
    for (let i = 0; i < data.length; i++) {
      sumOfSquares += data[i] * data[i];
    }

    const avgPowerDecibels = 10 * Math.log10(sumOfSquares / data.length);
    // Compure amplitude from width or height depending on orientation
    const dbScaleBound = this._dbScaleMin * -1;
    if (this._orientation === 'horizontal') {
      this._amplitudeL = Math.floor((avgPowerDecibels * this._canvasL.width) / dbScaleBound);
    } else if (this._orientation === 'vertical') {
      this._amplitudeL = Math.floor((avgPowerDecibels * this._canvasL.height) / dbScaleBound);
    }
    // Left channel
    // Found a new max value (peak) [-this._dbScaleMin, 0] interval
    if (this._peakL > this._amplitudeL) {
      this._peakL = this._amplitudeL;
      this._peakSetTimeL = this._audioCtx.currentTime;
      // Update peak label
      if (this._legend && avgPowerDecibels !== -Infinity) {
        this._dom.labels[0].textContent = CanvasUtils.precisionRound(avgPowerDecibels, 1);
      }
    } else if (this._audioCtx.currentTime - this._peakSetTimeL > 1) {
      this._peakL = this._amplitudeL;
      this._peakSetTimeL = this._audioCtx.currentTime;
      // Update peak label
      if (this._legend && avgPowerDecibels !== -Infinity) {
        this._dom.labels[0].textContent = CanvasUtils.precisionRound(avgPowerDecibels, 1);
      }
    }
    // Draw left and right peak meters
    CanvasUtils.drawPeakMeter(this._canvasL, {
      amplitude: this._amplitudeL,
      peak: this._peakL,
      orientation: this._orientation,
      colors: this._peakGradient
    });
  }


  /** @method
   * @name _stereoAnalysis
   * @private
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Perform a separated Left and Right analysis with 32 bit time domain data.</blockquote> **/
  _stereoAnalysis() {
    const dataL = new Float32Array(this._fftSize);
    const dataR = new Float32Array(this._fftSize);
    this._nodes.analyserL.getFloatTimeDomainData(dataL);
    this._nodes.analyserR.getFloatTimeDomainData(dataR);
    // Compute average power over the interval and average power attenuation in DB
    let sumOfSquaresL = 0;
    let sumOfSquaresR = 0;
    for (let i = 0; i < dataL.length; i++) {
      sumOfSquaresL += dataL[i] * dataL[i];
      sumOfSquaresR += dataR[i] * dataR[i];
    }
    const avgPowerDecibelsL = 10 * Math.log10(sumOfSquaresL / dataL.length);
    const avgPowerDecibelsR = 10 * Math.log10(sumOfSquaresR / dataR.length);
    // Compute amplitude from width or height depending on orientation
    const dbScaleBound = this._dbScaleMin * -1;
    if (this._orientation === 'horizontal') {
      this._amplitudeL = Math.floor((avgPowerDecibelsL * this._canvasL.width) / dbScaleBound);
      this._amplitudeR = Math.floor((avgPowerDecibelsR * this._canvasR.width) / dbScaleBound);
    } else if (this._orientation === 'vertical') {
      this._amplitudeL = Math.floor((avgPowerDecibelsL * this._canvasL.height) / dbScaleBound);
      this._amplitudeR = Math.floor((avgPowerDecibelsR * this._canvasR.height) / dbScaleBound);
    }
    // Left channel
    this.__stereoLeft(avgPowerDecibelsL);
    // Right channel
    this.__stereoRight();
    // Draw left and right peak meters
    CanvasUtils.drawPeakMeter(this._canvasL, {
      amplitude: this._amplitudeL,
      peak: this._peakL,
      orientation: this._orientation,
      colors: this._peakGradient
    });
    CanvasUtils.drawPeakMeter(this._canvasR, {
      amplitude: this._amplitudeR,
      peak: this._peakR,
      orientation: this._orientation,
      colors: this._peakGradient
    });
  }


  __stereoLeft(avgPowerDecibelsL) {
    // Found a new max value (peak) [-this._dbScaleMin, 0] interval
    if (this._peakL > this._amplitudeL) {
      this._peakL = this._amplitudeL;
      this._peakSetTimeL = this._audioCtx.currentTime;
      // Update peak label
      if (this._legend && avgPowerDecibelsL !== -Infinity) {
        this._dom.labels[0].textContent = CanvasUtils.precisionRound(avgPowerDecibelsL, 1);
      }
    } else if (this._audioCtx.currentTime - this._peakSetTimeL > 1) {
      this._peakL = this._amplitudeL;
      this._peakSetTimeL = this._audioCtx.currentTime;
      // Update peak label
      if (this._legend && avgPowerDecibelsL !== -Infinity) {
        this._dom.labels[0].textContent = CanvasUtils.precisionRound(avgPowerDecibelsL, 1);
      }
    }
  }


  __stereoRight(avgPowerDecibelsR) {
    // Found a new max value (peak) [-this._dbScaleMin, 0] interval
    if (this._peakR > this._amplitudeR) {
      this._peakR = this._amplitudeR;
      this._peakSetTimeR = this._audioCtx.currentTime;
      // Update peak label
      if (this._legend && avgPowerDecibelsR !== -Infinity) {
        this._dom.labels[1].textContent = CanvasUtils.precisionRound(avgPowerDecibelsR, 1);
      }
    } else if (this._audioCtx.currentTime - this._peakSetTimeR > 1) {
      this._peakR = this._amplitudeL;
      this._peakSetTimeR = this._audioCtx.currentTime;
      // Update peak label
      if (this._legend && avgPowerDecibelsR !== -Infinity) {
        this._dom.labels[1].textContent = CanvasUtils.precisionRound(avgPowerDecibelsR, 1);
      }
    }
  }


  /** @method
   * @name _createScaleTicks
   * @private
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Build the scale tick depending on component orientation.</blockquote> **/
  _createScaleTicks() {
    const numTicks = Math.floor(this._dbScaleMin / this._dbScaleTicks);
    let dbTickLabel = 0;
    this._dom.scaleContainer.innerHTML = '';
    if (this._orientation === 'horizontal') {
      const tickWidth = this._canvasL.width / numTicks;
      for (let i = 0; i < numTicks; ++i) {
        const dbTick = document.createElement('DIV');
        this._dom.scaleContainer.appendChild(dbTick);
        dbTick.style.width = `${tickWidth}px`;
        dbTick.textContent = `${dbTickLabel}`;
        dbTickLabel -= this._dbScaleTicks;
      }
    } else {
      const tickHeight = this._canvasL.height / numTicks;
      for (let i = 0; i < numTicks; ++i) {
        const dbTick = document.createElement('DIV');
        this._dom.scaleContainer.appendChild(dbTick);
        dbTick.style.height = `${tickHeight}px`;
        dbTick.textContent = `${dbTickLabel}`;
        dbTickLabel -= this._dbScaleTicks;
      }
    }
  }


  /** @method
   * @name _createPeakLabel
   * @private
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Build the scale legend depending on component orientation.</blockquote> **/
  _createPeakLabel() {
    if (this._dom.labels.length === 2) {
      this._dom.container.removeChild(this._dom.labels[0]);
      this._dom.container.removeChild(this._dom.labels[1]);
      this._dom.labels = [];
    }

    const peakLabelL = document.createElement('DIV');
    const peakLabelR = document.createElement('DIV');
    peakLabelL.classList.add('peak-value-container');
    peakLabelR.classList.add('peak-value-container');
    peakLabelL.textContent = '-∞';
    peakLabelR.textContent = '-∞';

    if (this._orientation === 'horizontal') {
      peakLabelL.style.width = '28px';
      peakLabelL.style.height = `${this._canvasL.height + 2}px`; // 2 px borders
      peakLabelL.style.top = '14px';
      peakLabelR.style.width = '28px';
      peakLabelR.style.height = `${this._canvasL.height + 2}px`; // 2 px borders
      peakLabelR.style.top = `${this._canvasL.height + 16}px`; // 2px borders + 14px height
    } else {
      peakLabelL.style.width = `${this._canvasL.width + 2}px`; // 2 px borders
      peakLabelL.style.left = '18px';
      peakLabelR.style.width = `${this._canvasL.width + 2}px`; // 2 px borders
      peakLabelR.style.left = `${this._canvasL.width + 20}px`; // 2px borders + 18px width
    }

    this._dom.labels.push(peakLabelL);
    this._dom.labels.push(peakLabelR);
    this._dom.container.appendChild(this._dom.labels[0]);
    this._dom.container.appendChild(this._dom.labels[1]);
  }


  /** @method
   * @name _updateDimensions
   * @private
   * @memberof PeakMeter
   * @author Arthur Beaulieu
   * @since 2020
   * @description <blockquote>Usually called on resize event, update canvas dimension to fit render to DOM object.</blockquote> **/
  _updateDimensions() {
    const widthOffset = 0;
    const heightOffset = 0;
    if (this._orientation === 'horizontal') {
      this.__updateHorizontal(heightOffset, widthOffset);
    } else if (this._orientation === 'vertical') {
      this.__updateVertical(heightOffset, widthOffset);
    }
  }


  __updateHorizontal(heightOffset, widthOffset) {
    if (this._legend) {
      widthOffset = 30;
      heightOffset = 14;
    }

    this._canvasL.width = this._renderTo.offsetWidth - widthOffset; // 2px borders + 28 px with for label

    if (this._merged === true) {
      this._canvasL.height = (this._renderTo.offsetHeight - heightOffset) - 2; // 2px border + scale height 14px
      this._canvasR.height = (this._renderTo.offsetHeight - heightOffset) - 2; // 2px border + scale height 14px
    } else {
      this._canvasR.width = this._renderTo.offsetWidth - widthOffset; // 2px borders + 28 px with for label
      this._canvasL.height = (this._renderTo.offsetHeight - heightOffset) / 2 - 2; // 2px border + scale height 14px
      this._canvasR.height = (this._renderTo.offsetHeight - heightOffset) / 2 - 2; // 2px border + scale height 14px
    }

    if (this._legend) {
      this._dom.scaleContainer.style.width = `${this._canvasL.width}px`;
    }
  }


  __updateVertical(heightOffset, widthOffset) {
    if (this._legend) {
      widthOffset = 18;
      heightOffset = 16;
    } else {
      this._canvasL.style.left = '0'; // Remove left offset for legend
    }

    this._canvasL.height = this._renderTo.offsetHeight - heightOffset - 2; // 2px borders + 16px height for label

    if (this._merged === true) {
      this._canvasL.width = (this._renderTo.offsetWidth - widthOffset) - 2; // 2px border + scale width 18px
      this._canvasR.width = (this._renderTo.offsetWidth - widthOffset) - 2; // 2px border + scale width 18px
    } else {
      this._canvasR.height = this._renderTo.offsetHeight - heightOffset - 2; // 2px borders + 16px height for label
      this._canvasL.width = (this._renderTo.offsetWidth - widthOffset) / 2 - 2; // 2px border + scale width 18px
      this._canvasR.width = (this._renderTo.offsetWidth - widthOffset) / 2 - 2; // 2px border + scale width 18px
    }

    if (this._legend) {
      this._dom.scaleContainer.style.height = `${this._canvasL.height}px`;
      this._dom.scaleContainer.style.width = '18px';
    }
  }


}


export default PeakMeter;
