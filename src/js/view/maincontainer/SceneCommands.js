'use strict';


class SceneCommands {
  constructor(options) {
    this._target = options.target;
    this._container = document.getElementById('scene-commands');
    this._changeView = this._container.childNodes[1];
    this._changeViewContext = {};
    this._asideOffset = '';
    this._overlay = {};

    this._centerOnActiveTrack = document.getElementById('center-on-track');

    this._views = {
      track: {},
      album: {}
    };

    this._init();
    this._events();
  }

  _init() {
    mzk.komunikator.getTemplate('modals/changeview/')
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');

        this._overlay = doc.getElementsByClassName('transparent-overlay')[0];
        this._changeViewContext = doc.getElementsByClassName('change-view-context')[0];
        this._views.track = doc.getElementsByClassName('track-view')[0];
        this._views.album = doc.getElementsByClassName('album-view')[0];
        this._changeViewContextEvents();
      });
  }

  asideClosed() {
    this.closeChangeView();
    this._asideOffset = '49px';
  }

  asideOpened() {
    this.closeChangeView();
    this._asideOffset = 'calc(18% + 49px)'; // Aside length in % and scene padding
  }

  _events() {
    this._viewportClicked = this._viewportClicked.bind(this);

    this._changeView.addEventListener('click', () => {
      this.toggleChangeViewContext();
    });

    this._centerOnActiveTrack.addEventListener('click', () => {
       mzk.view.centerOnActiveTrack();
    });
  }

  _changeViewContextEvents() {
    const changeView = (newView) => {
      mzk.changeActiveView(newView);
    };

    this._views.track.addEventListener('click', () => {
      changeView(this._views.track.dataset.view);
    });

    this._views.album.addEventListener('click', () => {
      changeView(this._views.album.dataset.view);
    });
  }

  _viewportClicked(event) {
    event.stopPropagation();

    if (!event.target.closest(`.change-view-context`)) {
      this.closeChangeView();
    }
  }

  toggleChangeViewContext() {
    if (!this._target.contains(this._changeViewContext)) {
      this.openChangeView();
    } else {
      this.closeChangeView();
    }
  }

  openChangeView() {
    this._target.appendChild(this._overlay);
    this._changeViewContext.style.left = this._asideOffset;
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }

  closeChangeView() {
    if (this._target.contains(this._overlay)) {
      this._target.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }

  get dom() {
    return this._container;
  }
}

export default SceneCommands;