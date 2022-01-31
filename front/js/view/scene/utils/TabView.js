import SceneView from './SceneView';


class TabView extends SceneView {


  constructor(options) {
    super(options);

    this._tabs = null;
    this._tabClickedEvtIds = [];
    this._viewContainer = null;
    this._activeFragment = null;
    /** @private
     * @member {object} - The DOM loading overlay to use in transitions */
    this._loadingOverlay = null;
    // Build loading overlay and add its style class
    this._loadingOverlay = document.createElement('DIV');
    this._loadingOverlay.className = 'mzk-loading-overlay fit-parent';
  }


  destroy() {
    super.destroy();
    Utils.clearAllEvents(this._tabClickedEvtIds);
  }


  _fillAttributes() {
    this._tabs = this.dom.querySelector(`#${this._type}-tabs`);
    this._viewContainer = this.dom.querySelector(`#${this._type}-view`);
  }


  _events() {
    for (let i = 0; i < this._tabs.children.length; ++i) {
      const eventId = Events.addEvent('click', this._tabs.children[i], this._tabClicked, this);
      this._tabClickedEvtIds.push(eventId);
    }
  }


  _tabClicked(event) {
    this._unselectTabs();
    event.target.classList.add('selected');
    // Method needs to be implemented in child class, using data-view as prefix for clicked callback
    this[`_${event.target.dataset.view}Clicked`]();
  }


  _unselectTabs() {
    for (let i = 0; i < this._tabs.children.length; ++i) {
      this._tabs.children[i].classList.remove('selected');
    }
  }


  _fetchViewFragment(url) {
    return new Promise((resolve, reject) => {
      this._viewContainer.innerHTML = '';
      this.startLoading()
        .then(mzk.getFragment.bind(mzk, url))
        .then(response => {
          this._viewContainer.insertAdjacentHTML( 'beforeend', response);
          requestAnimationFrame(resolve);
        })
        .catch(reject)
        .finally(this.stopLoading.bind(this)); // Clear loading overlay whatever happens;
    });
  }


  _clearFragment() {
    if (this._activeFragment) {
      this._activeFragment.destroy();
      this._activeFragment = null;
    }
  }


  startLoading() {
    return new Promise(resolve => {
      this._viewContainer.appendChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }


  stopLoading() {
    return new Promise(resolve => {
      this._viewContainer.removeChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }

}


export default TabView;
