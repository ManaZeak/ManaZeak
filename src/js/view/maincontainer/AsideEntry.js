'use strict';

class AsideEntry {
  /**
   * @summary An entry that is meant to be used as an Aside children
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Aside entry
   * @param {object} options - The AsideEntry options object
   **/
  constructor(options) {
    this.title = options.title;
    this.dom = {};

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof AsideEntry
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the AsideEntry DOM and fill it with instance attributes
   **/
  _init() {
    this.dom.title = document.createElement('P');
    this.dom.title.innerHTML = this.title;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getDom() {
    return this.dom.title;
  }
}

export default AsideEntry;
