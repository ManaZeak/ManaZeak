import Modal from '../utils/Modal.js';


class NewPlaylistModal extends Modal {


  /** @summary <h1>new playlist modal</h1>
   * @extends Modal
   * @author Arthur Beaulieu
   * @since December 2025
   * @description <blockquote>This modal is made to allow the end-user to provide the required information
   * to create a playlist.</blockquote> **/
  constructor(options) {
    super('new-playlist');

    this._path = options.path;
    this._title = options.title;
    this._artist = options.artist;
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
   * @memberof NewPlaylistModal
   * @author Arthur Beaulieu
   * @since December 2025
   * @description <blockquote>This method will destroy the Modal parent (see documentation).</blockquote> **/
  destroy() {
    super.destroy();
    Evts.removeEvent(this._footerCloseEvtId);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fillAttributes
   * @private
   * @memberof NewPlaylistModal
   * @author Arthur Beaulieu
   * @since December 2025
   * @description <blockquote>This method doesn't do anything, the about modal is only for reading.</blockquote> **/
  _fillAttributes() {
    // The modal doesn't contain any interaction with user inputs
    this._footerCloseButton = this._rootElement.querySelector('#modal-footer-close');
    this._events();
  }


  /** @method
   * @name _events
   * @private
   * @memberof NewPlaylistModal
   * @author Arthur Beaulieu
   * @since December 2025
   * @description <blockquote>This method will listen to any click on the submit button to process the textarea
   * content to send it to the backend if needed.</blockquote> **/
  _events() {
    this._footerCloseEvtId = Evts.addEvent('click', this._footerCloseButton, this.close, this);
  }





}


export default NewPlaylistModal;
