import Modal from '../utils/Modal.js';


class AlbumCoverModal extends Modal {


  /** @summary <h1>About modal</h1>
   * @extends Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This modal is made to allow the user to send a wish (under the form of a string) to the
   * instance administrators. This wish can be reviewed in the admin page, in the wishes sections. This way, users can
   * leave a feedback on the instance, straight from their account.</blockquote> **/
  constructor(options) {
    super('album-cover');

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


  /** @method
   * @name _fillAttributes
   * @private
   * @memberof AboutModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method doesn't do anything, the about modal is only for reading.</blockquote> **/
  _fillAttributes() {
    this._rootElement.querySelector('#album-title').innerHTML = this._title;
    this._rootElement.querySelector('#album-artist').innerHTML = this._artist;
    this._rootElement.querySelector('#album-cover').src = this._path;
    // The modal doesn't contain any interaction with user inputs
    this._footerCloseButton = this._rootElement.querySelector('#modal-footer-close');
    this._events();
  }


  /** @method
   * @name _events
   * @private
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will listen to any click on the submit button to process the textarea
   * content to send it to the backend if needed.</blockquote> **/
  _events() {
    this._footerCloseEvtId = Evts.addEvent('click', this._footerCloseButton, this.close, this);
  }





}


export default AlbumCoverModal;
