class ProfileFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._evtIds = [];

    this._fillAttributes();
  }


  destroy() {
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    this._evtIds.push(Events.addEvent('click', this._target.querySelector('#password'), this._resetPassword, this));
  }


  _resetPassword() {
    mzk.setModal({
      name: 'ResetPassword',
      url: '/fragment/modal/reset-password'
    });
  }


}


export default ProfileFragment;
