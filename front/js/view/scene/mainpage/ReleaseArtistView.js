import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';


class ReleaseArtistView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/artist/${options.id}/`
    });

    this._scroll = [];
    
    this._fetchWrapper(this._url)
      .then(this._makeInteractive.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _makeInteractive() {
    return new Promise((resolve, reject) => {
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#artist-picture'), this._pictureClicked, this));
      const members = this.dom.querySelector('#artist-members');
      if (members && members.children.length) {
        this.dom.querySelector('.artist-header-right').classList.add(`collapsed-${members.children.length}`);
        this.dom.querySelector('.artist-header-center').classList.add(`expanded-${members.children.length}`);
        for (let i = 0; i < members.children.length; ++i) {
          members.children[i].addEventListener('click', this._artistClicked);
        }
        // Add scrollbar to members
        if (members.children.length > 4) {
          this.dom.querySelector('.artist-header-right').style.height = '190px';
          // Ensure height is properly applied before creating scroll on performers
          requestAnimationFrame(() => {
            this._scroll.push(new ScrollBar({
              target: this.dom.querySelector('.artist-header-right'),
              style: {
                color: '#56D45B'
              }
            }));
          });
        }
      } else {
        // Remove header right, update header center class to take remaining space
        this.dom.querySelector('.artist-header-right').classList.add('collapsed');
        this.dom.querySelector('.artist-header-center').classList.add('expanded');
      }

      const albums = this.dom.querySelector('#released-albums');
      if (albums && albums.children) {
        for (let i = 0; i < albums.children.length; ++i) {
          albums.children[i].addEventListener('click', this._albumClicked);
        }

        this._scroll.push(new ScrollBar({
          target: albums,
          horizontal: true,
          style: {
            color: '#56D45B'
          }
        }));

        resolve();
      } else {
        reject('F_RELEASEARTIST_INVALID_HTML');
      }
    });
  }


  _pictureClicked() {
    mzk.setModal({
      name: 'ArtistPicture',
      path: this.dom.querySelector('#artist-picture').children[0].children[0].children[0].src,
      artist: this.dom.querySelector('#artist-name').innerHTML
    });
  }
  

  _artistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });    
  }


  _albumClicked() {
    mzk.setView({
      name: 'Album',
      id: this.dataset.id
    });
  }


}


export default ReleaseArtistView;
