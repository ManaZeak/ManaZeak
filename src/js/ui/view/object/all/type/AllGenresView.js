import AllTagsView from "../AllTagsView";
import ScrollBar from "../../../../component/bar/ScrollBar";
'use strict';


class AllGenresView extends AllTagsView {


  constructor() {
    super({
      type: 'genre'
    });

    this._genres = [];

    this._init()
      .then(this._processAllGenres.bind(this))
      .then(this._buildView.bind(this))
      .then(this._viewReady);
  }


  _processAllGenres(response) {
    return new Promise(resolve => {
      this._genres = response.GENRES;
      console.log(response)
      resolve();
    });
  }


  _buildView() {
    return new Promise(resolve => {
      const genresContainer = this._dom.wrapper.firstElementChild;
      for (let i = 0; i < this._genres.length; ++i) {
        const container = document.createElement('DIV');
        const logo = document.createElement('IMG');
        const name = document.createElement('P');

        container.classList.add('genre-item');

        if (this._genres[i].GENRE_LOGO !== null) {
          logo.src = this._genres[i].GENRE_LOGO;
        } else {
          logo.src = 'static/img/object/genre.svg';
        }

        name.innerHTML = this._genres[i].GENRE_NAME;

        container.addEventListener('click', () => {
          mzk.ui.setSceneView({
            name: 'SingleGenre',
            uiName: this._genres[i].GENRE_NAME,
            id: this._genres[i].GENRE_ID
          });
        }, false);

        container.appendChild(logo);
        container.appendChild(name);
        requestAnimationFrame(genresContainer.appendChild.bind(genresContainer, container));
      }

      new ScrollBar({
        target: this._dom.wrapper
      });

      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default AllGenresView;