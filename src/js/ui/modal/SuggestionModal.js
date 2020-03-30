import Modal from '../component/overlay/Modal.js';
'use strict';


class SuggestionModal extends Modal {


  constructor(options) {
    super(options);
  }


  setActions(doc) {
    const closeTop = doc.getElementById('suggestion-header-close');
    const close = doc.getElementById('suggestion-close');
    const suggestion = doc.getElementById('suggestion-field');
    const submit = doc.getElementById('suggestion-submit');

    closeTop.addEventListener('click', this.close.bind(this), false);
    close.addEventListener('click', this.close.bind(this), false);
    submit.addEventListener('click', this._submitSuggestion.bind(this, suggestion), false);
  }


  _submitSuggestion(suggestion) {
    const options = {
      SUGGESTION: suggestion.value
    };

    mzk.komunikator.post('suggestion/create/', options)
      .finally(this.close.bind(this));
  }


}

export default SuggestionModal;
