import AdminSceneView from "../AdminSceneView";
import AdminSuggestionEntry from "../entry/AdminSuggestionEntry";
import ScrollBar from "../../../component/bar/ScrollBar";


class AdminSuggestionView extends AdminSceneView {


  constructor(options) {
    super(options);

    this._submitted = [];
    this._accepted = [];
    this._refused = [];

    this._scrollBar = null;

    this._init()
      .then(this._initAdminSuggestionView.bind(this));
  }


  destroy() {
    super.destroy();
    this._scrollBar.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _initAdminSuggestionView() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.get('suggestion/getAll/')
        .then(response => {
          for (let i = 0; i < response.SUGGESTIONS.length; ++i) {
            let state = response.SUGGESTIONS[i].STATUS.LABEL.toLowerCase();
            const suggestion = new AdminSuggestionEntry(response.SUGGESTIONS[i]);
            // Fill internal arrays of different suggestions states
            this[`_${state}`].push(suggestion.dom);
          }

          this._fillSections();
          resolve();
        })
        .catch(reject)
    });
  }


  _fillSections() {
    this._dom.container = document.createElement('DIV');
    if (this._submitted.length > 0) {
      let pendingTitle = document.createElement('H1');
      pendingTitle.innerHTML = 'Pending suggestions';
      this._dom.container.appendChild(pendingTitle);
      for (let i = 0; i < this._submitted.length; ++i) {
        this._dom.container.appendChild(this._submitted[i]);
      }
    }

    if (this._accepted.length > 0) {
      let acceptedTitle = document.createElement('H1');
      acceptedTitle.innerHTML = 'Accepted suggestions';
      this._dom.container.appendChild(acceptedTitle);
      for (let i = 0; i < this._accepted.length; ++i) {
        this._dom.container.appendChild(this._accepted[i]);
      }
    }

    if (this._refused.length > 0) {
      let refusedTitle = document.createElement('H1');
      refusedTitle.innerHTML = 'Refused suggestions';
      this._dom.container.appendChild(refusedTitle);
      for (let i = 0; i < this._refused.length; ++i) {
        this._dom.container.appendChild(this._refused[i]);
      }
    }

    this._scrollBar = new ScrollBar({
      target: this._dom.wrapper
    });

    this._dom.wrapper = this._dom.wrapper.firstChild.firstChild; // ScrollBar creates two wrappers
    this._dom.wrapper.appendChild(this._dom.container);
  }


}


export default AdminSuggestionView;