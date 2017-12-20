/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  User class                                     *
 *                                                 *
 *  Handle user attributes and settings            *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class User {
    constructor() {

        this.isAdmin = false;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getIsAdmin (public)
     * class  : User
     * desc   : Get info from server and stores it locally
     * arg    : {function} callback
     **/
    getIsAdmin(callback) {
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



//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

}
