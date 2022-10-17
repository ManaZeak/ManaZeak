class PreferenceFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._theme = 'DARK'; // TODO load from pref

    this._evtIds = [];

    this._fillAttributes();
  }


  destroy() {
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#theme-switch'), this._switchTheme, this));
  }


  _switchTheme() {
    if (this._theme === 'DARK') {
      this._theme = 'LIGHT';
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      this._theme = 'DARK';
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }


}


export default PreferenceFragment;
