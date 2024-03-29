import MainPageView from './mainpage/MainPageView.js';
/* Single views */
import ReleaseArtistView from './mainpage/ReleaseArtistView.js';
import AlbumView from './mainpage/AlbumView.js';
import GenreView from './mainpage/GenreView.js';
import LabelView from './mainpage/LabelView.js';
/* Special views */
import GenreGraphView from './mainpage/GenreGraphView.js';
/* All item view */
import AllReleaseArtistView from './mainpage/AllReleaseArtistView.js';
import AllGenreView from './mainpage/AllGenreView.js';
import AllLabelView from './mainpage/AllLabelView.js';
/* Nav views */
import MenuPageView from './menupage/MenuPageView.js';
import AdminPageView from './menupage/AdminPageView.js';
import AccountPageView from './menupage/AccountPageView.js';


const Classes = {
  MainPageView,
  ReleaseArtistView,
  AlbumView,
  GenreView,
  LabelView,
  GenreGraphView,
  AllReleaseArtistView,
  AllGenreView,
  AllLabelView,
  MenuPageView,
  AdminPageView,
  AccountPageView
};


class ViewFactory {


  /** @summary <h1>View factory for all usages in single page app</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>This class is a factory pattern that will build any view used in ManaZeak. Sending the
   * view name along its options will make this class returns it. The view name must be included in the CLasses definition
   * in this file, without the <code>View</code> suffix.</blockquote>
   * @param {string} name - The view name, must be listed in Classes defined in this file, without the View suffix
   * @param {object} [options={}] - The view option object, see child class for usage
   * @return {object} - The requested view as an object */
  constructor(name, options = {}) {
    return new Classes[`${name}View`](options);
  }


}


export default ViewFactory;
