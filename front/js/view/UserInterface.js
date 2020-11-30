import Aside from './component/Aside';
import Scene from './component/Scene';
import WishModal from './modal/menupage/WishModal.js';
'use strict';


class UserInterface {


  /** @summary <h1>ManaZeak user interface controller</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>This class is made to handle all interactions between UI and Mzk controller. It is in
   * charge to load views and to append them into the DOM, but also to make them interactive with the app context.</blockquote> */
  constructor() {
    /** @private
     * @member {object} - The aside controller */
    this._aside = new Aside();
    /** @private
     * @member {object} - The scene controller */
    this._scene = new Scene();
    /** @private
     * @member {object} - The DOM loading overlay to use in transitions */
    this._loadingOverlay = null;
    // Build loading overlay and add its style class
    this._loadingOverlay = document.createElement('DIV');
    this._loadingOverlay.className = 'mzk-loading-overlay';
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  VIEW MANIPULATION  ----------------------------------------------  */
  /*                                                                                                                  */
  /*  These methods will set the single page with a new view, while properly cleaning the previously used one.        */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name setSceneView
   * @public
   * @memberof UserInterface
   * @description <blockquote>This method will try to build a view according to the given options. If options are
   * invalid, the Main Page will be loaded instead. It handle the transition with previous view to put a loading
   * overlay while loading the new view.</blockquote>
   * @param {object} options - The options to build the view from
   * @param {object} options.name - The view name, must match one in the ViewFactory class
   * @return {promise} - The action promise */
  setSceneView(options) {
    return new Promise((resolve, reject) => {
      this.startLoading()
        .then(this._scene.buildView.bind(this._scene, options))
        .then(resolve)
        .catch(reject)
        .finally(this.stopLoading.bind(this)); // Clear loading overlay whatever happens
    });
  }


  setModal(options) {
    return new Promise((resolve, reject) => {
      this._scene.buildModal(options)
        .then(resolve)
        .catch(reject);
    });
  }


  getFragment(url) {
    return new Promise((resolve, reject) => {
      this.startLoading()
        .then(mzk.kom.getText.bind(mzk.kom, url))
        .then(resolve)
        .catch(reject)
        .finally(this.stopLoading.bind(this)); // Clear loading overlay whatever happens
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ----------------------------------------  LOADING OVERLAY METHODS  -------------------------------------------  */
  /*                                                                                                                  */
  /*  These methods add/remove the loading overlay on top of elements. It is meant to be used when switching view.    */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name startLoading
   * @public
   * @memberof UserInterface
   * @description <blockquote>The start loading method will add an overlay on the whole page that has a css animation.</blockquote>
   * @return {promise} - The action promise */
  startLoading() {
    return new Promise(resolve => {
      document.body.appendChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }


  /** @method
   * @name startLoading
   * @public
   * @memberof UserInterface
   * @description <blockquote>The stop loading method will remove the overlay on the page.</blockquote>
   * @return {promise} - The action promise */
  stopLoading() {
    return new Promise(resolve => {
      document.body.removeChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }


}


export default UserInterface;
