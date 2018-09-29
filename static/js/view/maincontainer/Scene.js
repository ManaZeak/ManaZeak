import ListView from './views/ListView.js';
'use_strict';

class Scene {
  constructor() {
    this._scene = document.getElementById('scene');

    this.test();
  }

  addView(node) {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }

  addOverlay(node) {
    let fragment = document.createDocumentFragment();
    node.classList.add('overlay');
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }

  updateView(view) {
    let l = {};
    let options = {};

    if (view.VIEW === 'LIST') {
      let columns = [];
      for (let i = 0; i < view.LISTVIEW.COLS.length; ++i) {
        columns.push({
          name: view.LISTVIEW.COLS[i].NAME,
          order: i, // view.LISTVIEW.COLS[i].ORDER
          width: view.LISTVIEW.COLS[i].WIDTH
        });
      }
    }
  }

  test() { // This has to go when controls are a thing
    let tracks = [];

  	for (let i = 0; i < 100; ++i) {
      tracks.push({
        id: i,
        title: 'title ' + i,
        artist: 'artist',
        composer: 'composer',
        performer: 'performer',
        album: 'album',
        genre: 'genre',
        duration: '01:03:21'
      });
  	}

  	let options = {
  			columns: [
          {
  					name: 'Duration',
            order: 0,
  					width: '10'
  				},
  				{
  					name: 'Title',
            order: 1,
  					width: '20'
  				},
  				{
  					name: 'Artist',
            order: 2,
  					width: '14'
  				},
  				{
  					name: 'Composer',
            order: 3,
  					width: '14'
  				},
  				{
  					name: 'Performer',
            order: 4,
  					width: '14'
  				},
  				{
  					name: 'Album',
            order: 5,
  					width: '14'
  				},
  				{
  					name: 'Genre',
            order: 6,
  					width: '14'
  				}
  			],
  			target: this._scene,
  			availableColumns: [
          {
  					name: 'Duration',
            order: 0,
  					width: '10'
  				},
  				{
  					name: 'Title',
            order: 1,
  					width: '20'
  				},
  				{
  					name: 'Artist',
            order: 2,
  					width: '14'
  				},
  				{
  					name: 'Composer',
            order: 3,
  					width: '14'
  				},
  				{
  					name: 'Performer',
            order: 4,
  					width: '14'
  				},
  				{
  					name: 'Album',
            order: 5,
  					width: '14'
  				},
  				{
  					name: 'Genre',
            order: 6,
  					width: '14'
  				}
  			]
  		};

    let view = new ListView(options);

    this.addView(view.getDOMFragment());

//    let a = document.createElement('DIV');
//    this.addOverlay(a);

    view.addTracks(tracks);
    setTimeout(() => {
      view.centerOn(2);
      //view.addTracks(tracks);
    }, 500);

    Notification.info({ message: 'Success UI start' });
  }
}

export default Scene;
