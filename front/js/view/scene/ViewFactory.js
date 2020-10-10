import MainPageView from './mainpage/MainPageView.js';
import UserPageView from './community/UserPageView.js';


const Classes = {
  MainPageView,
  UserPageView
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
