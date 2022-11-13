import ArtistPictureModal from './mainpage/ArtistPictureModal.js';
import AlbumCoverModal from './mainpage/AlbumCoverModal.js';
import AboutModal from './menupage/AboutModal.js';
import WishModal from './menupage/WishModal.js';
import BadgeModal from './adminpage/BadgeModal.js';
import ResetPasswordModal from './accountpage/ResetPasswordModal.js';
import EditAccountModal from './accountpage/EditAccountModal.js';


const Classes = {
  ArtistPictureModal,
  AlbumCoverModal,
  AboutModal,
  WishModal,
  BadgeModal,
  ResetPasswordModal,
  EditAccountModal
};


class ModalFactory {


  constructor(name, options = {}) {
    return new Classes[`${name}Modal`](options);
  }


}


export default ModalFactory;
