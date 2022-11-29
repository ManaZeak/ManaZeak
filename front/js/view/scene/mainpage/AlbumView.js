import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';
import TrackContext from '../../context/TrackContext';


class AlbumView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/album/${options.id}`
    });

    this._performers = [];
    this._tracks = [];

    this._changeTrackEvt = null;

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    this._trackContext.destroy();
    Utils.clearAllEvents(this._evtIds);
    Evts.unsubscribe(this._changeTrackEvt);
    Utils.removeAllObjectKeys(this);
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      this._performers = this.dom.querySelector('#album-performers').children;
      this._tracks = this.dom.querySelector('#album-tracks').children;

      const date = this.dom.querySelector('#album-release-date').innerHTML;
      this.dom.querySelector('#album-duration').innerHTML = Utils.secondsToTimecode(parseFloat(this.dom.querySelector('#album-duration').innerHTML)); 
      this.dom.querySelector('#album-release-date').innerHTML = Utils.formatDate(date);

      for (let i = 0; i < this._tracks.length; ++i) {
        const duration = this._tracks[i].children[0].children[1];
        duration.innerHTML = Utils.secondsToTimecode(parseFloat(duration.innerHTML));
      }

      this._scroll = new ScrollBar({
        target: this.dom.querySelector('#album-tracks'),
        style: {
          color: '#56D45B'
        }
      });
      // Update tracks bc of scroll DOM
      this._tracks = this.dom.querySelector('#album-tracks').children[0].children[0].children;
      // <scrollbar to performers for better UI
      if (this._performers.length > 4) {
        this.dom.querySelector('#album-performers').style.height = '190px';
        // Ensure height is properly applied before creating scroll on performers
        requestAnimationFrame(() => {
          this._scroll = new ScrollBar({
            target: this.dom.querySelector('#album-performers'),
            style: {
              color: '#56D45B'
            }
          });
          // Update performers bc of scroll DOM
          this._performers = this.dom.querySelector('#album-performers').children[0].children[0].children;
        });        
      } else {
        this.dom.querySelector('#album-performers').style.overflow = 'hidden';        
      }
      // Track context on container
      this._trackContext = new TrackContext({
        target: this.dom.querySelector('#album-tracks') ,
        name: 'track'
      });
      // Update playing track if necessary
      if (mzk.ctrl.playingId) {
        this._updatePlaying({
          id: mzk.ctrl.playingId
        });
      }

      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#album-picture'), this._coverClicked, this));

      for (let i = 0; i < this._performers.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._performers[i], this._artistClicked, this._performers[i]));
      }
  
      const rlArtist = this.dom.querySelector('#release-artist'); // Text artist name
      const rlArtistContainer = this.dom.querySelector('#release-artist-container'); // Artist picture
      this._evtIds.push(Evts.addEvent('click', rlArtistContainer, this._artistClicked, rlArtist));
      this._evtIds.push(Evts.addEvent('click', rlArtist, this._artistClicked, rlArtist));

      const label = this.dom.querySelector('#album-label');
      this._evtIds.push(Evts.addEvent('click', label, this._labelClicked, label));

      for (let i = 0; i < this._tracks.length; ++i) {
        this._tracks[i]._buildPlaybackObject = this._buildPlaybackObject.bind(this);
        this._evtIds.push(Evts.addEvent('click', this._tracks[i], this._trackClicked, this._tracks[i]));
      }

      this._changeTrackEvt = Evts.subscribe('ChangeTrack', this._updatePlaying.bind(this));

      this.dom.querySelector('#album-tracks').addEventListener('contextmenu', event => {
        event.preventDefault();
        if (this.dom.querySelector('#album-tracks').contains(this._trackContext.dom)) {
          this._trackContext.close();
        } else {
          this._contextClicked(event);
        }
      });
      
      resolve();
    });
  }


  /* UI element callbacks */


  _coverClicked() {
    mzk.setModal({
      name: 'AlbumCover',
      path: this.dom.querySelector('#album-picture').children[0].children[0].children[0].src,
      title: this.dom.querySelector('#release-artist').nextElementSibling.innerHTML,
      artist: this.dom.querySelector('#release-artist').innerHTML
    });
  }


  _artistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });
  }


  _labelClicked() {
    mzk.setView({
      name: 'Label',
      id: this.dataset.id
    });
  }


  _contextClicked(event) {
    if (event.target.closest('.track')) {
      let title = event.target.parentNode.children[0].children;
      if (event.target.className !== 'track') {
        if (title.length === 0) {
          title = event.target.parentNode.parentNode.children[0].children[0]
        } else {
          title = title[0];
        }
        console.log(title)

        this._trackContext.open(event, {
          id: event.target.parentNode.dataset.id,
          name: `${document.getElementById('release-artist').innerHTML} - ${title.textContent}`
        });
      } else {
        console.log(title)

        this._trackContext.open(event, {
          id: event.target.dataset.id,
          name: `${document.getElementById('release-artist').innerHTML} - ${title[0].textContent}`
        });
      }
    }
  }


  /* Handling click on tracks and callbacks */


  _trackClicked() {
    mzk.changeTrack({
      id: this.dataset.id,
      playObject: this._buildPlaybackObject(this.dataset.id)
    });
  }


  _buildPlaybackObject(currentId) {
    const album = {
      type: 'album',
      cover: this.dom.querySelector('#album-picture').children[0].children[0].children[0].src,
      artist: this.dom.querySelector('#release-artist').innerHTML,
      tracks: []
    };

    let currentReached = false;
    for (let i = 0; i < this._tracks.length; ++i) {
      if (currentReached === true) {
        album.tracks.push({
          name: this._tracks[i].children[0].children[0].innerHTML,
          // TODO track artist instead of release artist
          duration: this._tracks[i].children[0].children[1].innerHTML,
          id: this._tracks[i].dataset.id,
          mood: this._tracks[i].dataset.mood
        });
      }

      if (this._tracks[i].dataset.id === currentId) {
        currentReached = true;
      }
    }

    return album;
  }


  _updatePlaying(data) {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.remove('playing');
      if (this._tracks[i].dataset.id === data.id) {
        this._tracks[i].classList.add('playing');
        // Not breaking to properly remove playing on next tracks
      }
    }
  }


  stopPlayback() {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.remove('playing');
    }
  }

}


export default AlbumView;
