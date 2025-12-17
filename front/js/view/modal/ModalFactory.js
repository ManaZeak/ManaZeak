import EditAccountModal from './accountpage/EditAccountModal.js';
import ResetPasswordModal from './accountpage/ResetPasswordModal.js';

import BadgeModal from './adminpage/BadgeModal.js';

import AlbumCoverModal from './mainpage/AlbumCoverModal.js';
import ArtistPictureModal from './mainpage/ArtistPictureModal.js';
import NewPlaylistModal from './mainpage/NewPlaylistModal.js';
import TrackDetailModal from './mainpage/TrackDetailModal.js';

import AboutModal from './menupage/AboutModal.js';
import WishModal from './menupage/WishModal.js';

import YesNoModal from './utils/YesNoModal.js';

const Classes = {
  ResetPasswordModal,
  EditAccountModal,
  BadgeModal,
  AlbumCoverModal,
  ArtistPictureModal,
  NewPlaylistModal,
  TrackDetailModal,
  AboutModal,
  WishModal,
  YesNoModal
};


class ModalFactory {


  constructor(name, options = {}) {
    return new Classes[`${name}Modal`](options);
  }


}


export default ModalFactory;
