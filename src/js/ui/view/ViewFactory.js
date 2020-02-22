/* Single object views */
import SingleReleaseArtistView from '../view/object/single/type/SingleReleaseArtistView.js';
import SingleArtistView from '../view/object/single/type/SingleArtistView.js';
import SingleAlbumView from '../view/object/single/type/SingleAlbumView.js';
import SingleProducerView from '../view/object/single/type/SingleProducerView.js';
import SingleLabelView from '../view/object/single/type/SingleLabelView.js';
import SingleGenreView from '../view/object/single/type/SingleGenreView.js';
import SingleCountryView from '../view/object/single/type/SingleCountryView.js';
/* All objects views */
import AllReleaseArtistsView from '../view/object/all/type/AllReleaseArtistsView.js';
import AllArtistsView from '../view/object/all/type/AllArtistsView.js';
import AllAlbumsView from '../view/object/all/type/AllAlbumsView.js';
import AllProducersView from '../view/object/all/type/AllProducersView.js';
import AllLabelsView from '../view/object/all/type/AllLabelsView.js';
import AllGenresView from '../view/object/all/type/AllGenresView.js';
/* Generic views */
import MainPageView from '../view/mainpage/MainPageView.js';
import PartyView from '../view/party/PartyView.js';
import AdminView from '../view/admin/AdminView.js';
import CommunityView from '../view/community/CommunityView.js';


const Classes = {
  SingleReleaseArtistView,
  SingleArtistView,
  SingleAlbumView,
  SingleProducerView,
  SingleLabelView,
  SingleGenreView,
  SingleCountryView,
  AllReleaseArtistsView,
  AllArtistsView,
  AllAlbumsView,
  AllProducersView,
  AllLabelsView,
  AllGenresView,
  MainPageView,
  PartyView,
  AdminView,
  CommunityView
};


class ViewFactory {


  constructor(type, options = {}) {
    if (typeof options.playlist === 'object' && options.playlist.id !== -1) {
      this.asideLock = true; // Render to costly to allow aside locking
    } else if (`${type}View` in Classes) {
      this.asideLock = false; // Aside unlocked by default
      return new Classes[`${type}View`](options);
    }
  }

}


export default ViewFactory;