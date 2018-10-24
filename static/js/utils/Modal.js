'use_strict';


class Modal {
  constructor() {

  }

  newLibrary(options) {
    const close = document.getElementById('new-library-close');
    const create = document.getElementById('create-new-library');
    const libraryName = document.getElementById('library-name');
    const libraryPath = document.getElementById('library-path');

    close.addEventListener('click', () => {
      Shortcut.resumeAll();
      mzk.view.removeOverlay();
    });

    create.addEventListener('click', () => {
      options.callback({
          name: libraryName.value,
          path: libraryPath.value
      });
    });
  }
}

export default Modal;
