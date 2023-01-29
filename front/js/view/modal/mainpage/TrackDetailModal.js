import Modal from '../utils/Modal.js';
import AudioVisualizer from '../../visu/AudioVisualizer';


class TrackDetailModal extends Modal {



  constructor(options) {
    super(`track-detail/${options.id}`);

    this._id = options.id;
    console.log(options)

    this._waveform = null;
    /** @private
     * @member {object} - The modal close button */
    this._footerCloseButton = null;
    /** @private
     * @member {number} - The event ID for the close button clicked */
    this._footerCloseEvtId = -1;
  }


  /** @method
   * @name destroy
   * @public
   * @memberof AboutModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will destroy the Modal parent (see documentation).</blockquote> **/
  destroy() {
    super.destroy();
    Evts.removeEvent(this._footerCloseEvtId);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  _fillAttributes() {
    this._buildWaveform();
    /*
    this._rootElement.querySelector('#album-title').innerHTML = this._title;
    this._rootElement.querySelector('#album-artist').innerHTML = this._artist;
    this._rootElement.querySelector('#album-cover').src = this._path;
    // The modal doesn't contain any interaction with user inputs
    this._footerCloseButton = this._rootElement.querySelector('#modal-footer-close');
    this._events();
    */
  }


  _events() {
    this._footerCloseEvtId = Evts.addEvent('click', this._footerCloseButton, this.close, this);
  }


  _buildWaveform() {
    const audio = document.createElement('AUDIO')
    audio.addEventListener('canplaythrough', () => {
      this._waveform = new AudioVisualizer({
        type: 'waveform',
        player: audio,
        renderTo: this._rootElement.querySelector('#waveform-container'),
        fftSize: 128,
        noEvents: true,
        wave: {
          align: 'center',
          barWidth: 1,
          barMarginScale: 0.25,
          merged: false,
          noSignalLine: false
        },
        colors: {
          background: 'transparent',
          track: '#E7E9E7'
        },      
      });
    }, true);
    audio.src = `/play/${this._id}/`;
  }





}


export default TrackDetailModal;
