import Modal from '../component/overlay/Modal.js';
'use strict';


class AboutModal extends Modal {


  constructor(options) {
    super(options);
  }


  setActions(doc) {
    const closeTop = doc.getElementById('about-header-close');
    const close = doc.getElementById('about-close');

    closeTop.addEventListener('click', this.close.bind(this), false);
    close.addEventListener('click', this.close.bind(this), false);
  }


}

export default AboutModal;
