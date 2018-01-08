/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  AdminView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class AdminView extends View {
    constructor() {

        super();
        this._createUI();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : AdminView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container: this.container,
            menu:      document.createElement("DIV"),

            menuList:  document.createElement("UL"),
            menuDB:    document.createElement("LI"),
            menuUser:    document.createElement("LI"),
            menuLib:    document.createElement("LI"),

            content:   document.createElement("DIV"),
            syncthing: document.createElement("IFRAME")
        };



        this.ui.container.id = "admin";
        this.ui.menu.id      = "leftMenu";
        this.ui.menuDB.innerHTML = "Database";
        this.ui.menuUser.innerHTML = "Users";
        this.ui.menuLib.innerHTML = "Libraries";

        this.ui.menuList.appendChild(this.ui.menuDB);
        this.ui.menuList.appendChild(this.ui.menuUser);
        this.ui.menuList.appendChild(this.ui.menuLib);

        this.ui.content.id   = "content";
 //       this.ui.syncthing.id = "content";

        //this.ui.syncthing.src = "http://manazeak.org/app";
        //this.ui.syncthing.frameBorder = 0;

        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        let that = this;
        JSONParsedGetRequest(
            "ajax/getAdminView/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (response.DONE) {
                    that.ui.dropLabel            = document.createElement("P");
                    that.ui.dropButton           = document.createElement("BUTTON");

                    that.ui.apiKeyLabel            = document.createElement("P");
                    that.ui.apiKeyField           = document.createElement("INPUT");
                    that.ui.apiKeyButton           = document.createElement("BUTTON");

                    that.ui.rescanLabel            = document.createElement("P");
                    that.ui.rescanButton           = document.createElement("BUTTON");

                    that.ui.rmMoodLabel            = document.createElement("P");
                    that.ui.rmMoodButton           = document.createElement("BUTTON");

                    that.ui.dropLabel.innerHTML  = "Drop the database";
                    that.ui.dropButton.innerHTML = "DROP";

                    that.ui.apiKeyLabel.innerHTML  = "SyncThing API key";
                    that.ui.apiKeyField.type = "text";
                    that.ui.apiKeyField.value = response.SYNC_KEY;
                    that.ui.apiKeyButton.innerHTML = "SUBMIT";

                    that.ui.rescanLabel.innerHTML  = "Rescan SyncThing folders";
                    that.ui.rescanButton.innerHTML = "RESCAN";

                    that.ui.rmMoodLabel.innerHTML  = "Remove all moodbar from server"; // TODO : warn user that moodbar will auto gen later
                    that.ui.rmMoodButton.innerHTML = "REMOVE ALL";

                    that.ui.content.appendChild(that.ui.dropLabel);
                    that.ui.content.appendChild(that.ui.dropButton);
                    that.ui.content.appendChild(that.ui.apiKeyLabel);
                    that.ui.content.appendChild(that.ui.apiKeyField);
                    that.ui.content.appendChild(that.ui.apiKeyButton);
                    that.ui.content.appendChild(that.ui.rescanLabel);
                    that.ui.content.appendChild(that.ui.rescanButton);
                    that.ui.content.appendChild(that.ui.rmMoodLabel);
                    that.ui.content.appendChild(that.ui.rmMoodButton);

                    that.ui.dropButton.addEventListener("click", that._requestDrop.bind(that));
                    that.ui.apiKeyButton.addEventListener("click", that._submitAPIKey.bind(that));
                    that.ui.rescanButton.addEventListener("click", that._rescanSC.bind(that));
                    that.ui.rmMoodButton.addEventListener("click", that._removeMoodbar.bind(that));
                }
            }
        );
    }


    /**
     * method : _requestDrop (private)
     * class  : AdminView
     * desc   : Send a drop db request to the server
     **/
    _requestDrop() {
        JSONParsedGetRequest(
            "ajax/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _rescanSC (private)
     * class  : AdminView
     * desc   : Send a rescan syncthing folders
     **/
    _rescanSC() {
        JSONParsedGetRequest(
            "ajax/syncthingRescan",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    // TODO : refresh UI
                }
            }
        );
    }



    /**
     * method : _rescanSC (private)
     * class  : AdminView
     * desc   : Send a rescan syncthing folders
     **/
    _removeMoodbar() {
        JSONParsedGetRequest(
            "ajax/removeAllMoods/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _rescanSC (private)
     * class  : AdminView
     * desc   : Send a rescan syncthing folders
     **/
    _submitAPIKey() {
        JSONParsedPostRequest(
            "ajax/changeSyncthingAPIKey/",
            JSON.stringify({
               SYNC_KEY: this.ui.apiKeyField.value // TODO : Warning, value must be tested
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    // TODO : refresh UI
                }
            }
        );
    }
}
