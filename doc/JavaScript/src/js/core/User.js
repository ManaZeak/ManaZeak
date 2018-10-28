'use_strict';


class User {


  /** @summary <h1>ManaZeak's user class</h1>
   * @author Arthur Beaulieu
   * @since June 2018
   * @description <blockquote>This class stores everything useful about the user.<br>
   * It stores its own attributes and provide a method to test the user's permissions (frontend only, the backend does its own test for this).<br>
   * All user members must be accessed through getters and setters.<br>
   * This object is a <a href="Mzk.html" target="_blank">Mzk</a>'s attribute, that can be used from anywhere (<code>mzk.user</code>).</blockquote> */
  constructor() {
    /** @private
     * @member {String} - The user's god father's invite code */
    this._godfatherCode = '';
    /** @private
     * @member {String} - The user's god father's name */
    this._godfatherName = '';
    /** @private
     * @member {Number} - The user's current group id */
    this._groupId = -1;
    /** @private
     * @member {String} - The user's current group name */
    this._groupName = '';
    /** @private
     * @member {Number} - The user's id */
    this._id = -1;
    /** @private
     * @member {String} - The user's invite code hash */
    this._inviteCode = '';
    /** @private
     * @member {Boolean} - The user's admin status */
    this._isAdmin = false;
    /** @private
     * @member {Array} - The user's permissions (4-grams items, see <code>app/utils.py:populateDB()</code>) */
    this._permissions = [];
    /** @private
     * @member {String} - The user's username */
    this._username = '';
  }


  //  ----  PUBLIC METHODS  ----  //


  /** @method
   * @name hasPermission
   * @memberof User
   * @description <blockquote>Test if the user has a given permission, using the 4-grams defined in <code>app/utils.py:populateDB()</code>.</blockquote>
   * @param {String} permissionCode - The permission code to test, it must be a four caps letters
   * @returns {Boolean} True if user is granted, false otherwise */
  hasPermission(permissionCode) {
    return this._permissions.includes(permissionCode);
  }


  /** @method
   * @name setMembers
   * @memberof User
   * @description <blockquote>Set members according to the given <code>GET</code> response from url <code>user/getInformation/</code>.</blockquote>
   * @param {Object} options - The server response object
   * @param {Number} options.GODFATHER_CODE - The user's godfather invitation code
   * @param {String} options.GODFATHER_NAME - The user's godfather name
   * @param {Number} options.GROUP_ID - The user's group id
   * @param {String} options.GROUP_NAME - The user's group
   * @param {Number} options.USER_ID - The user's id
   * @param {Number} options.INVITE_CODE - The user's invitation code
   * @param {Boolean} options.IS_ADMIN - The user's admin status
   * @param {Array} options.PERMISSIONS - The user's permissions
   * @param {String} options.USERNAME - The user's username */
  setMembers(options) {
    this._avatarPath = options.AVATAR_PATH;
    this._godfatherCode = options.GODFATHER_CODE;
    this._godfatherName = options.GODFATHER_NAME;
    this._groupId = options.GROUP_ID;
    this._groupName = options.GROUP_NAME;
    this._id = options.USER_ID;
    this._inviteCode = options.INVITE_CODE;
    this._isAdmin = options.IS_ADMIN;
    this._permissions = options.PERMISSIONS;
    this._username = options.USERNAME;
  }


  //  ----  GETTER  ----  //


  /** <strong>getter:godfatherName</strong>
   * @type {String} */
  get godfatherName() {
    return this._godfatherName;
  }


  /** <strong>getter:id</strong>
   * @type {Number} */
  get id() {
    return this._id;
  }


  /** <strong>getter:username</strong>
   * @type {String} */
  get username() {
    return this._username;
  }

  get avatarPath() {
    return this._avatarPath;
  }
}

export default User;
