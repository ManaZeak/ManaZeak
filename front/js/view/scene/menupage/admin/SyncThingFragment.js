class SyncThingFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._evtIds = [];
  }


  destroy() {
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


}


export default SyncThingFragment;
