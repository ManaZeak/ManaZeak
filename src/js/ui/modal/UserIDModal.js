import Modal from '../component/overlay/Modal.js';
'use strict';


class UserIDModal extends Modal {


  constructor(options) {
    super(options);
    this._userID = null;
  }


  setActions(doc) {
    const closeTop = doc.getElementById('user-id-close-top');
    const closeBottom = doc.getElementById('user-id-close-bottom');
    this._userID = doc.getElementById('user-id');
    const copy = doc.getElementById('copy-id');

    closeTop.addEventListener('click', this.close.bind(this));
    closeBottom.addEventListener('click', this.close.bind(this));

    mzk.komunikator.get('user/getInviteCode')
      .then(response => {
        this._userID.value = response.INVITE_CODE;
        copy.style.cursor = 'copy';
        copy.addEventListener('click', Utils.copyTextToClipboard.bind(Utils, this._userID.value));
      })
      .catch(err => {
        console.error(err);
      });
  }


}

export default UserIDModal;
