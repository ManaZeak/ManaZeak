/**
 * @class
 * @constructor
 * @public
 **/
class Lang {


  /**
   * @summary Frontend language manager
   * @author Arthur Beaulieu
   * @description
   * <blockquote>
   * This class is meant to be used to translate strings in ManaZeak. It is not responsible to translate
   * HTML templates, so it only fill frontend errors (with notifications)
   * @param {String} lang - A two letter string indicating the langage to pick
   * </blockquote>
   **/
  constructor(lang) {
    /** The class current lang used
     * @private
     * @member {String}
     **/
    this._lang = lang || 'en';
    /** The lang key/value pairs
     * @private
     * @member {Object}
     **/
    this._nls = {};
    // Must first fetch keys before being ready to use
    this._fetchKeys(this._lang);
  }


  /**
   * @method
   * @async
   * @name _fetchKeys
   * @private
   * @memberof Lang
   * @description
   * <blockquote>
   * This method will perform an async call to get the langage JSON file, and will
   * then update the global frontend Logger
   * </blockquote>
   * @param {String} lang - A two letter string indicating the langage to fetch
   **/
  _fetchKeys(lang) {
    mzk.kom.get(`static/nls/${lang}.json`).then(keys => {
      this._nls = keys;
      Logger.errors = keys;
    }).catch(this._fetchKeys.bind(this, 'en'));
  }


  /**
   * @method
   * @name get
   * @public
   * @memberof Lang
   * @description
   * <blockquote>
   * Use this getter to access the langage errors with the proper lang set.
   * </blockquote>
   * @param {String} key - The key to an error in the langage JSON file
   * @return {Object} The logging object with proper lang
   **/
  get(key) {
    if (this._nls[key]) {
      return this._nls[key];
    }

    return {};
  }


}


export default Lang;
