import Modal from '../utils/Modal.js';


class ResetPasswordModal extends Modal {


  constructor() {
    super({
      url: '/fragment/modal/reset-password/'
    });
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  _fillAttributes() {
    this._events();
  }


  _events() {
    // TBD with form, may not be necessary w/ thymleaf
  }


}


export default ResetPasswordModal;
