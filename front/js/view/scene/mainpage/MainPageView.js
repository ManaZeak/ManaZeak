import SceneView from '../utils/SceneView';
import ScrollBar from '../../navigation/ScrollBar';


class MainPageView extends SceneView {


  constructor() {
    super({
      type: 'main',
      url: '/fragment/mainpage/',
      css: 'static/dist/css/mainpage.bundle.css'
    });

    this._formatUrl();

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


  _formatUrl() {
    const bRect = document.body.getBoundingClientRect();
    let amount = 15; /* Std 1920 */

    if (bRect.width < 640) {
      amount = 12;
    } else if (bRect.width < 766) {
      amount = 15;
    } else if (bRect.width < 886) {
      amount = 18;
    } else if (bRect.width < 1000) {
      amount = 14;
    } else if (bRect.width < 1120) {
      amount = 16;
    } else if (bRect.width < 1240) {
      amount = 18;
    } else if (bRect.width < 1360) {
      amount = 20;
    } else if (bRect.width < 1480) {
      amount = 22;
    } else if (bRect.width < 1600) {
      amount = 24;
    } else if (bRect.width < 1726) {
      amount = 26;
    } else if (bRect.width < 1840) {
      amount = 28;
    } else if (bRect.width > 1920) {
      amount = 30;
    }
    this._url = `${this._url}${amount}/`
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


  getDisplayName() {
    return 'Home';
  }


}


export default MainPageView;
