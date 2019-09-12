import SceneView from "../SceneView";
import ScrollBar from "../../utils/ScrollBar";


class PartyView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      container: null,
      tracklistContainer: null,
      playingTrack: null,
      home: null,
      playPause: null
    };

    this._playingTrack = null;

    this._fetchWrapper()
      .then(this._fillAlbumInternals.bind(this))
      .then(this._events.bind(this))
      .then(this._partyViewReady);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/party/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.container = doc.getElementsByClassName('party-view-wrapper')[0];
          this._dom.tracklistContainer = doc.getElementsByClassName('pv-current-album')[0].children[0];
          this._dom.home = doc.getElementsByClassName('pv-controls-home')[0];
          this._dom.playPause = doc.getElementsByClassName('pv-play-pause')[0];

          resolve();
        });
    });
  }


  _fillAlbumInternals() {
    return new Promise(resolve => {
      // TODO receive from JSON and build entries
      for (let i = 0; i < this._dom.tracklistContainer.children.length; ++i) {
        if (this._dom.tracklistContainer.children[i].classList.contains('pv-playing')) {
          this._dom.playingTrack = this._dom.tracklistContainer.children[i];
        }
      }

      new ScrollBar({
        target: this._dom.tracklistContainer
      });
      this._dom.tracklistContainer = this._dom.tracklistContainer.firstElementChild.firstElementChild;

      resolve();
    });
  }


  _events() {
    return new Promise(resolve => {
      this._dom.home.addEventListener('click', mzk.ui.setSceneView.bind(mzk.ui, { name: 'MainPage' }), false);
      this._dom.playPause.addEventListener('click', this._togglePlay.bind(this), false);
      resolve();
    });
  }


  _partyViewReady() {
    Events.fire('SceneViewReady');
  }


  _togglePlay() {
    mzk.togglePlay();
    const isPlaying = mzk.model.player.playing;
    // TODO use const when view is built from server call
    if (this.isPlaying === true) {
      this.isPlaying = false;
      this._dom.playingTrack.classList.remove('pv-paused');
      this._dom.playingTrack.classList.add('pv-playing');
      this._dom.playPause.src = 'static/img/player/pause.svg';
    } else {
      this.isPlaying = true;
      this._dom.playingTrack.classList.remove('pv-playing');
      this._dom.playingTrack.classList.add('pv-paused');
      this._dom.playPause.src = 'static/img/player/play.svg';
    }
  }


  get dom() {
    return this._dom.container;
  }


}


export default PartyView;
