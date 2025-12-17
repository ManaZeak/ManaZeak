import Modal from './Modal.js';


class YesNoModal extends Modal {


  /** @summary <h1>Yes/No dialog modal</h1>
   * @extends Modal
   * @author Arthur Beaulieu
   * @since December 2025
   * @description <blockquote></blockquote> **/
  constructor(options) {
    super('yes-no', true);
    /** @private
     * @member {string} - The modal's geader text */
    this._titleText = options.title;
    /** @private
     * @member {string} - The modal's container text */
    this._descriptionText = options.description;
    /** @private
     * @member {object} - The yes input */
    this._noInput = null;
    /** @private
     * @member {object} - The yes input */
    this._yesInput = null;
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
//    Evts.removeEvent(/* ID des evt no/yes*/);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fillAttributes
   * @private
   * @memberof YesNoModal
   * @author Arthur Beaulieu
   * @since December 2025
   * @description <blockquote></blockquote> **/
   _fillAttributes() {
    this._rootElement.querySelector('#modal-header-text').innerHTML = this._titleText;
    this._rootElement.querySelector('#modal-container-text').innerHTML = this._descriptionText;
    this._noInput = this._rootElement.querySelector('#modal-footer-no');
    this._yesInput = this._rootElement.querySelector('#modal-footer-yes');
  }


  /** @method
   * @name open
   * @public
   * @memberof YesNoModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will open the modal, by adding the modal overlay to the document body. It will
   * also register a subscription for a user click event on the modal overlay or on the close icon.</blockquote> **/
   open() {
    super.open();
    return new Promise((resolve, reject) => {
      Evts.addEvent('click', this._noInput, () => {
        reject();        
      }, this);
      Evts.addEvent('click', this._yesInput, () => {
        resolve();
      }, this);
      // TODO kill evts on destroy
    });
  }


}


export default YesNoModal;
