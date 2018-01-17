/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  User class                                     *
 *                                                 *
 *  Handle user attributes and settings            *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class User {

    constructor() {

        this.isAdmin       = false;
        this.inviteCode    = 0;
        this.godFatherCode = 0;
        this._getUserInfo();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getIsAdmin (public)
     * class  : User
     * desc   : Get info from server and stores it locally
     * arg    : {function} callback
     **/
    updateIsAdmin(callback) {
        let that = this;
        JSONParsedGetRequest(
            "ajax/isAdmin/",
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
            "ajax/getUserSettings/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     IS_ADMIN  : bool
                 * } */
                if (response.DONE) {
                    that.godFatherCode  = response.GODFATHER_CODE;
                    that.inviteCode     = response.INVITE_CODE;
                }

                else {

                }
            }
        );
    }


//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsAdmin() { return this.isAdmin; }
    getInviteCode() { return this.inviteCode; }

}
