import SceneView from '../utils/SceneView';
'use strict';


class UserPageView extends SceneView {


  constructor(options) {
    super(options);

    this._evtIds = [];
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
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _buildView() {
    return new Promise(resolve => {
      /* Append service style into document */
      Utils.appendLinkInHead('static/dist/css/userprofile.bundle.css');
      resolve();
    });
  }


  _events() {
    return new Promise(resolve => {
      this._evtIds.push(Events.addEvent('click', this.dom.querySelector('#password'), this._resetPassword, this));
      this._evtIds.push(Events.addEvent('click', this.dom.querySelector('#theme-switch'), this._switchTheme, this));
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


  _resetPassword() {
    mzk.setModal({
      name: 'ResetPassword',
      url: '/fragment/modal/reset-password'
    });
  }


}


export default UserPageView;
