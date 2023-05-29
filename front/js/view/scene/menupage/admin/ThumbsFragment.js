import Pager from '../../../../utils/Pager.js';
import ScrollBar from '../../../navigation/ScrollBar';


class ThumbsFragment {


    constructor(options) {
      this._target = options.target;
      this._refreshCB = options.refresh;
  
      this._pager = null;
      this._totalItems = 0;
      this._page = 1;

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
      this._updateView();
    }


    _events() {
      // Search input fields listeners
      const entities = this._target.querySelector('#entity-type');
      for (let i = 0; i < entities.children.length; ++i) {
        entities.children[i].target = this._target;
        entities.children[i].cb = this._updateView.bind(this);
        this._evtIds.push(Evts.addEvent('click', entities.children[i], this._entityClicked, entities.children[i]))
      }

      // Search input fields listeners
      const errors = this._target.querySelector('#error-type');
      for (let i = 0; i < errors.children.length; ++i) {
        errors.children[i].target = this._target;
        errors.children[i].cb = this._updateView.bind(this);
        this._evtIds.push(Evts.addEvent('click', errors.children[i], this._errorClicked, errors.children[i]))
      }

      // Saving users and badge from template
      const searchButton = this._target.querySelector('#thumbs-search');
      this._evtIds.push(Evts.addEvent('click', searchButton, this._updateView, this));
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


    _updateView() {
      // Saving users and badge from template
      mzk.kom.postText('/fragment/admin/thumb/list/', this._buildSearchPayload()).then(response => {
        if (this._scroll) {
          this._scroll.destroy();
        }

        if (this._pager) {
          this._pager.destroy();
        }

        document.getElementById('errors-wrapper').innerHTML = response;
        requestAnimationFrame(() => {
          this._totalItems = document.getElementById('errors-container').dataset.total;
          document.getElementById('errors-amount').innerHTML = this._totalItems;
          this._scroll = new ScrollBar({
            target: document.getElementById('errors-wrapper'),
            style: {
              color: '#56D45B'
            }
          });
          this._pager = new Pager({
            target: document.getElementById('pager-wrapper'),
            size: this._totalItems,
            maxItems: 20,
            active: this._page,
            clicked: page => {
              this._page = page;
              this._updateView();
            }
          });        
        });
      });
    }


    _buildSearchPayload() {
      let entityTypeId = null;
      const entities = this._target.querySelector('#entity-type');
      for (let i = 0; i < entities.children.length; ++i) {
        if (entities.children[i].classList.contains('selected')) {
          entityTypeId = entities.children[i].dataset.id;
          break;
        }
      }
      let errorType = null;
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
        page: this._page
      };
    }
  
  
  }
  
  
  export default ThumbsFragment;
  