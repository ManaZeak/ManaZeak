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
        //console.log(properties);
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
