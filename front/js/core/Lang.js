'use strict';

import Logger from "../utils/Logger";
import Mzk from "./Mzk";


class Lang {


  constructor(lang) {
    this._lang = lang;
    this._nls = {};
    this._fetchKeys(this._lang);
  }


  _fetchKeys(lang) {
    mzk.kom.get(`static/nls/${lang}.json`).then(keys => {
      this._nls = keys;
      window.Logger.errors = keys;
    }).catch(this._fetchKeys.bind(this, 'en'));
  }


  get(key) {
    if (this._nls[key]) {
      return this._nls[key];
    }

    return '';
  }


}


export default Lang;
