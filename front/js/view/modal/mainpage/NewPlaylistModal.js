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
    /** @private
     * @member {object} - The form submit input */
    this._submitInput = null;
    /** @private
     * @member {number} - The event ID for the submit input clicked */
    this._submitEvtId = -1;
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
   * @description <blockquote></blockquote> **/
  _fillAttributes() {
    this._submitInput = this._rootElement.querySelector('#submit-new-playlist');
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
    this._submitEvtId = Evts.addEvent('click', this._submitInput, this._submitClicked, this);
  }


  /** @method
   * @name _submitClicked
   * @private
   * @async
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method is the submit button callback. If the textarea content is empty, the server
   * response to the post call will be the wish modal HTML template, completed with an error message. This callback
   * will refresh the interface to display this error message. Otherwise, if the textarea isn't empty, the server will
   * respond with a JSON object that contains the success information, to be displayed as a notification.</blockquote>
   * @param {object} event - The click event (on submit button) **/
  _submitClicked(event) {
    // Avoid form submit default behavior TODO factorize in postrForm method
    event.preventDefault();
    const formData = new FormData(this._rootElement.querySelector('#new-playlist-form'));
    const options = {
      method: 'POST',
      headers: new Headers([
        ['X-XSRF-TOKEN', mzk.kom.csrf],
        ['Authorization', `Bearer ${mzk.kom.jwt}`]
      ]),
      body: formData
    };

    fetch(this._url, options).then(data => {
      data.json().then(parsed => {
        if (parsed === '') {
          Logger.raise(parsed);
          mzk.ui.updateAsidePlaylist();
          this.close();
        } else {
          if (parsed.done === 'true') {
            Notif.new(parsed);
            this.close();
          } else {
            // Parse new modal content as DOM object
            this._rootElement = Utils.parseHTMLFragment(parsed);
            // Clear overlay content
            this._modalOverlay.innerHTML = '';
            // Restore new modal content
            this._modalOverlay.appendChild(this._rootElement);
            // Avoid event stacking
            Evts.removeEvent(this._submitEvtId);
            // Reset submit event id
            this._submitEvtId = -1;
            // Re-save internals with new template
            this._fillAttributes();
          }
        }
      }).catch(err => {});
    }).catch(err => {});
  }


}


export default NewPlaylistModal;
