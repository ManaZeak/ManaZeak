import SceneView from '../utils/SceneView';
import Graph from '../../navigation/Graph';


class GenreGraphView extends SceneView  {


  constructor() {
    super({
      type: 'graph',
      url: '/fragment/library/genre/genre-graph.html'
    });

    this._graph = null;
    this._dataPath = '/static/GenresTaxonomy.json';
    this._data = {};

    this._fetchWrapper(this._url)
      .then(this._fetchData.bind(this, this._dataPath))
      .then(this._viewReady) // We must ensure DOM is computed to its height/width
      .then(this._buildGraph.bind(this))
      .catch(error => Logger.raise(error));
  }

  // TODO share in parent class GraphView
  _fetchData(url) {
    return new Promise((resolve, reject) => {
      mzk.kom.get(url)
        .then(response => {
          try {
            this._data = response;
            resolve();
          } catch {
            reject();
          }
        })
        .catch(reject);
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


  _genreClicked(data) {
    console.log(data);
  }


}


export default GenreGraphView;
