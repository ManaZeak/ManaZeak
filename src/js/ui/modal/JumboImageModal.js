import Modal from '../component/overlay/Modal.js';
'use strict';


class JumboImageModal extends Modal {
  constructor(options) {
    super(options);

    this._src = options.src;
    this._description = options.description;
  }


  setActions(doc) {
    const close = doc.getElementById('album-cover-close');
    const img = doc.getElementById('album-cover');
    const description = doc.getElementById('album-description');

    img.src = this._src;
    description.innerHTML = this._description;

    img.addEventListener('click', this.close.bind(this), false);
    close.addEventListener('click', this.close.bind(this), false);
  }


}

export default JumboImageModal;
