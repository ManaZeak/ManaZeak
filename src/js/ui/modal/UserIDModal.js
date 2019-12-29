import Modal from '../component/overlay/Modal.js';
'use strict';


class UserIDModal extends Modal {


  constructor(options) {
    super(options);
  }


  setActions(doc) {
    const closeTop = doc.getElementById('user-id-close-top');
    const closeBottom = doc.getElementById('user-id-close-bottom');
    closeTop.addEventListener('click', this.close.bind(this));
    closeBottom.addEventListener('click', this.close.bind(this));

    /* mzk.komunikator.get('user/godfatherid') TODO backend */
  }


}

export default UserIDModal;
