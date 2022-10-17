'use strict';


class SceneView {


  /** @summary <h1>View base class with mandatory methods</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>Scene view base class that must be inherited to match the loading pattern. All views
   * are based on an HTML template, that will be loaded the parsed to be included in the DOM scene. When the view
   * building is done, a <code>SceneViewReady</code> event is fired through the custom event proxy.</blockquote> */
  constructor(options) {
    /** @public
     * @member {object} - The view wrapper div */
    this.wrapper = null;
    this._type = options.type;
    this._url = options.url;
    this._css = options.css;

    Utils.appendLinkInHead(this._css);
  }


  /** @method
   * @name destroy
   * @public
   * @memberof SceneView
   * @description <blockquote>The destroy method will clear the wrapper. A destroy method must be created in child
   * class to properly clean itself. It should also call for <code>super</code> to call this method.</blockquote> */
  destroy() {
    this.wrapper = null;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  BUILDING VIEW PATTERN  --------------------------------------------  */
  /*                                                                                                                  */
  /*  These two methods must be called to properly fetch view wrapper and notify app that the view is ready to use.   */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fetchWrapper
   * @private
   * @memberof UserInterface
   * @description <blockquote>This method will request the HTML template for the given url. It will then parse it
   * and update the view wrapper to match this newly loaded template.</blockquote>
   * @param {string} url - The template url to load html from
   * @return {promise} - The action promise */
  _fetchWrapper(url) {
    return new Promise((resolve, reject) => {
      mzk.kom.getText(url)
        .then(response => {
          try {
            // If we can parse as a JSON, the server returned an error
            const output = JSON.parse(response);
            reject(output.errors);
          } catch {
            // Otherwise, the server returned a HTML template as a string
            this.dom = Utils.parseHTMLFragment(response);
            resolve();
          }
        })
        .catch(reject);
    });
  }


  /** @method
   * @name _viewReady
   * @private
   * @memberof UserInterface
   * @description <blockquote>This method needs to be called last, when all the view initialisation is done. This
   * way, it will notify the UserInterface controller that te view creation is done, and that it should release the
   * UI removing the loading overlay.</blockquote> */
  _viewReady() {
    return new Promise(resolve => {
      Evts.publish('SceneViewReady');
      resolve();
    });
  }


  _viewFailed(errors) {
    // No need to return a promise, as it should be called last in failing process
    Evts.publish('SceneViewFailed', errors);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  GETTER / SETTER  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @public
   * @member {object} - The view first DOM child in template */
  get dom() {
    return this.wrapper;
  }


  /** @public
   * @member {object} - The view first DOM child in template */
  set dom(dom) {
    this.wrapper = dom;
  }


}


export default SceneView;
