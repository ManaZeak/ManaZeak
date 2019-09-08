import SceneView from '../SceneView';
import CollectionGroup from "./mainpage/CollectionGroup";
import SuggestionGroup from "./mainpage/SuggestionGroup";
import ScrollBar from "../../utils/ScrollBar";
import DiscoverEntry from "./mainpage/DiscoverEntry";
'use strict';


class MainPageView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      wrapper: null,
      collection: null,
      suggestion: null,
      discover: null
    };

    this._fetchWrapper()
      .then(this._fillCollection.bind(this))
      .then(this._fillSuggestion.bind(this))
      .then(this._fillDiscover.bind(this))
      .then(this._mainPageReady);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/mainPage/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('main-page')[0];
          this._dom.collection = doc.getElementsByClassName('mp-collection')[0];
          this._dom.suggestion = doc.getElementsByClassName('mp-suggestion')[0];
          this._dom.discover = doc.getElementsByClassName('mp-discover')[0];

          resolve();
        });
    });
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
            this._dom.collection.appendChild(libraries.dom);
          }

          new ScrollBar({
            target: this._dom.collection
          });
          this._dom.collection = this._dom.collection.firstElementChild.firstElementChild;
          resolve();
        });
    });
  }


  _fillSuggestion() {
    return new Promise(resolve => {
      const options = {
        NUMBER_OF_ELEMENT: 6
      };

      mzk.komunikator.post('view/mainPage/roll/', options)
        .then(response => {
          if (response.ARTISTS.length > 0) {
            const artists = new SuggestionGroup({
              label: 'Artists',
              type: 'Artists',
              items: response.ARTISTS
            });
            this._dom.suggestion.appendChild(artists.dom);
          }

          if (response.ALBUMS.length > 0) {
            const albums = new SuggestionGroup({
              label: 'Albums',
              type: 'Albums',
              items: response.ALBUMS
            });
            this._dom.suggestion.appendChild(albums.dom);
          }

          if (response.GENRES.length > 0) {
            const genres = new SuggestionGroup({
              label: 'Genres',
              type: 'Genres',
              items: response.GENRES
            });
            this._dom.suggestion.appendChild(genres.dom);
          }

          new ScrollBar({
            target: this._dom.suggestion
          });
          this._dom.suggestion = this._dom.suggestion.firstElementChild.firstElementChild;
          resolve();
        });
    });
  }


  _fillDiscover() {
    return new Promise(resolve => {
      const discoverEntry = new DiscoverEntry({
        type: 'PartyView'
      });
      this._dom.discover.appendChild(discoverEntry.dom);

      resolve();
    });
  }


  _mainPageReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default MainPageView;