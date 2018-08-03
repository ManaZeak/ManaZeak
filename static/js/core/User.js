import { JSONParsedGetRequest } from '../utils/Utils.js'
import Notification from '../utils/Notification.js'

class User {
    constructor(callback) {
        this.id            = -1;
        this.isAdmin       = false;
        this.username      = "";
        this.groupName     = "";
        this.groupID       = -1;
        this.permissions  = [];
        this.inviteCode    = -1;
        this.godFatherCode = -1;
        this.godFatherName = "";
        this.getUserInfo(callback);
    }

    hasPermission(permissionCode) {
        return this.permissions.includes(permissionCode);
    }

    updateInfo(callback) {
        let that = this;
        JSONParsedGetRequest(
            "user/getInformation/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     USERNAME:
                 *     DATE_JOINED:
                 *     LAST_LOGIN:
                 *     INVITE_CODE:
                 *     IS_ADMIN:
                 *     MANACOIN:
                 *     GODFATHER_CODE:
                 *     GODFATHER_NAME:
                 * } */
                if (response.DONE) {
                    if (window.debug && that.LOG) {
                        console.log('  User : getUserInfo server response');
                    }

                    that.id            = response.USER_ID;
                    that.isAdmin       = response.IS_ADMIN;
                    that.username      = response.USERNAME;
                    that.avatarPath    = response.AVATAR_PATH;
                    that.groupName     = response.GROUP_NAME;
                    that.groupID       = response.GROUP_ID;
                    that.permissions   = response.PERMISSIONS;
                    that.inviteCode    = response.INVITE_CODE;
                    that.godFatherCode = response.GODFATHER_CODE;
                    that.godFatherName = response.GODFATHER_NAME;

                    if (callback) {
                        callback();
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
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
