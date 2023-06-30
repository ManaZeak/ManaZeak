import Modal from '../utils/Modal.js';


class ResetPasswordModal extends Modal {


  constructor() {
    super('reset-password');
    this._evtIds = [];
  }


  destroy() {
    super.destroy();
    Evts.removeEvent(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  _fillAttributes() {
    this._events();
  }


  _events() {
    this._evtIds.push(Evts.addEvent('click', document.getElementById('reset-password-submit'), this._submit, this));
  }


  _submit() {
    mzk.kom.post('/resetPassword/', {
      newPassword1: document.getElementById('reset-password-one-input').value,
      newPassword2: document.getElementById('reset-password-two-input').value
    }).then(res => {
      if (res.status === 400) {
        document.getElementById('reset-password-one-input').classList.add('error');
        document.getElementById('reset-password-two-input').classList.add('error');
      } else {
        this.close();
      }
    }).catch(err => {
      console.error(err);
    });
  }


}


export default ResetPasswordModal;
