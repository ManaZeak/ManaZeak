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


  appendLinkInHead(path) {
    /* Search for existing link with same path */
    let alreadyExists = false;
    for (let i =0; i < document.head.children.length; ++i) {
      const meta = document.head.children[i];
      if (meta.nodeName === 'LINK' && meta.href === `${window.location}${path}`) {
        alreadyExists = true;
        break;
      }
    }
    /* Only append style if not already existing in document header */
    if (!alreadyExists) {
      const link = document.createElement('LINK');
      link.rel = 'stylesheet';
      link.href = path;
      document.head.appendChild(link);
    }
  }


}


export default Utils;
