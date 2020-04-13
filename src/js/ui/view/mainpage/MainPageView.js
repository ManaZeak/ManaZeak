import SceneView from '../SceneView';
import SuggestionGroup from "./SuggestionGroup";
import ScrollBar from "../../component/bar/ScrollBar";
'use strict';


class MainPageView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      wrapper: null,
      suggestion: null
    };

    this._suggestionGroups = [];

    this._scrollBar = null;

    this._fetchWrapper()
      .then(this._fillSuggestion.bind(this))
      .then(this._viewReady);
  }


  destroy() {
    this._scrollBar.destroy();

    for (let i = 0; i < this._suggestionGroups.length; ++i) {
      this._suggestionGroups[i].destroy();
    }

    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/mainPage/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('main-page')[0];
          this._dom.suggestion = doc.getElementsByClassName('mp-suggestion')[0];
          this._dom.discover = doc.getElementsByClassName('mp-discover')[0];

          resolve();
        });
    });
  }


  _fillSuggestion() {
    return new Promise(resolve => {
      const options = {
        NUMBER_OF_ELEMENT: 9
      };

      mzk.komunikator.post('view/mainPage/roll/', options)
        .then(response => {
          if (response.RELEASE_ARTISTS.length > 0) {
            const artists = new SuggestionGroup({
              label: 'Release Artists',
              type: 'ReleaseArtists',
              items: response.RELEASE_ARTISTS
            });
            this._suggestionGroups.push(artists);
            this._dom.suggestion.appendChild(artists.dom);
          }

          if (response.ARTISTS.length > 0) {
            const artists = new SuggestionGroup({
              label: 'Artists',
              type: 'Artists',
              items: response.ARTISTS
            });
            this._suggestionGroups.push(artists);
            this._dom.suggestion.appendChild(artists.dom);
          }

          if (response.ALBUMS.length > 0) {
            const albums = new SuggestionGroup({
              label: 'Albums',
              type: 'Albums',
              items: response.ALBUMS
            });
            this._suggestionGroups.push(albums);
            this._dom.suggestion.appendChild(albums.dom);
          }


          if (response.PRODUCERS.length > 0) {
            const producers = new SuggestionGroup({
              label: 'Producers',
              type: 'Producers',
              items: response.PRODUCERS
            });
            this._suggestionGroups.push(producers);
            this._dom.suggestion.appendChild(producers.dom);
          }


          if (response.LABELS.length > 0) {
            const labels = new SuggestionGroup({
              label: 'Labels',
              type: 'Labels',
              items: response.LABELS
            });
            this._suggestionGroups.push(labels);
            this._dom.suggestion.appendChild(labels.dom);
          }


          if (response.GENRES.length > 0) {
            const genres = new SuggestionGroup({
              label: 'Genres',
              type: 'Genres',
              items: response.GENRES
            });
            this._suggestionGroups.push(genres);
            this._dom.suggestion.appendChild(genres.dom);
          }

          if (response.COUNTRIES.length > 0) {
            const countries = new SuggestionGroup({
              label: 'Countries',
              type: 'Countries',
              items: response.COUNTRIES
            });
            this._suggestionGroups.push(countries);
            this._dom.suggestion.appendChild(countries.dom);
          }

          this._scrollBar = new ScrollBar({
            target: this._dom.suggestion
          });
          this._dom.suggestion = this._dom.suggestion.firstElementChild.firstElementChild;

          resolve();
        });
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default MainPageView;
