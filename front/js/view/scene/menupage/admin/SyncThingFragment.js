class SyncThingFragment {


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
    console.log(this._target.querySelector('#syncthing-iframe').contentWindow.document)
  }


}


export default SyncThingFragment;
