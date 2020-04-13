import AdminSceneView from "../AdminSceneView";
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
            const suggestion = this._createSuggestion(response.SUGGESTIONS[i]);
            // Fill internal arrays of different suggestions states
            this[`_${state}`].push(suggestion);
          }

          this._fillSections();
          resolve();
        })
        .catch(reject)
    });
  }


  _createSuggestion(suggestion) {
    let state = suggestion.STATUS.LABEL.toLowerCase();
    const suggestionContainer = document.createElement('DIV');
    suggestionContainer.classList.add('admin-suggestion-item');
    suggestionContainer.classList.add(state);

    const dateAuthor = document.createElement('P');
    const value = document.createElement('P');
    const type = document.createElement('P');
    const buttonContainer = document.createElement('P');
    const accept = document.createElement('IMG');
    const refuse = document.createElement('IMG');

    const date = new Date(suggestion.CREATION_DATE);
    const month = new Intl.DateTimeFormat(navigator.language, { month: 'long'}).format(date);
    dateAuthor.innerHTML = `${date.getDay()} ${month} ${date.getFullYear()} – ${mzk.lang.adminView.suggestion.madeBy} <span>${suggestion.USER.NAME}</span>`;
    dateAuthor.classList.add('admin-suggestion-date-author');
    value.innerHTML = suggestion.TEXT;
    value.classList.add('admin-suggestion-value');
    type.innerHTML = suggestion.TYPE.LABEL;
    type.classList.add('admin-suggestion-type');
    buttonContainer.classList.add('admin-suggestion-buttons');
    accept.src = 'static/img/social/like.svg';
    refuse.src = 'static/img/social/dislike.svg';

    accept.addEventListener('click', () => {
      const options = {
        SUGGESTION_ID: suggestion.ID,
        STATUS: true
      };
      mzk.komunikator.post('suggestion/changeStatus/', options)
        .then(() => {
          suggestionContainer.classList.remove(state);
          suggestionContainer.classList.add('accepted');
          state = 'accepted';
        })
        .catch(errorCode => {
          Logger.raise({
            code: errorCode,
            frontend: true
          });
        });
    }, false);

    refuse.addEventListener('click', () => {
      const options = {
        SUGGESTION_ID: suggestion.ID,
        STATUS: false
      };
      mzk.komunikator.post('suggestion/changeStatus/', options)
        .then(() => {
          suggestionContainer.classList.remove(state);
          suggestionContainer.classList.add('refused');
          state = 'refused';
        })
        .catch(errorCode => {
          Logger.raise({
            code: errorCode,
            frontend: true
          });
        });
    }, false);

    buttonContainer.appendChild(accept);
    buttonContainer.appendChild(refuse);
    suggestionContainer.appendChild(dateAuthor);
    suggestionContainer.appendChild(value);
    suggestionContainer.appendChild(buttonContainer);
    suggestionContainer.appendChild(type);
    return suggestionContainer;
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