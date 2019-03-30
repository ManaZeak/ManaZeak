import Modal from '../overlays/Modal.js';
'use strict';


class NewLibraryModal extends Modal {
  constructor(options) {
    super(options);
  }


  setActions(doc) {
    const close = doc.getElementById('new-library-close');
    const create = doc.getElementById('create-new-library');
    const libraryName = doc.getElementById('library-name');
    const libraryPath = doc.getElementById('library-path');

    close.addEventListener('click', () => {
      this.close();
    });

    create.addEventListener('click', () => {
      this._callback({
        name: libraryName.value,
        path: libraryPath.value
      });
      this.close();
    });
  }
}

export default NewLibraryModal;
