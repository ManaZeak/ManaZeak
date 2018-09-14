import { JSONParsedGetRequest } from '../utils/Utils.js'
import Notification from '../utils/Notification.js'

class User {
    constructor() {
        this.id            = -1;
        this.isAdmin       = false;
        this.username      = "";
        this.groupName     = "";
        this.groupID       = -1;
        this.permissions  = [];
        this.inviteCode    = -1;
        this.godFatherCode = -1;
        this.godFatherName = "";
    }

    hasPermission(permissionCode) {
        return this.permissions.includes(permissionCode);
    }

    updateProperties(properties) {
      this.id            = properties.USER_ID;
      this.isAdmin       = properties.IS_ADMIN;
      this.username      = properties.USERNAME;
      this.groupName     = properties.GROUP_NAME;
      this.groupID       = properties.GROUP_ID;
      this.permissions  = properties.PERMISSIONS;
      this.inviteCode    = properties.INVITE_CODE;
      this.godFatherCode = properties.GODFATHER_CODE;
      this.godFatherName = properties.GODFATHER_NAME;
    }


//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getID() { return this.id; }
    getIsAdmin() { return this.isAdmin; }
    getUsername()    { return this.username; }
    getInviteCode() { if (this.hasPermission("SPON")) { return this.inviteCode; } else { return "--"; }}
    getGodFatherCode() { return this.godFatherCode; }
    getGodFatherName() { return this.godFatherName; }

}

export default User;
