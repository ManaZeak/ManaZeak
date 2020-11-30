import SceneView from './SceneView';


class TabView extends SceneView {


  constructor(options) {
    super(options);

    this._type = options.type;
    this._url = options.url;

    this._tabs = null;
    this._tabClickedEvtIds = [];

    this._viewContainer = null;
  }


  destroy() {
    super.destroy();
    for (let i = 0; i < this._tabClickedEvtIds.length; ++i) {
      Events.removeEvent(this._tabClickedEvtIds[i]);
    }
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
    this[`_${event.target.dataset.view}Clicked`]();
  }


  _unselectTabs() {
    for (let i = 0; i < this._tabs.children.length; ++i) {
      this._tabs.children[i].classList.remove('selected');
    }
  }


  _fetchFragment(url) {
    return new Promise((resolve, reject) => {
      mzk.getFragment(url)
        .then(resolve)
        .catch(reject);
    });
  }


}


export default TabView;
