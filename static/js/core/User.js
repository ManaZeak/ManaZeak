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
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : updateMetadata (public)
     * class  : Track
     * desc   : Update metadata contained in Track (UI) object
     * arg    : {object} track - Raw JSON track
     **/

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _getArtistsIDFromArtistsArray (private)
     * class  : Track
     * desc   : Extract artists IDs from JSON
     * arg    : {[object]} artists - Raw JSON array of objects
     * return : {[int]} - The artists ID array
     **/
    _init() {
        this._getIsAdmin();
    }


    _getIsAdmin() {
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
                if (response.DONE) {
                    that.isAdmin = !!response.IS_ADMIN;
                }

                else {
                    that.isAdmin = false;
                }
            }
        );
    }

}
