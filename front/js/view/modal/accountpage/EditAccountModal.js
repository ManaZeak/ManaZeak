import Modal from '../utils/Modal.js';


class EditAccountModal extends Modal {


  constructor(options) {
    super('edit-account');
    this._evtIds = [];
    this._data = options.data;
  }


  _fillAttributes() {
    this._rootElement.querySelector('#email-input').value = this._data.email;
    this._rootElement.querySelector('#surname-input').value = this._data.surname;
    this._rootElement.querySelector('#name-input').value = this._data.name;
    this._rootElement.querySelector('#bio-input').value = this._data.bio;
    this._rootElement.querySelector('#birthday-input').value = this._data.birthDate;
    this._rootElement.querySelector('#country-select').querySelectorAll('option').forEach(o => o.selected = o.innerText == this._data.country);
    this._rootElement.querySelector('#locale-select').querySelectorAll('option').forEach(o => o.selected = o.innerText == this._data.locale);
    this._events();
  }


  _events() {
    this._evtIds.push(Evts.addEvent('click', this._rootElement.querySelector('#submit'), this._submit, this));
  }


  _submit() {
    const r = this._rootElement;
    mzk.kom.post('/fragment/account/profile-edit/', {
      email: r.querySelector('#email-input').value,
      surname: r.querySelector('#surname-input').value,
      name: r.querySelector('#name-input').value,
      bio: r.querySelector('#bio-input').value,
      birthDate: r.querySelector('#birthday-input').value,
      countryId: r.querySelector('#country-select').options[r.querySelector('#country-select').selectedIndex].value,
      localeId: r.querySelector('#locale-select').options[r.querySelector('#locale-select').selectedIndex].value,
    }).finally(this.close.bind(this));
  }


}


export default EditAccountModal;
