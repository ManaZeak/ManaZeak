'use strict';


class SceneView {


  /** @summary <h1>View base class with mandatory methods</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>Scene view base class that must be inherited to match the loading pattern. All views
   * are based on an HTML template, that will be loaded the parsed to be included in the DOM scene. When the view
   * building is done, a <code>SceneViewReady</code> event is fired through the custom event proxy.</blockquote> */
  constructor() {
    this.wrapper = null;
  }


  destroy() {
    this.wrapper = null;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  BUILDING VIEW PATTERN  --------------------------------------------  */
  /*                                                                                                                  */
  /*  These two methods must be called to properly fetch view wrapper and notify app that the view is ready to use.   */
  /*  --------------------------------------------------------------------------------------------------------------- */


  _fetchWrapper(url) {
    return new Promise((resolve, reject) => {
      mzk.kom.getText(url)
        .then(response => {
          this.dom = Utils.parseHTMLFragment(response);
          resolve();
        })
        .catch(reject);
    });
  }


  _viewReady() {
    Events.publish('SceneViewReady');
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  GETTER / SETTER  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  get dom() {
    return this.wrapper;
  }


  set dom(dom) {
    this.wrapper = dom;
  }


}


export default SceneView;
