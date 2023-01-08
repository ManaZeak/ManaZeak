import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';


class ReleaseArtistView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/artist/${options.id}/`
    });

    this._artist = '';
    this._albums = [];
    this._scrolls = [];
    
    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      this._artist = this.dom.querySelector('#artist-name').innerHTML;
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
          this.dom.querySelector('.artist-header-right').style.height = 'calc(100% - 2 * var(--margin))';
          // Ensure height is properly applied before creating scroll on performers
          requestAnimationFrame(() => {
            this._scrolls.push(new ScrollBar({
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

      const sortArtistReleases = this.dom.querySelector('#sort-artist-releases');
      sortArtistReleases.addEventListener('click', () => {
        sortArtistReleases.classList.toggle('active');
        let elements = [].slice.call(this._albums.children);
        elements = elements.reverse();
        for (let i = 0; i < this._albums.children.length; ++i) {
          this._albums.children[i].remove();
        }
        for (let i = 0; i < elements.length; ++i) {
          this._albums.appendChild(elements[i]);
        }
      });
      /* Build albums */
      this._albums = this.dom.querySelector('#released-albums');
      if (this._albums && this._albums.children) {
        for (let i = 0; i < this._albums.children.length; ++i) {
          let title = this._albums.children[i].lastElementChild.lastElementChild.innerHTML;
          if (title.includes(' EP')) {
            title = title.replace(' EP', '');
            this._albums.children[i].querySelector('.ep-sp').innerHTML = 'SP';
          }

          if (title.includes(' - Single')) {
            title = title.replace(' - Single', '');
            this._albums.children[i].querySelector('.ep-sp').innerHTML = 'SP';
          }
          // Update album title if needed
          this._albums.children[i].lastElementChild.lastElementChild.innerHTML = title;
          this._albums.children[i].addEventListener('click', this._albumClicked);
        }

        this._scrolls.push(new ScrollBar({
          target: this._albums,
          horizontal: true,
          style: {
            color: '#56D45B'
          }
        }));

        this._albums = this._albums.children[0].children[0];

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


  getDisplayName() {
    return `Artist <b>${this._artist}</b>`;
  }


}


export default ReleaseArtistView;
