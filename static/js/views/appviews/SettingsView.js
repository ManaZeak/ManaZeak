/* * * * * * * * * * * * * * * * * * * * * *
 *                                 *
 *  AdminView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class SettingsView extends View {

    constructor() {

        super();

        this.info  = null;
        this._createUI();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : SettingsView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : SettingsView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:     document.createElement("UL"),
            menuGen:       document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.id        = "settings";
        this.ui.menu.id             = "leftMenu";
        this.ui.content.id          = "content";

        this.ui.menuTitle.innerHTML = "Settings";
        this.ui.menuGen.innerHTML    = "General";

        this.ui.menuList.appendChild(this.ui.menuGen);

        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestGeneralPage();
    }


    /**
     * method : _eventListener (private)
     * class  : SettingsView
     * desc   : SettingsView event listeners
     **/
    _eventListener() {
        this.ui.menuGen.addEventListener("click", this._requestGeneralPage.bind(this));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : SettingsView
     * desc   : Display the general page
     **/
    _requestGeneralPage() {
        this._updateSettingsInfo();
        this._clearPageSpace();
        this.ui.menuGen.className        = "selected";
        this.ui.contentTitle.innerHTML  = "General settings";

        let that = this;
        this._updateSettingsInfo(function() {
            let userInfo = document.createElement("P");
            let admin         = that.info.IS_ADMIN ? "Admin" : "User";


            that.ui.contentTitle.innerHTML  = "General settings";
            userInfo.innerHTML = "<b>" + that.info.USER_NAME + "</b> (" + admin + ") <br><br>" +
                "User ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + that.info.INVITE_CODE + "<br>" +
                "Godfather:&nbsp;&nbsp;" + that.info.GODFATHER_NAME + " (" + that.info.GODFATHER_CODE + ")<br>" +
                "ManaCoin: " + that.info.MANACOIN + "<br><br>" +
                "Joined on: " + that.info.DATE_JOINED + "<br>" +
                "Last login: " + that.info.LAST_LOGIN;

            that.ui.content.appendChild(that.ui.contentTitle);
            that.ui.content.appendChild(document.createElement("HR"));
            that.ui.content.appendChild(userInfo);
        });
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : SettingsView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        this.ui.menuGen.className   = "";
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : SettingsView
     * desc   : Updates settings information
     **/
    _updateSettingsInfo(callback) {
        let that = this;
        JSONParsedGetRequest(
            "ajax/getUserSettings/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (response.DONE) {
                    that.info = response;

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

}
