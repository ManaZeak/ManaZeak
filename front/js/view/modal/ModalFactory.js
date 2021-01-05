import AboutModal from './menupage/AboutModal.js';
import WishModal from './menupage/WishModal.js';
import BadgeModal from './adminpage/BadgeModal.js';


const Classes = {
  AboutModal,
  WishModal,
  BadgeModal
};


class ModalFactory {


  constructor(name, options = {}) {
    return new Classes[`${name}Modal`](options);
  }


}


export default ModalFactory;
