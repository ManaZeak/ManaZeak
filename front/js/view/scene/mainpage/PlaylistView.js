import PlayableView from '../utils/PlayableView';
import ScrollBar from '../../navigation/ScrollBar';
import TrackContext from '../../context/TrackContext';
import ItemViewHelperMixin from '../utils/ItemViewHelperMixin';


class PlaylistView extends ItemViewHelperMixin(PlayableView) {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/playlist/${options.id}/getInfo/`
    });

    this._id = options.id;
    this._name = '';

    this._scrolls = [];

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      //this._name = this.dom.querySelector('#genre-name').innerHTML;
      // Track context on container
      this._trackContext = new TrackContext({
        target: this.dom.querySelector('#album-tracks') ,
        name: 'track'
      });
      this.updateScrollbars();
      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#playlist-delete'), this._deletePlaylist, this));
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#playlist-edit'), this._editPlaylist, this));
      resolve();
    });    
  }


  _deletePlaylist() {
    mzk.setDialog({
      name: 'YesNo',
      title: "Suppri",
      description: "Vous etes sure le coran ?"
    }).then(() => {
      mzk.kom.delete(`/playlist/${this._id}/`).then(() => {
        mzk.ui.updateAsidePlaylist();
        mzk.setView({ name: 'MainPage' });
      }).catch(err => console.error(err));
    }).catch(() => {});
  }


  _editPlaylist() {
    mzk.kom.get(`/api/playlist/${this._id}/edit/`).then(() => {

    }).catch(err => console.error(err));
  }


  getDisplayName() {
    return `Playlist <b>${this._name}</b>`;
  }


}


export default PlaylistView;
