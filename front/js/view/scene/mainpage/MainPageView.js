import SceneView from '../utils/SceneView';
import ScrollBar from '../../navigation/ScrollBar';


class MainPageView extends SceneView {


  constructor() {
    super({
      type: 'main',
      url: '/fragment/mainpage/',
      css: 'static/dist/css/mainpage.bundle.css'
    });

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Evts.unsubscribe(this._readyEvtId);
    Utils.removeAllObjectKeys(this);
  }


  _buildNavigation() {
    this._scroll = new ScrollBar({
      target: this.dom,
      minSize: 40,
      style: {
        color: '#56D45B'
      }
    });
  }


  _events() {
    /* Release artists */
    this.dom.querySelector('#see-all-release-artists').addEventListener('click', () => {
      mzk.setView({
        name: 'AllReleaseArtist'
      });
    });
    const artists = this.dom.querySelector('#artists-container');
    for (let i = 0; i < artists.children.length; ++i) {
      artists.children[i].children[0].addEventListener('click', () => {
        mzk.setView({
          name: 'ReleaseArtist',
          id: artists.children[i].children[0].dataset.id
        });
      });
    }
    /* Genres */
    this.dom.querySelector('#see-all-genres').addEventListener('click', () => {
      mzk.setView({
        name: 'AllGenre'
      });
    });
    const genres = this.dom.querySelector('#genres-container');
    for (let i = 0; i < genres.children.length; ++i) {
      genres.children[i].children[0].addEventListener('click', () => {
        mzk.setView({
          name: 'Genre',
          id: genres.children[i].children[0].dataset.id
        });
      });
    }
    const genreGraph = this.dom.querySelector('#see-genres-graph');
    genreGraph.addEventListener('click', () => {
      mzk.setView({
        name: 'GenreGraph'
      });      
    });

    this._readyEvtId = Evts.subscribe('SceneViewReady', () => {
      if (this.dom.querySelector('#artists-container').children.length === 0) {
        mzk.setView({
          name: 'MenuPage'
        });
      }
    })
  }


}


export default MainPageView;
