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
          for (let i = 0; i < response.SUGGESTIONS.length; ++i) {
            const suggestion = this._createSuggestion(response.SUGGESTIONS[i]);
            this._dom.wrapper.appendChild(suggestion);
          }
          resolve();
        })
        .catch(reject)
    });
  }


  _createSuggestion(suggestion) {
    const suggestionContainer = document.createElement('DIV');
    return suggestionContainer;
  }

}


export default AdminSuggestionView;