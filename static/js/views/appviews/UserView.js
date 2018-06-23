/* * * * * * * * * * * * * * * * * * * * * *
 *                                 *
 *  UserView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedGetRequest } from '../../utils/Utils.js'
import Notification from '../../utils/Notification.js'
import View from '../../core/View.js'

class UserView extends View {

    constructor() {
        super();

        this.LOG = true; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('    UserView construction');
        }

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
        if (window.debug && this.LOG) {
            console.log('    UserView : _clearSpace call');
        }

        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : UserView
     * desc   : Build UI elements
     **/
    _createUI() {
        if (window.debug && this.LOG) {
            console.log('    UserView : _createUI call');
        }

        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:     document.createElement("UL"),
            menuGen:      document.createElement("LI"),
            menuUp:       document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.classList.add("mzk-user-view");
        this.ui.menu.className      = "mzk-left-menu";
        this.ui.content.className   = "mzk-content";
        this.ui.menuTitle.innerHTML = window.app.nls.userView.panel;
        this.ui.menuGen.innerHTML   = window.app.nls.userView.general.entry;
        this.ui.menuUp.innerHTML   = window.app.nls.userView.uploads.entry;

        this.ui.menuList.appendChild(this.ui.menuGen);
        this.ui.menuList.appendChild(this.ui.menuUp);
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
        if (window.debug && this.LOG) {
            console.log('    UserView : _eventListener call');
        }

        this.ui.menuGen.addEventListener("click", this._requestGeneralPage.bind(this));
        this.ui.menuUp.addEventListener("click", this._requestUploadsPage.bind(this));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestGeneralPage() {
        if (window.debug && this.LOG) {
            console.log('    UserView : _requestGeneralPage call');
        }

        this._updateSettingsInfo();
        this._clearPageSpace();
        this.ui.menuGen.className          = "mzk-selected";
        this.ui.contentTitle.innerHTML     = window.app.nls.userView.general.title;

        this.ui.rescanLibLabel            = document.createElement("P");
        this.ui.rescanLibButton           = document.createElement("BUTTON");

        this.ui.rescanLibLabel.innerHTML  = "<b>" + window.app.nls.userView.general.removeAccount.title + "</b><br>" +
                                                "<br>" +
                                                window.app.nls.userView.general.removeAccount.text;
        this.ui.rescanLibButton.innerHTML = window.app.nls.userView.general.removeAccount.button;

        this.ui.rescanLibButton.addEventListener("click", function() {
            JSONParsedGetRequest(
                "user/delete/",
                function(response) {
                    /* response = {
                     *     DONE      : bool
                     *     ERROR_H1  : string
                     *     ERROR_MSG : string
                     * } */
                    if (window.debug && that.LOG) {
                        console.log('    UserView : _requestGeneralPage call');
                    }

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
     * method : _requestUploadsPage (private)
     * class  : UserView
     * desc   : Display the uploads page
     **/
    _requestUploadsPage() {
        if (window.debug && this.LOG) {
            console.log('    UserView : _requestUploadPage call');
        }

        this._updateSettingsInfo();
        this._clearPageSpace();
        this.ui.menuUp.className       = "mzk-selected";
        this.ui.contentTitle.innerHTML = window.app.nls.userView.uploads.title;

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        if (window.debug && this.LOG) {
            console.log('    UserView : _unselectAllMenuEntries call');
        }

        this.ui.menuGen.className = "";
        this.ui.menuUp.className  = "";
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Updates settings information
     **/
    _updateSettingsInfo(callback) {
        if (window.debug && this.LOG) {
            console.log('    UserView : _updateSettingsInfo call');
        }

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
                if (window.debug && that.LOG) {
                    console.log('    UserView : _updateSettingsInfo server response');
                }

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

export default UserView
