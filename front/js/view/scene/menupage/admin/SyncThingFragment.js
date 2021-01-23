class SyncThingFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._evtIds = [];

    this._fillAttributes();
  }


  destroy() {
    for (let i = 0; i < this._evtIds.length; ++i) {
      Events.removeEvent(this._evtIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {

  }


}


export default SyncThingFragment;
