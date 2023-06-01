import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';
import ItemViewHelperMixin from '../utils/ItemViewHelperMixin';


class LabelView extends ItemViewHelperMixin(SceneView) {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/label/${options.id}/`
    });

    this._name = '';
    this._albums = [];
    this._artists = [];

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
      this._name = this.dom.querySelector('#label-name').innerHTML;
      /* Build albums */
      this._albums = this.dom.querySelector('#released-albums');
      this._artists = this.dom.querySelector('#label-artists');
      if (this._albums?.children || this._artists?.children) {
        this._buildArtistAlbums();

        this._scrolls.push(new ScrollBar({
          target: this._albums,
          horizontal: true,
          style: {
            color: '#56D45B'
          }
        }));
        this._albums = this._albums.children[0].children[0];
  
        this._scrolls.push(new ScrollBar({
          target: this._artists,
          horizontal: true,
          style: {
            color: '#56D45B'
          }
        }));
    
        this._artists = this._artists.children[0].children[0];

        this._handleItemSorting('albums', this._albums);
        this._handleItemSorting('artists', this._artists);
      } else {
        reject('F_RELEASEARTIST_INVALID_HTML');
        return;
      }

      // Global view scroll
      this._scrolls.push(new ScrollBar({
        target: this.dom,
        style: {
          color: '#56D45B'
        }
      }));

      this.updateScrollbars();
      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
      resolve();
    });    
  }


  _buildArtistAlbums() {
    for (let i = 0; i < this._albums.children.length; ++i) {
      let title = this._albums.children[i].lastElementChild.innerHTML;
      if (title.includes(' EP')) {
        title = title.replace(' EP', '');
        this._albums.children[i].querySelector('.ep-sp').innerHTML = 'EP';
      }

      if (title.includes(' - Single')) {
        title = title.replace(' - Single', '');
        this._albums.children[i].querySelector('.ep-sp').innerHTML = 'SP';
      }
      // Update album title if needed
      this._albums.children[i].lastElementChild.innerHTML = title;
      this._albums.children[i].addEventListener('click', this._albumClicked);
    }
  }


  _handleItemSorting(type, items) {
    const sortItems = this.dom.querySelector(`#sort-${type}`);
    sortItems.addEventListener('click', () => {
      sortItems.classList.toggle('active');
      let elements = [].slice.call(items.children);
      elements = elements.reverse();
      for (let i = 0; i < items.children.length; ++i) {
        items.children[i].remove();
      }
      for (let i = 0; i < elements.length; ++i) {
        items.appendChild(elements[i]);
      }
    });    
  }


  getDisplayName() {
    return `Label <b>${this._name}</b>`;
  }


}


export default LabelView;
