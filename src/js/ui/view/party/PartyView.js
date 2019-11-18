import PlayableView from "../PlayableView";
import PartyViewTrackEntry from "./entry/PartyViewTrackEntry";
import Track from "../../../model/components/Track";
import ScrollBar from "../../component/bar/ScrollBar";


class PartyView extends PlayableView {


  constructor(options) {
    super(options);

    this._dom = {
      container: null,
      tracklistContainer: null,
      playingTrack: null,
      home: null,
      playPause: null
    };

    this._playingTrackIndex = 0;
    this._tracks = [];

    this._fetchWrapper()
      .then(this._fillAlbumInternals.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady);
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
    return new Promise((resolve, reject) => {
      mzk.komunikator.get(`view/single/album/random`)
        .then(response => {
          mzk.model.makeTransitiveSet({
            tracks: response.ALBUM.TRACKS,
            albumArtist: response.ALBUM.ALBUM_ARTIST,
            album: response.ALBUM.NAME
          }).then(set => {
            for (let i = 0; i < set.length; ++i) {
              let entry = new PartyViewTrackEntry({
                trackId: set[i].id,
                trackNumber: i + 1,
                trackTitle: set[i].title,
                trackArtist: set[i].artists
              });

              this._tracks.push(entry);
              this._dom.tracklistContainer.appendChild(entry.domFragment);
            }

            new ScrollBar({
              target: this._dom.tracklistContainer
            });
            this._dom.tracklistContainer = this._dom.tracklistContainer.firstElementChild.firstElementChild;
            resolve();
          });
        }).catch(reject);
    });
  }


  _events() {
    return new Promise(resolve => {
      this._dom.home.addEventListener('click', mzk.ui.setSceneView.bind(mzk.ui, { name: 'MainPage' }), false);
      this._dom.playPause.addEventListener('click', this._togglePlay.bind(this), false);
      this._dom.tracklistContainer.addEventListener('click', (event) => {
        this._trackClicked(event);
      });
      resolve();
    });
  }


  _togglePlay() {
    mzk.togglePlay();
    const isPlaying = mzk.model.player.playing;
    if (this.isPlaying === true) {
      this.isPlaying = false;
      this._tracks[this._playingTrackIndex].dom.classList.add('paused');
      this._dom.playPause.src = 'static/img/player/play.svg';
    } else {
      this.isPlaying = true;
      this._tracks[this._playingTrackIndex].dom.classList.remove('paused');
      this._dom.playPause.src = 'static/img/player/pause.svg';
    }
  }


  get dom() {
    return this._dom.container;
  }


}


export default PartyView;
