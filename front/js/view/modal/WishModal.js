import Modal from './Modal.js';


class WishModal extends Modal {


  constructor(options) {
    super(options);

    this._submit = null;
  }


  _fillAttributes() {
    this._submit = document.getElementById('submit-wish-button');
    console.log(this._submit)
    this._events();
  }


  _events() {
    this._submit.addEventListener('click', (event) => {
      event.preventDefault();
      mzk.kom.post('/fragment/wish', {
        content: document.getElementById('wish-content').value
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
    });
  }


}


export default WishModal;