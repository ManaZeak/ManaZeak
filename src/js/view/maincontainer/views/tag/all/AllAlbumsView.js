import AllTagsView from "./AllTagsView";
import ScrollBar from "../../../../utils/ScrollBar";
'use strict';


class AllAlbumsView extends AllTagsView {


  constructor() {
    super({
      type: 'album'
    });

    this._albums = [];
    this._yearGroups = {};

    this._init()
      .then(this._processAllAlbums.bind(this))
      .then(this._buildView.bind(this))
      .then(this._viewReady.bind(this));
  }


  _processAllAlbums(response) {
    return new Promise(resolve => {
      this._albums = response.ALBUMS; // Raw albums are artist / alphabeticaly rodered
      // Double sort to first sort alphabetically by title, then by year (most recent first)
      this._albums.sort((a, b) => (a.ALBUM_TITLE < b.ALBUM_TITLE) ? 1 : -1);
      this._albums.sort((a, b) => (a.ALBUM_YEAR < b.ALBUM_YEAR) ? 1 : -1);
      // Building year groups object
      let cursorYear = '';
      for (let i = 0; i < this._albums.length; ++i) {
        // Year is different from previous one, creating a new entry in year groups
        if (cursorYear !== this._albums[i].ALBUM_YEAR) {
          cursorYear = this._albums[i].ALBUM_YEAR;
          this._yearGroups[cursorYear] = [];
        }
        // Push current album
        this._yearGroups[cursorYear].push(this._albums[i]);
      }

      resolve();
    });
  }


  _buildView() {return new Promise((resolve, reject) => {
      const keys = Object.keys(this._yearGroups);
      keys.reverse(); // Most recent years come first
      // Iterate over letter groups object
      for (let i = 0; i < keys.length; ++i) {
        const container = document.createElement('DIV');
        const letter = document.createElement('H1');

        container.classList.add('allalb-year-container');
        letter.innerHTML = keys[i].toUpperCase();

        const letterArtistsWrapper = document.createElement('DIV');
        letterArtistsWrapper.classList.add('allalb-year-albums');

        container.appendChild(letter);
        container.appendChild(letterArtistsWrapper);
        this._dom.wrapper.appendChild(container);

        for (let j = 0; j < this._yearGroups[keys[i]].length; ++j) {
          const imgContainer = document.createElement('DIV');
          const artistImg = document.createElement('IMG');

          imgContainer.classList.add('tooltip-bottom');
          imgContainer.dataset.tooltip = `${this._yearGroups[keys[i]][j].ALBUM_TITLE}`;
          imgContainer.dataset.id = this._yearGroups[keys[i]][j].ALBUM_ID;

          if (this._yearGroups[keys[i]][j].ALBUM_COVER !== null) {
            artistImg.src = this._yearGroups[keys[i]][j].ALBUM_COVER;
          } else {
            artistImg.src = 'static/img/tag/album.svg';
          }

          imgContainer.addEventListener('click', () => {

          }, false);

          imgContainer.appendChild(artistImg);
          requestAnimationFrame(() => {
            letterArtistsWrapper.appendChild(imgContainer);
          });
        }
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


export default AllAlbumsView;