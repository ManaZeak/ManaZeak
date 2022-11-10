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
  }


  _scanClicked() {
    mzk.kom.get('admin/library/scan').then(response => {
      Logger.raise(response.errors[0]); // Error is great succes in then case
    }).catch(() => {
      Logger.raise('F_SCAN_REQUEST_ERROR');
    });
  }


}


export default CommandsFragment;
