import Modal from '../utils/Modal.js';


class TrackDetailModal extends Modal {



  constructor(options) {
    super(`track-detail/${options.id}`);

    console.log(options)
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





}


export default TrackDetailModal;
