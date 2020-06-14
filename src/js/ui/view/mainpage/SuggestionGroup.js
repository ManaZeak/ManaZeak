import SuggestionEntry from "./entry/SuggestionEntry";


class SuggestionGroup {


  constructor(options) {
    this._label = options.label;
    this._type = options.type;
    this._items = options.items;

    this._dom = {
      container: null,
      title: null,
      seeMore: null,
      itemsContainer: null
    };

    this._entries = [];

    this._seeMoreForType = this._seeMoreForType.bind(this);

    this._init();
    this._addEvents();
  }


  destroy() {
    for (let i = 0; i < this._entries.length; ++i) {
      this._entries[i].destroy();
    }

    this._removeEvents();
    Utils.removeAllObjectKeys(this);
  }


  _init() {
    this._dom.container = document.createElement('DIV');
    this._dom.title = document.createElement('H1');
    this._dom.seeMore = document.createElement('SPAN');
    this._dom.itemsContainer = document.createElement('DIV');

    this._dom.container.classList.add('mp-suggestion-group');
    this._dom.itemsContainer.classList.add('mp-suggestion-item-container');

    for (let i = 0; i < this._items.length; ++i) {
      const element = new SuggestionEntry({
        entry: this._items[i],
        type: this._type
      });

      this._entries.push(element);
      this._dom.itemsContainer.appendChild(element.dom);
    }

    this._dom.title.innerHTML = mzk.lang.playlist[this._label];
    this._dom.seeMore.innerHTML = mzk.lang.mainpage.suggestion.seemore;

    this._dom.title.appendChild(this._dom.seeMore);

    this._dom.container.appendChild(this._dom.title);
    this._dom.container.appendChild(this._dom.itemsContainer);
  }


  _addEvents() {
    this._dom.seeMore.addEventListener('click', this._seeMoreForType, false);
  }


  _removeEvents() {
    this._dom.seeMore.removeEventListener('click', this._seeMoreForType, false);
  }


  _seeMoreForType() {
    mzk.ui.setSceneView({
      name: `All${this._type}`,
      uiName: `All ${mzk.lang.playlist[this._label]}` // TODO proper nls handling (for the all prefix)
    });
  }


  get dom() {
    return this._dom.container;
  }


}

export default SuggestionGroup;
