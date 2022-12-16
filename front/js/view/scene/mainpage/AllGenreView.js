import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';


class AllGenreView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: '/fragment/library/genre/all/'
    });

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _events() {
    return new Promise((resolve, reject) => {
      const genres = this.dom.querySelector('#genres-container').children;
      if (genres && genres.length) {
        for (let i = 0; i < genres.length; ++i) {
          this._evtIds.push(Evts.addEvent('click', genres[i], this._genreClicked, genres[i]));
        }
        resolve();
      } else {
        reject();
      }
    });
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      const genres = this.dom.querySelector('#genres-container').children;
      if (genres && genres.length) {
        this.dom.querySelector('#genre-count').innerHTML = this.dom.querySelector('#genre-count').innerHTML.replace('{x}', genres.length);

        this._scroll = new ScrollBar({
          target: this.dom,
          style: {
            color: '#56D45B'
          }
        });
      resolve();
      } else {
        reject();
      }
    });
  }


  _genreClicked() {
    mzk.setView({
      name: 'Genre',
      id: this.dataset.id
    });     
  }


  getDisplayName() {
    return 'All genres and styles';
  }



}


export default AllGenreView;
