import Modal from '../component/overlay/Modal.js';
'use strict';


class AboutModal extends Modal {


  constructor(options) {
    super(options);
  }


  setActions(doc) {
    const closeTop = doc.getElementById('about-close-top');
    const close = doc.getElementById('close');

    closeTop.addEventListener('click', this.close.bind(this), false);
    close.addEventListener('click', this.close.bind(this), false);
  }


}

export default AboutModal;
