import Modal from '../utils/Modal.js';


class BadgeModal extends Modal {


  constructor(options) {
    super(options);
    /** @private
     * @member {object} - The form submit input */
    this._submitInput = null;
    /** @private
     * @member {number} - The event ID for the submit input clicked */
    this._submitEvtId = -1;
  }


  destroy() {
    super.destroy();
    Events.removeEvent(this._submitEvtId);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  _fillAttributes() {
    this._submitInput = this._rootElement.querySelector('#submit-badge-button');
    this._events();
  }


  _events() {
    this._submitEvtId = Events.addEvent('click', this._submitInput, this._submitClicked, this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  MODAL INTERACTIONS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  _submitClicked(event) {
    console.log('submit clicked');
  }


}


export default BadgeModal;
