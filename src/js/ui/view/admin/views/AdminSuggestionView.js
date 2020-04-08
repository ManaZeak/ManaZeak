import AdminSceneView from "../AdminSceneView";


class AdminSuggestionView extends AdminSceneView {


  constructor(options) {
    super(options);

    this._init()
      .then(this._initSuggestionView.bind(this));
  }


  _initSuggestionView() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.get('suggestion/getAll/')
        .then(response => {
          this._dom.container = document.createElement('DIV');
          for (let i = 0; i < response.SUGGESTIONS.length; ++i) {
            const suggestion = this._createSuggestion(response.SUGGESTIONS[i]);
            this._dom.container.appendChild(suggestion);
          }
          this._dom.wrapper.appendChild(this._dom.container);
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


  _resetView() {
    // TODO properly cean evts etc
    this._dom.container.innerHTML = '';
    this._initSuggestionView();
  }


}


export default AdminSuggestionView;