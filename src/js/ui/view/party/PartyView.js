import PlayableView from "../PlayableView";
import PartyViewTrackEntry from "./entry/PartyViewTrackEntry";
import ScrollBar from "../../component/bar/ScrollBar";


class PartyView extends PlayableView {


  constructor(options) {
    super(options);

    this._dom = {
      container: null,
      tracklistContainer: null,
      home: null,
      rollAlbum: null,
      playPause: null,
      albumMainInfo: null,
      albumCover: null,
      albumLabel: null,
      albumDuration: null,
      trackContainer: null,
      track: {
        number: null,
        title: null,
        composer: null,
        producer: null,
        duration: null,
        genre: null
      }
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
          this._dom.rollAlbum = doc.getElementsByClassName('pv-roll-album')[0];
          this._dom.playPause = doc.getElementsByClassName('pv-play-pause')[0];
          this._dom.albumMainInfo = doc.getElementsByClassName('pv-album-main-info')[0];
          this._dom.albumCover = doc.getElementsByClassName('pv-album-cover')[0];
          this._dom.albumLabel = doc.getElementsByClassName('pv-album-label')[0];
          this._dom.albumDuration = doc.getElementsByClassName('pv-album-duration')[0];

          this._dom.trackContainer = doc.getElementsByClassName('pv-track-info')[0];
          this._dom.track.number = doc.getElementsByClassName('pv-track-number')[0];
          this._dom.track.title = doc.getElementsByClassName('pv-track-title')[0];
          this._dom.track.artist = doc.getElementsByClassName('pv-track-artist')[0];
          this._dom.track.composer = doc.getElementsByClassName('pv-track-composer')[0];
          this._dom.track.producer = doc.getElementsByClassName('pv-track-producer')[0];
          this._dom.track.duration = doc.getElementsByClassName('pv-track-duration')[0];
          this._dom.track.genre = doc.getElementsByClassName('pv-track-genre')[0];

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
            // Clear previous tracks, taking care of scrollbar wrapper
            if (this._dom.tracklistContainer.parentNode.parentNode.classList.contains('scrollbar-container')) {
              this._dom.tracklistContainer = this._dom.tracklistContainer.parentNode.parentNode;
              this._playingTrackIndex = 0;
              this._tracks = [];
           }

            this._dom.tracklistContainer.innerHTML = '';
            for (let i = 0; i < set.length; ++i) {
              const entry = new PartyViewTrackEntry({
                trackId: set[i].id,
                trackNumber: i + 1,
                trackTitle: set[i].title,
                trackArtist: set[i].artists
              });

              this._tracks.push(entry);
              this._dom.tracklistContainer.appendChild(entry.domFragment);
            }

            this._dom.albumMainInfo.innerHTML = `${response.ALBUM.YEAR} – ${response.ALBUM.NAME}`;
            this._dom.albumCover.src = response.ALBUM.COVER;
            this._dom.albumLabel.innerHTML = response.ALBUM.LABEL.NAME;
            this._dom.albumDuration.innerHTML = Utils.secondsToTimecode(response.ALBUM.DURATION);

            this._dom.trackContainer.style.display = 'none';

            new ScrollBar({
              target: this._dom.tracklistContainer
            });
            this._dom.tracklistContainer = this._dom.tracklistContainer.firstElementChild.firstElementChild;
            // Event must be set here only to enable being recreate each time random album is hit
            this._dom.tracklistContainer.addEventListener('click', (event) => {
              this._trackClicked(event);
            });

            resolve();
          });
        }).catch(reject);
    });
  }


  _events() {
    return new Promise(resolve => {
      this._dom.home.addEventListener('click', mzk.ui.setSceneView.bind(mzk.ui, { name: 'MainPage' }), false);
      this._dom.rollAlbum.addEventListener('click', this._fillAlbumInternals.bind(this), false);
      this._dom.playPause.addEventListener('click', this._togglePlay.bind(this), false);
      resolve();
    });
  }


  updateViewWithTrackInfo() {
    this._dom.trackContainer.style.display = 'flex';
    const track = mzk.model.getTrackById(this._tracks[this._playingTrackIndex].id);

    this._dom.track.number.innerHTML = `${this._tracks[this._playingTrackIndex]._trackNumber}  – `;
    this._dom.track.title.innerHTML = track.title;
    this._dom.track.artist.innerHTML = track.artists;
    this._dom.track.composer.innerHTML = track.composers;
    this._dom.track.producer.innerHTML = track.producers;
    this._dom.track.duration.innerHTML = Utils.secondsToTimecode(track.duration);

    this._dom.track.genre.innerHTML = '';
    for (let i = 0; i < track.genreArray.length; ++i) {
      const badge = document.createElement('SPAN');
      badge.classList.add('badge');
      badge.innerHTML = track.genreArray[i].NAME;
      this._dom.track.genre.appendChild(badge);
    }
  }


  _togglePlay() {
    mzk.togglePlay();
    this.isPlaying = mzk.model.player.playing;
    if (mzk.model.player.playing === true) {
      this._tracks[this._playingTrackIndex].dom.classList.add('paused');
      this._dom.playPause.src = 'static/img/player/play.svg';
    } else {
      this._tracks[this._playingTrackIndex].dom.classList.remove('paused');
      this._dom.playPause.src = 'static/img/player/pause.svg';
    }
  }


  get dom() {
    return this._dom.container;
  }


}


export default PartyView;
