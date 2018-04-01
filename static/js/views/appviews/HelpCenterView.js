/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  HelpCenterView class                   *
 *                                         *
 *  Handle help center settings            *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedGetRequest } from '../../utils/Utils.js'
import Notification from '../../utils/Notification.js'
import View from '../../core/View.js'

class HelpCenterView extends View {

    constructor() {
        super();
        this.info  = null;
        this._createUI();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : UserView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : UserView
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

        this.ui.container.classList.add("mzk-user-view");
        this.ui.menu.className      = "mzk-left-menu";
        this.ui.content.className   = "mzk-content";
        this.ui.menuTitle.innerHTML = "Help Center";
        this.ui.menuGen.innerHTML   = "General";

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
     * class  : UserView
     * desc   : UserView event listeners
     **/
    _eventListener() {
        this.ui.menuGen.addEventListener("click", this._requestGeneralPage.bind(this));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestGeneralPage() {
        this._updateSettingsInfo();
        this._clearPageSpace();
        this.ui.menuGen.className          = "mzk-selected";
        this.ui.contentTitle.innerHTML     = "General settings";

        this.ui.rescanLibLabel            = document.createElement("P");
        this.ui.rescanLibButton           = document.createElement("BUTTON");

        this.ui.rescanLibLabel.innerHTML  = "<b>Remove my account</b><br>" +
                                                "<br>" +
                                                "Warning, this action will remove you from the database with all your data.<br>" +
                                                "Are you sure you want to remove your account ?";
        this.ui.rescanLibButton.innerHTML = "DELETE MY ACCOUNT";

        this.ui.rescanLibButton.addEventListener("click", function() {
            JSONParsedGetRequest(
                "user/delete/",
                function(response) {
                    /* response = {
                     *     DONE      : bool
                     *     ERROR_H1  : string
                     *     ERROR_MSG : string
                     * } */
                    if (response.DONE) {
                        window.location.reload();
                    }

                    else {
                        new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                    }
                }
            );
        });

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.rescanLibLabel);
        this.ui.content.appendChild(this.ui.rescanLibButton);
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        this.ui.menuGen.className = "";
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Updates settings information
     **/
    _updateSettingsInfo(callback) {
        let that = this;
        JSONParsedGetRequest( // TODO : user the function in User class
            "user/getSettings/",
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

export default HelpCenterView