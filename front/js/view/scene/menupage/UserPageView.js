import SceneView from '../utils/SceneView';
'use strict';


class UserPageView extends SceneView {


  constructor(options) {
    super(options);

    this._switchThemeEvtId = -1;
    this._theme = 'DARK'; // TODO load from pref (ls and server)

    this._fetchWrapper('/fragment/user-profile/')
      .then(this._buildView)
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Events.removeEvent(this._switchThemeEvtId);
    Utils.removeAllObjectKeys(this);
  }


  _buildView() {
    return new Promise((resolve, reject) => {
      /* Append service style into document */
      Utils.appendLinkInHead('static/dist/css/userprofile.bundle.css');
      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
      this._switchThemeEvtId = Events.addEvent('click', this.dom.querySelector('#theme-switch'), this._switchTheme, this);
      resolve();
    });
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


export default UserPageView;
