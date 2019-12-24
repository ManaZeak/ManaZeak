import AllTagsView from "../AllTagsView";
import ScrollBar from "../../../../component/bar/ScrollBar";
'use strict';


class AllLabelsView extends AllTagsView {


  constructor() {
    super({
      type: 'label'
    });

    this._letterGroups = {}; // The object that contains each individual first letter items

    this._init()
      .then(this._processAllLabels.bind(this))
      .then(this._buildView.bind(this))
      .then(this._viewReady);
  }


  _processAllLabels(response) {
    return new Promise(resolve => {
      this._dom.title.innerHTML = mzk.lang.allObjectsView.labels.title;
      this._dom.description.innerHTML = `${mzk.lang.allObjectsView.labels.description} ${response.LABELS.length} ${mzk.lang.playlist.labels}.`;
      // Separate response into letterKey objects
      let letters = '';
      for (let i = 0; i < response.LABELS.length; ++i) {
        const letterKey = response.LABELS[i].LABEL_NAME.charAt(0).toLowerCase(); // Get the first letter
        if (letters.indexOf(letterKey) === -1) {
          letters += letterKey;
          this._letterGroups[letterKey] = [ response.LABELS[i] ]; // Index the artists by unique letters.
        } else {
          this._letterGroups[letterKey].push(response.LABELS[i]); // Add to the existing list
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
  }


  _buildView() {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this._letterGroups);
      keys.sort();
      // Iterate over letter groups object
      for (let i = 0; i < keys.length; ++i) {
        const container = document.createElement('DIV');
        const letter = document.createElement('H1');

        container.classList.add('allart-letter-container');
        letter.innerHTML = keys[i].toUpperCase();

        const letterArtistsWrapper = document.createElement('DIV');
        letterArtistsWrapper.classList.add('allart-letter-artists');

        container.appendChild(letter);
        container.appendChild(letterArtistsWrapper);
        this._dom.wrapper.appendChild(container);

        for (let j = 0; j < this._letterGroups[keys[i]].length; ++j) {
          const imgContainer = document.createElement('DIV');
          const artistImg = document.createElement('IMG');

          imgContainer.classList.add('tooltip-bottom');
          imgContainer.dataset.tooltip = this._letterGroups[keys[i]][j].LABEL_NAME;
          imgContainer.dataset.id = this._letterGroups[keys[i]][j].LABEL_ID;

          if (this._letterGroups[keys[i]][j].LABEL_PP !== null) {
            artistImg.src = this._letterGroups[keys[i]][j].LABEL_PP;
          } else {
            artistImg.src = 'static/img/object/label.svg';
          }

          imgContainer.addEventListener('click', () => {
            mzk.ui.setSceneView({
              name: 'SingleLabel',
              uiName: this._letterGroups[keys[i]][j].LABEL_NAME,
              id: this._letterGroups[keys[i]][j].LABEL_ID
            });
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


export default AllLabelsView;