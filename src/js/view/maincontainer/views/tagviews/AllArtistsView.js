import ScrollBar from "../../../utils/ScrollBar";
'use strict';


class AllArtistsView {


  constructor() {
    this._letterGroups = {}; // The object that contains each individual first letter items

    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._getAllArtists.bind(this))
      .then(this._fillAllArtists.bind(this))
      .then(this._allArtistsViewReady.bind(this));
  }

  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/all/artist/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('all-artists-page')[0];

          resolve();
        });
    });
  }

  _getAllArtists() {
    return new Promise(resolve => {
      mzk.komunikator.get(`view/all/artist`)
        .then((response) => {
          // Separate response into letterKey objects
          let letters = '';
          for (let i = 0; i < response.ARTISTS.length; ++i) {
             const letterKey = response.ARTISTS[i].ARTIST_NAME.charAt(0).toLowerCase(); // Get the first letter
             if (letters.indexOf(letterKey) === -1) {
               letters += letterKey;
               this._letterGroups[letterKey] = [ response.ARTISTS[i] ]; // Index the artists by unique letters.
             } else {
               this._letterGroups[letterKey].push(response.ARTISTS[i]); // Add to the existing list
             }
          }
          // Now grouping numerical keys together (0-9)
          const keys = Object.keys(this._letterGroups);
          let alphaNumericalGroup = [];
          for (let i = 0; i < keys.length; ++i) {
            if (isNaN(parseInt(keys[i])) === false) {
              alphaNumericalGroup = alphaNumericalGroup.concat(this._letterGroups[keys[i]]);
              delete this._letterGroups[keys[i]];
            }
          }
          // Write into letter groups
          if (alphaNumericalGroup.length > 0) {
            this._letterGroups['0-9'] = alphaNumericalGroup;
          }
          // Resolve promise to build UI
          resolve();
        });
    });
  }


  _fillAllArtists() {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this._letterGroups);
      // Iterate over letter groups object
      for (let i = 0; i < keys.length; ++i) {
        const container = document.createElement('DIV');
        const letter = document.createElement('H1');

        container.classList.add('allart-letter-container');
        letter.innerHTML = keys[i].toUpperCase();

        const letterArtistsWrapper = document.createElement('DIV');
        letterArtistsWrapper.classList.add('allart-letter-artists');
        for (let j = 0; j < this._letterGroups[keys[i]].length; ++j) {
          const imgContainer = document.createElement('DIV');
          const artistImg = document.createElement('IMG');

          imgContainer.classList.add('tooltip-bottom');
          imgContainer.dataset.tooltip = this._letterGroups[keys[i]][j].ARTIST_NAME;
          imgContainer.dataset.id = this._letterGroups[keys[i]][j].ARTIST_ID;

          if (this._letterGroups[keys[i]][j].ARTIST_PP !== null) {
            artistImg.src = this._letterGroups[keys[i]][j].ARTIST_PP;
          } else {
            artistImg.src = 'static/img/tag/artist.svg';
          }

          imgContainer.addEventListener('click', () => {
            mzk.ui.setSceneView({
              name: 'SingleArtist',
              artist: {
                id: this._letterGroups[keys[i]][j].ARTIST_ID,
                name: this._letterGroups[keys[i]][j].ARTIST_NAME,
                pp: this._letterGroups[keys[i]][j].ARTIST_PP
              }
            });
          }, false);

          imgContainer.appendChild(artistImg);
          letterArtistsWrapper.appendChild(imgContainer);
        }

        container.appendChild(letter);
        container.appendChild(letterArtistsWrapper);
        this._dom.wrapper.appendChild(container);
      }

      new ScrollBar({
        target: this._dom.wrapper
      });

      resolve();
    });
  }


  _allArtistsViewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default AllArtistsView;