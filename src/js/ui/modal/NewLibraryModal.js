import Modal from '../component/overlay/Modal.js';
'use strict';


class NewLibraryModal extends Modal {
  constructor(options) {
    super(options);
  }


  setActions(doc) {
    const close = doc.getElementById('new-library-header-close');
    const create = doc.getElementById('new-library-create');
    const libraryName = doc.getElementById('new-library-name');
    const libraryPath = doc.getElementById('new-library-path');

    close.addEventListener('click', this.close.bind(this), false);
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
