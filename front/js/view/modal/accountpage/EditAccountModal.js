import Modal from '../utils/Modal.js';


class EditAccountModal extends Modal {


  constructor(options) {
    super('edit-account');
    this._data = options.data;
  }


  _fillAttributes() {
    this._rootElement.querySelector('#email-input').value = this._data.email;
    this._rootElement.querySelector('#name-input').value = this._data.name;
    this._rootElement.querySelector('#surname-input').value = this._data.surname;
    this._rootElement.querySelector('#bio-input').value = this._data.bio;
    this._rootElement.querySelector('#birthday-input').value = this._data.birthDate;
    this._rootElement.querySelector('#country-select').querySelectorAll("option").forEach(o => o.selected = o.innerText == this._data.country);
    this._rootElement.querySelector('#locale-select').querySelectorAll("option").forEach(o => o.selected = o.innerText == this._data.locale);
  }


}


export default EditAccountModal;
