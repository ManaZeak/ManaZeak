import AboutModal from './menupage/AboutModal.js';
import WishModal from './menupage/WishModal.js';


const Classes = {
  AboutModal,
  WishModal
};


class ModalFactory {


  constructor(name, options = {}) {
    return new Classes[`${name}Modal`](options);
  }


}


export default ModalFactory;
