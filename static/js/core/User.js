import Notification from '../utils/Notification.js';
'use_strict';


class User {
  /**
   * @summary ManaZeak user class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Stores user information and provide a permission tester
   **/
  constructor() {
    this.id = -1;
    this.isAdmin = false;
    this.username = '';
    this.groupName = '';
    this.groupID = -1;
    this.permissions = [];
    this.inviteCode = -1;
    this.godFatherCode = -1;
    this.godFatherName = '';
  }


  //  ----  PUBLIC METHODS  ----  //


  /**
   * @method
   * @name hasPermission
   * @public
   * @memberof User
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Test if the session user has a given permission
   * @param {string} permissionCode - The permission code to test
   * @returns {boolean} - The permission status for the user
   **/
  hasPermission(permissionCode) {
    return this.permissions.includes(permissionCode);
  }


  /**
   * @method
   * @name updateProperties
   * @public
   * @memberof User
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Updates the user inner properties
   * @param {object} options - The options to assign to the session user
   * @param {number} options.USER_ID - The user id
   * @param {boolean} options.IS_ADMIN - The user admin status
   * @param {string} options.GROUP_NAME - The user group
   * @param {number} options.GROUP_ID - The user group id
   * @param {array} options.PERMISSIONS - The user permissions
   * @param {number} options.INVITE_CODE - The user invitation code
   * @param {number} options.GODFATHER_CODE - The user godfather invitation code
   * @param {string} options.GODFATHER_NAME - The user godfather name
   **/
  updateProperties(options) {
    this.id = options.USER_ID;
    this.isAdmin = options.IS_ADMIN;
    this.username = options.USERNAME;
    this.groupName = options.GROUP_NAME;
    this.groupId = options.GROUP_ID;
    this.permissions = options.PERMISSIONS;
    this.inviteCode = options.INVITE_CODE;
    this.godFatherCode = options.GODFATHER_CODE;
    this.godFatherName = options.GODFATHER_NAME;
  }


  //  ----  GETTER METHODS  ----  //


  getID() {
    return this.id;
  }


  getIsAdmin() {
    return this.isAdmin;
  }


  getUsername() {
    return this.username;
  }


  getGodFatherName() {
    return this.godFatherName;
  }


  getGodFatherCode() {
    return this.godFatherCode;
  }


  /**
   * @method
   * @name getInviteCode
   * @public
   * @memberof User
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Returns the user invite code if permission is granted
   * @returns {string} - The user invite code (or <code>Unauthorized</code>)
   **/
  getInviteCode() {
    let inviteCode = 'Unauthorized';

    // User can bypass this in console, but backend will say STFU if trying to invite someone
    if (this.hasPermission('SPON')) {
      inviteCode = this.inviteCode;
    }

    return inviteCode;
  }
}

export default User;
