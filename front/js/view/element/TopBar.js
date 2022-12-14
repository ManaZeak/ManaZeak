class TopBar {


  constructor() {
    this._view = null;
    this._track = null;
    this._evtIds = [];
    this._init();
    this._events();
  }


  _init() {
    this._view = document.getElementById('topbar-current-view');
    this._track = document.getElementById('topbar-current-track');
  }


  _events() {
    this._evtIds.push(Evts.addEvent('click', this._view, this._viewClicked, this));
    this._evtIds.push(Evts.addEvent('click', this._track, this._trackClicked, this));
  }


  _viewClicked() {
    mzk.setView(JSON.parse(this._view.dataset.options));
  }


  _trackClicked() {
    mzk.setView(JSON.parse(this._track.dataset.view));
  }


  setView(options) {
    this._view.innerHTML = options.name;
    this._view.dataset.options = JSON.stringify(options);
  }


  setTrack(track, playObject) {
    this._track.parentNode.style.opacity = 1;
    this._track.innerHTML = `${track.artist} – ${track.title}`;
    this._track.dataset.view = JSON.stringify({
      id: playObject.id,
      name: playObject.type
    });
  }


  clearTrack() {
    this._track.parentNode.style.opacity = 0;
    setTimeout(() => {
      this._track.innerHTML = '';
      this._track.dataset.view = '';
    }, 200);
  }


}


export default TopBar;
