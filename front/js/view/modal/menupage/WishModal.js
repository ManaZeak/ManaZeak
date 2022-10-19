import Modal from '../utils/Modal.js';


class WishModal extends Modal {


  /** @summary <h1>Wish modal</h1>
   * @extends Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This modal is made to allow the user to send a wish (under the form of a string) to the
   * instance administrators. This wish can be reviewed in the admin page, in the wishes sections. This way, users can
   * leave a feedback on the instance, straight from their account.</blockquote> **/
  constructor() {
    super('wish');
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
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will destroy the Modal parent (see documentation), then clear the submit event
   * subscription, and finally will destroy all properties of this class. It's then properly destroyed.</blockquote> **/
  destroy() {
    super.destroy();
    Evts.removeEvent(this._submitEvtId);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fillAttributes
   * @private
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will retrieve the submit button from the wish modal template. It will then
   * call the event button to handle the interactivity with this button.</blockquote> **/
  _fillAttributes() {
    this._submitInput = this._rootElement.querySelector('#submit-wish-button');
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
    this._submitEvtId = Evts.addEvent('click', this._submitInput, this._submitClicked, this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  MODAL INTERACTIONS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


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
    // Avoid form submit default behavior
    event.preventDefault();
    // Calling the modal url in post allow its resolution
    mzk.kom.postForm(this._url, {
      content: this._rootElement.querySelector('#wish-content').value
    }).then(response => {
      Logger.raise(response);
      this.close();
    }).catch(response => {
      // Parse new modal content as DOM object
      this._rootElement = Utils.parseHTMLFragment(response);
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
    });
  }


}


export default WishModal;
