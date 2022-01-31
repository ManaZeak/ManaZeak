import SceneView from '../utils/SceneView';
import ScrollBar from '../../navigation/ScrollBar';


class MainPageView extends SceneView {


  constructor() {
    super({
      type: 'main',
      url: '/fragment/mainpage/'
    });

    Utils.appendLinkInHead('static/dist/css/mainpage.bundle.css');

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
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
    const artists = this.dom.querySelector('#artists-container');
    for (let i = 0; i < artists.children.length; ++i) {
      artists.children[i].addEventListener('click', () => {
        mzk.setView({
          name: 'ArtistItem',
          id: artists.children[i].dataset.id
        });
      });
    }
  }


}


export default MainPageView;
