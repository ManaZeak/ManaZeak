import CollectionGroup from "../component/CollectionGroup";
import ScrollBar from "../component/bar/ScrollBar";

class Aside {


  constructor() {
    this._dom = {
      collection: null
    };

    this._dom.collection = document.getElementsByClassName('aside')[0];
    this._fillCollection();
  }


  _fillCollection() {
    return new Promise(resolve => {
      mzk.komunikator.get('view/mainPage/collection/')
        .then(response => {
          if (response.LIBRARY.length > 0) {
            const libraries = new CollectionGroup({
              label: 'Libraries',
              items: response.LIBRARY
            });
            this._dom.collection.appendChild(libraries.dom);
          }

          if (response.PLAYLISTS.length > 0) {
            const libraries = new CollectionGroup({
              label: 'Playlists',
              items: response.PLAYLIST
            });
          }

          const playbackModes = new CollectionGroup({
            label: 'PlaybackModes'
          });

          this._dom.collection.appendChild(playbackModes.dom);

          new ScrollBar({
            target: this._dom.collection
          });
          this._dom.collection = this._dom.collection.firstElementChild.firstElementChild;
          resolve();
        });
    });
  }


}


export default Aside;