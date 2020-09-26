'use strict';


class Utils {


  constructor() {

  }


  parseHTMLFragment(htmlString) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlString, 'text/html');
    return dom.body.firstChild;
  }


  removeAllObjectKeys(object) {
    Object.keys(object).forEach(key => { delete object[key]; });
  }


}


export default Utils;
