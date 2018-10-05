import { JSONParsedGetRequest } from '../utils/Utils.js';
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
    this.username = "";
    this.groupName = "";
    this.groupID = -1;
    this.permissions = [];
    this.inviteCode = -1;
    this.godFatherCode = -1;
    this.godFatherName = "";
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

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
	* @param {object} properties - The properties to assign to the session user
	* @param {number} properties.USER_ID - The user id
	* @param {boolean} properties.IS_ADMIN - The user admin status
	* @param {string} properties.GROUP_NAME - The user group
	* @param {number} properties.GROUP_ID - The user group id
	* @param {array} properties.PERMISSIONS - The user permissions
	* @param {number} properties.INVITE_CODE - The user invitation code
	* @param {number} properties.GODFATHER_CODE - The user godfather invitation code
	* @param {string} properties.GODFATHER_NAME - The user godfather name
	**/
  updateProperties(properties) {
    this.id = properties.USER_ID;
    this.isAdmin = properties.IS_ADMIN;
    this.username = properties.USERNAME;
    this.groupName = properties.GROUP_NAME;
    this.groupId = properties.GROUP_ID;
    this.permissions = properties.PERMISSIONS;
    this.inviteCode = properties.INVITE_CODE;
    this.godFatherCode = properties.GODFATHER_CODE;
    this.godFatherName = properties.GODFATHER_NAME;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getID() { return this.id; }
  getIsAdmin() { return this.isAdmin; }
  getUsername() { return this.username; }
  getInviteCode() { if (this.hasPermission("SPON")) { return this.inviteCode; } else { return "--"; }}
  getGodFatherCode() { return this.godFatherCode; }
  getGodFatherName() { return this.godFatherName; }

}

export default User;
