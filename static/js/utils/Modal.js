'use_strict';


class Modal {
  constructor() {

  }

  newLibrary(options) {
    let close = document.getElementById('new-library-close');
    let create = document.getElementById('create-new-library');
    let libraryName = document.getElementById('library-name');
    let libraryPath = document.getElementById('library-path');

    console.log(libraryName)
    console.log(libraryPath)
    console.log(close)
    console.log(create)

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