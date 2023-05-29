import ScrollBar from '../../../navigation/ScrollBar';


class ThumbsFragment {


    constructor(options) {
      this._target = options.target;
      this._refreshCB = options.refresh;
  
      this._evtIds = [];
      this._scroll = null;
  
      this._init();
      this._events();
    }
  
  
    destroy() {
      Utils.clearAllEvents(this._evtIds);
      Utils.removeAllObjectKeys(this);
    }
  
  
    _init() {
      // Init page with artists that have no cover
      mzk.kom.postText('/fragment/admin/thumb/list/', {
          entityTypeId: 3,
          errorType: 1,
          processed: false,
          page: 0
        }).then(response => {
        document.getElementById('errors-wrapper').innerHTML = response;
        requestAnimationFrame(() => {
          this._scroll = new ScrollBar({
            target: document.getElementById('errors-wrapper'),
            style: {
              color: '#56D45B'
            }
          });          
        });
      });
    }


    _events() {
      // Search input fields listeners
      const entities = this._target.querySelector('#entity-type');
      for (let i = 0; i < entities.children.length; ++i) {
        entities.children[i].target = this._target;
        entities.children[i].cb = this._searchClicked.bind(this);
        this._evtIds.push(Evts.addEvent('click', entities.children[i], this._entityClicked, entities.children[i]))
      }

      // Search input fields listeners
      const errors = this._target.querySelector('#error-type');
      for (let i = 0; i < errors.children.length; ++i) {
        errors.children[i].target = this._target;
        errors.children[i].cb = this._searchClicked.bind(this);
        this._evtIds.push(Evts.addEvent('click', errors.children[i], this._errorClicked, errors.children[i]))
      }

      // Saving users and badge from template
      const searchButton = this._target.querySelector('#thumbs-search');
      this._evtIds.push(Evts.addEvent('click', searchButton, this._searchClicked, this));
    }


    _entityClicked(e) {
      const entities = this.target.querySelector('#entity-type');
      for (let i = 0; i < entities.children.length; ++i) {
        entities.children[i].classList.remove('selected');
        if (e.target.dataset.id === entities.children[i].dataset.id) {
          entities.children[i].classList.add('selected');
        }
      }
      this.cb();
    }


    _errorClicked(e) {
      const errors = this.target.querySelector('#error-type');
      for (let i = 0; i < errors.children.length; ++i) {
        errors.children[i].classList.remove('selected');
        if (e.target.dataset.id === errors.children[i].dataset.id) {
          errors.children[i].classList.add('selected');
        }
      }
      this.cb();      
    }


    _searchClicked() {
      // Saving users and badge from template
      mzk.kom.postText('/fragment/admin/thumb/list/', this._buildSearchPayload()).then(response => {
        if (this._scroll) {
          this._scroll.destroy();
        }

        document.getElementById('errors-wrapper').innerHTML = response;
        requestAnimationFrame(() => {
          this._scroll = new ScrollBar({
            target: document.getElementById('errors-wrapper'),
            style: {
              color: '#56D45B'
            }
          });          
        });
      });
    }


    _buildSearchPayload() {
      let entityTypeId = 1;
      const entities = this._target.querySelector('#entity-type');
      for (let i = 0; i < entities.children.length; ++i) {
        if (entities.children[i].classList.contains('selected')) {
          entityTypeId = entities.children[i].dataset.id;
          break;
        }
      }
      let errorType = 1;
      const errors = this._target.querySelector('#error-type');
      for (let i = 0; i < errors.children.length; ++i) {
        if (errors.children[i].classList.contains('selected')) {
          errorType = errors.children[i].dataset.id;
          break;
        }
      }
      return {
        entityTypeId: entityTypeId,
        errorType: errorType,
        processed: this._target.querySelector('#processed').checked,
        page: this._target.querySelector('#page-req').value
      };
    }
  
  
  }
  
  
  export default ThumbsFragment;
  