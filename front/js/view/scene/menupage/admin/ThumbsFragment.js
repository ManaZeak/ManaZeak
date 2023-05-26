class ThumbsFragment {


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
        const searchButton = this._target.querySelector('#thumbs-search');
        this._evtIds.push(Evts.addEvent('click', searchButton, this._searchClicked));

        mzk.kom.post('/admin/thumb/list/', {
          "entityTypeId": 1,
          "errorType": 1,
          "processed": true,
          "page": 1
        }).then(r => {
          console.log(r)
        })
    }


    _searchClicked() {
      // Saving users and badge from template
      mzk.kom.post('/admin/thumb/list/', {
        "entityTypeId": this._target.querySelector('#entity-type').value,
        "errorType": this._target.querySelector('#error-type').value,
        "processed": this._target.querySelector('#processed').checked,
        "page": this._target.querySelector('#page-req').value
      }).then(r => {
        console.log(r)
      })
    }
  
  
  }
  
  
  export default ThumbsFragment;
  