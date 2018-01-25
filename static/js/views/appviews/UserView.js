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

        this.ui.container.id        = "user";
        this.ui.menu.id             = "leftMenu";
        this.ui.content.id          = "content";
        this.ui.menuTitle.innerHTML = "User";
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
        this.ui.menuGen.className          = "selected";
        this.ui.contentTitle.innerHTML     = "General settings";

        let that = this;
        this._updateSettingsInfo(function() {
            let userInfo                   = document.createElement("P");

            let admin                      = that.info.IS_ADMIN ? "Admin" : "User";
            that.ui.contentTitle.innerHTML = "General settings";
            userInfo.innerHTML             = "<b>" + that.info.USERNAME + "</b> (" + admin + ") <br><br>" +
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

export default UserView