import SceneView from '../utils/SceneView';
import Graph from '../../navigation/Graph';


class GenreGraphView extends SceneView  {


  constructor() {
    super({
      type: 'graph',
      url: '/fragment/library/genre/genre-graph/'
    });

    this._graph = null;
    this._dataPath = '/static/GenresTaxonomy.json';
    this._data = {};

    this._genres = {};

    this._fetchWrapper(this._url)
      .then(this._fetchData.bind(this, this._dataPath))
      .then(this._init.bind(this))
      .then(this._viewReady) // We must ensure DOM is computed to its height/width
      .then(this._buildGraph.bind(this))
      .catch(this._viewFailed);
  }


  destroy() {
    this._graph.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _fetchData(url) {
    return new Promise((resolve, reject) => {
      mzk.kom.get(url).then(response => {
        try {
          this._data = response;
          resolve();
        } catch {
          reject();
        }
      }).catch(reject);
    });
  }


  _init() {
    return new Promise(resolve => {
      const genres = this._data.genres.subgenres;
      for (let i = 0; i < genres.length; ++i) {
        this._genres[genres[i].name] = genres[i];
      }
      resolve();
    });
  }

  _buildGraph() {
    return new Promise(resolve => {
      this._graph = new Graph({
        cellClicked: this._genreClicked.bind(this),
        data: this._data,
        container: this.dom.querySelector('#graph-container'),
        style: {
            node: {
                background: 'rgb(225, 225, 225)',
                selectedBackground: 'rgb(225, 125, 125)',
                hoveredBackground: 'rgb(125, 125, 255)',
                fontSize: 16,
                height: 32,
                maxTextWidth: 120,
                paddingH: 70,
                paddingV: 20,
                radius: 5,
                width: 140
            },
            tree: {
                airspaceH: 420,
                airspaceV: 10,
                connectorColor: '#FFFFFF',
                orientation: 3
            }                   
          }
      });

      resolve();
    });
  }


  _genreClicked(data = {}) {
    if (data.name && data.info) {
      document.getElementById('genre-name').innerHTML = data.name;
      document.getElementById('genre-start').innerHTML = data.info.start;
      document.getElementById('genre-cover').src = `/resources/genre_cover/${data.name}.jpg`;
      document.getElementById('graph-aside').style.opacity = 1;
    } else {
      document.getElementById('graph-aside').style.opacity = 0;      
    }
  }


}


export default GenreGraphView;
