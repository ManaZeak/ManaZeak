/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  User class                                     *
 *                                                 *
 *  Handle user attributes and settings            *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedGetRequest } from '../utils/Utils.js'
import Notification from '../utils/Notification.js'

class User {

    constructor(callback) {
        this.LOG = false; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('  User construction');
        }

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

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : hasPermission (public)
     * class  : User
     * desc   : TODO
     * arg    : {string} permissionCode
     **/
    hasPermission(permissionCode) {
        if (window.debug && this.LOG) {
            console.log('  User : hasPermission call for ' + permissionCode);
        }

        return this.permissions.includes(permissionCode);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : getIsAdmin (public)
     * class  : User
     * desc   : Get info from server and stores it locally
     * arg    : {function} callback
     **/
    getUserInfo(callback) {
        if (window.debug && this.LOG) {
            console.log('  User : getUserInfo call');
        }

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
                    that.groupName     = response.GROUP_NAME;
                    that.groupID       = response.GROUP_ID;
                    that.permissions  = response.PERMISSIONS;
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

export default User
