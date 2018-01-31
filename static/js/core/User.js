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

    constructor() {
        this.id            = -1;
        this.isAdmin       = false;
        this.username      = "";
        this.groupName     = "";
        this.groupID       = -1;
        this.inviteCode    = -1;
        this.godFatherCode = -1;
        this.godFatherName = "";
        this._getUserInfo();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getIsAdmin (public)
     * class  : User
     * desc   : Get info from server and stores it locally
     * arg    : {function} callback
     **/
    updateIsAdmin(callback) { // TODO remove when new system OK
        let that = this;
        JSONParsedGetRequest(
            "admin/isAdmin/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     IS_ADMIN  : bool
                 * } */
                if (response.DONE && response.IS_ADMIN) {
                    that.isAdmin = true;
                    callback(true);
                }

                else {
                    that.isAdmin = false;
                    callback(false);
                }
            }
        );
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : getIsAdmin (public)
     * class  : User
     * desc   : Get info from server and stores it locally
     * arg    : {function} callback
     **/
    _getUserInfo() {
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
                    that.id            = response.USER_ID;
                    that.isAdmin       = response.IS_ADMIN;
                    that.username      = response.USERNAME;
                    that.groupName     = response.GROUP_NAME;
                    that.groupID       = response.GROUP_ID;
                    that.inviteCode    = response.INVITE_CODE;
                    that.godFatherCode = response.GODFATHER_CODE;
                    that.godFatherName = response.GODFATHER_NAME;
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsAdmin() { return this.isAdmin; }
    getInviteCode() { return this.inviteCode; }

}

export default User