class QueueEntry {


  constructor(options) {
    this._renderTo = options.renderTo;
    this._dom = {
      container: {},
      cover: {},
      position: {},
      title: {},
      artist: {},
      nav: {
        container: {},
        up: {},
        down: {},
        trash: {}
      }
    };

    this._buildQueueEntry(options);
  }


  _buildQueueEntry(options) { // TODO get template of entry with css class etc
      const i = options.i;
      const track = options.track;

      this._dom.container = document.createElement('DIV');
      this._dom.container.classList.add('queued-track');

      this._dom.cover = document.createElement('IMG');
      if (track.cover && Utils.imageUrlExists(`/static/covers/${track.cover}`) === true) {
        this._dom.cover.src = `/static/covers/${track.cover}`;
      } else {
        this._dom.cover.src = `/static/img/default/cover.svg`;
      }

      this._dom.position = document.createElement('P');
      this._dom.position.classList.add('position');
      this._dom.position.innerHTML = i + 1;

      this._dom.title = document.createElement('P');
      this._dom.title.classList.add('title');
      this._dom.title.innerHTML = track.title;

      this._dom.artist = document.createElement('P');
      this._dom.artist.innerHTML = `${track.albumArtist}<br>${track.composers}`;

      this._dom.nav.container = document.createElement('DIV');
      this._dom.nav.up = document.createElement('IMG');
      this._dom.nav.down = document.createElement('IMG');
      this._dom.nav.trash = document.createElement('IMG');

      this._dom.nav.up.src = '/static/img/navigation/nav-up.svg';
      this._dom.nav.down.src = '/static/img/navigation/nav-down.svg';
      this._dom.nav.trash.src = '/static/img/actions/close.svg';

      this._dom.nav.up.classList.add('up');
      this._dom.nav.down.classList.add('down');
      this._dom.nav.trash.classList.add('trash');

      this._moveTrackInQueueEvents(i);

      this._dom.nav.container.appendChild(this._dom.nav.up);
      this._dom.nav.container.appendChild(this._dom.nav.trash);
      this._dom.nav.container.appendChild(this._dom.nav.down);

      this._dom.container.appendChild(this._dom.cover);
      this._dom.container.appendChild(this._dom.position);
      this._dom.container.appendChild(this._dom.title);
      this._dom.container.appendChild(this._dom.artist);
      this._dom.container.appendChild(this._dom.nav.container);

      this._renderTo.appendChild(this._dom.container);
  }

  _moveTrackInQueueEvents(index) {
    this._dom.nav.down.addEventListener('click', () => {
      mzk.model.swapQueueDown(index);
    });

    this._dom.nav.up.addEventListener('click', () => {
      mzk.model.swapQueueUp(index);
    });

    this._dom.nav.trash.addEventListener('click', () => {
      mzk.model.removeFromQueue(index);
      mzk.ui.updateQueueNumber(mzk.model.queue);
    });
  }
}


export default QueueEntry;
