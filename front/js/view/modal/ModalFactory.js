import AboutModal from './menupage/AboutModal.js';
import WishModal from './menupage/WishModal.js';
import BadgeModal from './adminpage/BadgeModal.js';
import ResetPasswordModal from './accountpage/ResetPasswordModal.js';


const Classes = {
  AboutModal,
  WishModal,
  BadgeModal,
  ResetPasswordModal
};


class ModalFactory {


  constructor(name, options = {}) {
    return new Classes[`${name}Modal`](options);
  }


}


export default ModalFactory;
