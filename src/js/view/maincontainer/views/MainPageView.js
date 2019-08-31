import SceneView from '../SceneView';
import CollectionGroup from "./mainpage/CollectionGroup";
import ScrollBar from "../../utils/ScrollBar";
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
      .then(this._fillSuggestion.bind(this));
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

          Events.fire('SceneViewReady');
          resolve();
        });
    });
  }


  _fillCollection() {
    return new Promise(resolve => {
      //mzk.komunikator.get('view/mainPage/collection/')
        //.then(response => {
          //console.log(response);
      // TMP stuff to be replaced with server call
        const options = {
          libraries : [
            {
              id: 11,
              name: 'ManaZeak Artists',
              duration: 15050,
              img: 'static/img/logo/manazeak-logo.svg',
              stats: {
                tracks: 50,
                artists: 20,
                albums: 40
              }
            }, {
              name: 'ManaZeak Compilations',
              duration: 15050,
              img: 'static/img/logo/manazeak-logo.svg',
              stats: {
                tracks: 50,
                artists: 20,
                albums: 40
              }
            }
          ],
          playlists: [
            {
              id: 11,
              name: 'ManaZeak Artists',
              duration: 15050,
              img: 'static/img/logo/manazeak-logo.svg',
              stats: {
                tracks: 50,
                artists: 20,
                albums: 40
              }
            }, {
              name: 'ManaZeak Artists',
              duration: 15050,
              img: 'static/img/logo/manazeak-logo.svg',
              stats: {
                tracks: 50,
                artists: 20,
                albums: 40
              }
            }, {
              name: 'ManaZeak Artists',
              duration: 15050,
              img: 'static/img/logo/manazeak-logo.svg',
              stats: {
                tracks: 50,
                artists: 20,
                albums: 40
              }
            }, {
              name: 'ManaZeak Artists',
              duration: 15050,
              img: 'static/img/logo/manazeak-logo.svg',
              stats: {
                tracks: 50,
                artists: 20,
                albums: 40
              }
            }, {
              name: 'ManaZeak Artists',
              duration: 15050,
              img: 'static/img/logo/manazeak-logo.svg',
              stats: {
                tracks: 50,
                artists: 20,
                albums: 40
              }
            }, {
              name: 'ManaZeak Artists',
              duration: 15050,
              img: 'static/img/logo/manazeak-logo.svg',
              stats: {
                tracks: 50,
                artists: 20,
                albums: 40
              }
            }
          ]
        };

        if (options.libraries.length > 0) {
          const libraries = new CollectionGroup({
            label: 'Libraries',
            items: options.libraries
          });
          this._dom.collection.appendChild(libraries.dom);
        }

        if (options.libraries.length > 0) {
          const libraries = new CollectionGroup({
            label: 'Playlists',
            items: options.playlists
          });
          this._dom.collection.appendChild(libraries.dom);
        }

        new ScrollBar({
          target: this._dom.collection
        });
        this._dom.collection = this._dom.collection.firstElementChild.firstElementChild;

          resolve();
        //});
    });
  }


  _fillSuggestion() {
    return new Promise(resolve => {
      //const options = {
        //NUMBER_OF_ELEMENT: '5'
      //};

      //mzk.komunikator.post('view/mainPage/roll/', options)
        //.then(response => {
          const scrollTarget = this._dom.suggestion.getElementsByClassName('mp-suggestions-container')[0];
          console.dir(scrollTarget);
          this._scrollBar = new ScrollBar({
            target: this._dom.suggestion
          });
          this._dom.suggestion = this._dom.suggestion.firstElementChild.firstElementChild; // ScrollBar creates two wrappers

          resolve();
        //});
    });
  }


  get dom() {
    return this._dom.wrapper;
  }

  
}


export default MainPageView;