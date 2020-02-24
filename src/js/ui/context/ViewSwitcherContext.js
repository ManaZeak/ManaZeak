import ContextMenu from '../component/overlay/ContextMenu.js';
'use strict';


class ViewSwitcherContext extends ContextMenu {
  constructor(options) {
    super(options);

    this._dom = {
      track: {},
      album: {}
    };

    this._text = {
      track: {},
      album: {}
    };
  }

  setActions(doc) {
    const changeView = (newView) => {
      this.close();
      mzk.changeActiveLibraryView(newView);
    };

    this._dom.track = doc.getElementsByClassName('track-view')[0];
    this._dom.album = doc.getElementsByClassName('album-view')[0];

    this._text.track = doc.getElementsByClassName('track-view-text')[0];
    this._text.album = doc.getElementsByClassName('album-view-text')[0];

    this._text.track.innerHTML = mzk.lang.libraryview.ListView;
    this._text.album.innerHTML = mzk.lang.libraryview.DetailsView;

    this._dom.track.addEventListener('click', () => {
      changeView(this._dom.track.dataset.view);
    });

    this._dom.album.addEventListener('click', () => {
      changeView(this._dom.album.dataset.view);
    });
  }
}

export default ViewSwitcherContext;
