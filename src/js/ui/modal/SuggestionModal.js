import Modal from '../component/overlay/Modal.js';
'use strict';


class SuggestionModal extends Modal {


  constructor(options) {
    super(options);
  }


  setActions(doc) {
    const closeTop = doc.getElementById('about-close-top');
    const close = doc.getElementById('close');
    const submit = doc.getElementById('submit');

    closeTop.addEventListener('click', this.close.bind(this), false);
    close.addEventListener('click', this.close.bind(this), false);
    submit.addEventListener('click', this.close.bind(this), false);
  }


}

export default SuggestionModal;
