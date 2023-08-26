import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';
import ItemViewHelperMixin from '../utils/ItemViewHelperMixin';


class ReleaseArtistView extends ItemViewHelperMixin(SceneView) {


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
      this._members = this.dom.querySelector('#artist-members');
      if (this._members?.children?.length) {
        this._buildArtistMembers();
      } else {
        // Remove header right, update header center class to take remaining space
        this.dom.querySelector('.artist-header-right').classList.add('collapsed');
        this.dom.querySelector('.artist-header-center').classList.add('expanded');
      }
      /* Build albums */
      this._itemsTitle = this.dom.querySelectorAll('.items-title');
      this._itemsContainers = this.dom.querySelectorAll('.items-container');

      if (this._itemsContainers.length > 0) {
        this._albums = this._itemsContainers[0];

        for (let i = 0; i < this._itemsContainers.length; ++i) {
          this._buildArtistAlbums(this._itemsContainers[i], this._itemsTitle[i]);

          this._scrolls.push(new ScrollBar({
            target: this._itemsContainers[i],
            horizontal: true,
            style: {
              color: '#56D45B'
            }
          }));

          this._handleAlbumSorting(this._itemsContainers[i], this._itemsTitle[i].querySelector('.sort-releases'));
        }
        // Global view scroll
        this._scrolls.push(new ScrollBar({
          target: this.dom,
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


  _buildArtistMembers() {
    this.dom.querySelector('.artist-header-right').classList.add(`collapsed-${this._members.children.length}`);
    this.dom.querySelector('.artist-header-center').classList.add(`expanded-${this._members.children.length}`);
    for (let i = 0; i < this._members.children.length; ++i) {
      this._members.children[i].addEventListener('click', this._artistClicked);
    }
    // Add scrollbar to members
    if (this._members.children.length > 4) {
      this.dom.querySelector('.artist-header-right').classList.add('many-members');
      // Ensure height is properly applied before creating scroll on performers
      if (this._members.children.length > 8) {
        requestAnimationFrame(() => {
          this._scrolls.push(new ScrollBar({
            target: this.dom.querySelector('.artist-header-right'),
            style: {
              color: '#56D45B'
            }
          }));
        });
      }
    }
  }


  _buildArtistAlbums(elements, title) {
    if (elements.children.length === 0) {
      title.remove();
      return;
    }

    for (let i = 0; i < elements.children.length; ++i) {
      let title = elements.children[i].lastElementChild.innerHTML;
      if (title.includes(' EP')) {
        title = title.replace(' EP', '');
        elements.children[i].querySelector('.ep-sp').innerHTML = 'EP';
      }

      if (title.includes(' - Single')) {
        title = title.replace(' - Single', '');
        elements.children[i].querySelector('.ep-sp').innerHTML = 'SP';
      }
      // Update album title if needed
      elements.children[i].lastElementChild.innerHTML = title;
      elements.children[i].addEventListener('click', this._albumClicked);
    }
  }


  _handleAlbumSorting(elementsList, sortArtistReleases) {
    elementsList = elementsList.children[0].children[0]; // Forget about scrollbar here
    sortArtistReleases.addEventListener('click', () => {
      sortArtistReleases.classList.toggle('active');
      let elements = [].slice.call(elementsList.children);
      elements = elements.reverse();
      for (let i = 0; i < elementsList.children.length; ++i) {
        elementsList.children[i].remove();
      }
      for (let i = 0; i < elements.length; ++i) {
        elementsList.appendChild(elements[i]);
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


  getDisplayName() {
    return `Artist <b>${this._artist}</b>`;
  }


}


export default ReleaseArtistView;
