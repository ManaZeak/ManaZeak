import Modal from '../component/overlay/Modal.js';
'use strict';


class AboutModal extends Modal {


  constructor(options) {
    super(options);
  }


  setActions(doc) {
    const closeTop = doc.getElementById('about-close-top');
  }


}

export default AboutModal;
