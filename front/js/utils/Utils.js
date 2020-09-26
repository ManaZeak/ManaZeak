'use strict';


class Utils {


  constructor() {
    // If an instance of Utils already exists, we just return it
    if (!!Utils.instance) {
      return Utils.instance;
    }
    // Set object instance
    Utils.instance = this;

    return this;
  }


  parseHTMLFragment(htmlString) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlString, 'text/html');
    return dom.body.firstChild;
  }


  removeAllObjectKeys(object) {
    Object.keys(object).forEach(key => {
      delete object[key];
    });
  }


}


export default Utils;
