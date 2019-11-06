import CollectionGroup from "../component/CollectionGroup";
import ScrollBar from "../component/bar/ScrollBar";

class Aside {


  constructor() {
    this._dom = {
      home: null,
      collection: null
    };

    this._dom.home = document.getElementsByClassName('aside-main-page')[0];
    this._dom.collection = document.getElementsByClassName('aside-content')[0];

    this._fillCollection();
    this._setLangFeedback();
    this._events();
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


  _events() {
    Events.register({
      name: 'MzkInitDone'
    }, () => {
      this._dom.home.addEventListener('click', mzk.ui.setSceneView.bind(mzk.ui, { name: 'MainPage' }), false);
    });
  }


  _setLangFeedback() {
    this._dom.home.parentNode.classList.add('tooltip-left');
    this._dom.home.parentNode.dataset.tooltip = mzk.lang.mainpage.reroll;
  }


  set homeButtonSrcOnMainPage(mainPageOn) {
    if (mainPageOn === true) {
      this._dom.home.src = '/static/img/navigation/home.svg';
      this._dom.home.parentNode.dataset.tooltip = mzk.lang.mainpage.goto;
    } else {
      this._dom.home.src = '/static/img/player/shuffle-random-on.svg';
      this._dom.home.parentNode.dataset.tooltip = mzk.lang.mainpage.reroll;
    }
  }


}


export default Aside;