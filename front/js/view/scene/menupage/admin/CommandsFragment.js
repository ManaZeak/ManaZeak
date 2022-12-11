class CommandsFragment {


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
    // Saving users and badge from template
    const scanButton = this._target.querySelector('#scan-library');
    this._evtIds.push(Evts.addEvent('click', scanButton, this._scanClicked));

    const regenThumbs = this._target.querySelector('#regen-thumbs');
    this._evtIds.push(Evts.addEvent('click', regenThumbs, this._thumbsClicked));

    const regenMoods = this._target.querySelector('#regen-moods');
    this._evtIds.push(Evts.addEvent('click', regenMoods, this._moodsClicked));
  }


  _scanClicked() {
    mzk.kom.get('/admin/library/scan/').then(response => {
      response.notifications[0].type = response.notifications[0].severity;
      Notif.new(response.notifications[0]);
    }).catch(error => {
      Notif.new(error.notifications[0]);
    });
  }


  _thumbsClicked() {
    mzk.kom.get('/admin/library/regenThumbs/').then(response => {
      response.notifications[0].type = response.notifications[0].severity;
      Notif.new(response.notifications[0]);
    }).catch(() => {
      Notif.new(error.notifications[0]);
    });
  }


  _moodsClicked() {
    console.log('Regen moods clicked');
  }


}


export default CommandsFragment;
