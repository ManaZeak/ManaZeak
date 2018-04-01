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

            menuList:          document.createElement("UL"),
            menuShortcut:      document.createElement("LI"),
            menuTagConvention: document.createElement("LI"),
            menuRanksPerms: document.createElement("LI"),
            menuManaCoin: document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.classList.add("mzk-user-view");
        this.ui.menu.className         = "mzk-left-menu";
        this.ui.content.className      = "mzk-content";
        this.ui.menuTitle.innerHTML    = "Help Center";
        this.ui.menuShortcut.innerHTML = "Shortcuts";
        this.ui.menuTagConvention.innerHTML = "Tag convention";
        this.ui.menuRanksPerms.innerHTML = "Ranks / Permissions";
        this.ui.menuManaCoin.innerHTML = "ManaCoin";

        this.ui.menuList.appendChild(this.ui.menuShortcut);
        this.ui.menuList.appendChild(this.ui.menuTagConvention);
        this.ui.menuList.appendChild(this.ui.menuRanksPerms);
        this.ui.menuList.appendChild(this.ui.menuManaCoin);
        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestShortcutsPage();
    }


    /**
     * method : _eventListener (private)
     * class  : UserView
     * desc   : UserView event listeners
     **/
    _eventListener() {
        this.ui.menuShortcut.addEventListener("click", this._requestShortcutsPage.bind(this));
        this.ui.menuTagConvention.addEventListener("click", this._requestTagConventionPage.bind(this));
        this.ui.menuRanksPerms.addEventListener("click", this._requestRanksPermsPage.bind(this));
        this.ui.menuManaCoin.addEventListener("click", this._requestManaCoinPage.bind(this));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestShortcutsPage() {
        this._clearPageSpace();
        this.ui.menuShortcut.className     = "mzk-selected";
        this.ui.contentTitle.innerHTML     = "Shortcuts";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestTagConventionPage() {
        this._clearPageSpace();
        this.ui.menuTagConvention.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = "Tag convention";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestRanksPermsPage() {
        this._clearPageSpace();
        this.ui.menuRanksPerms.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = "Ranks / Permissions";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestManaCoinPage() {
        this._clearPageSpace();
        this.ui.menuManaCoin.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = "ManaCoin";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        this.ui.menuShortcut.className = "";
        this.ui.menuTagConvention.className = "";
        this.ui.menuRanksPerms.className = "";
        this.ui.menuManaCoin.className = "";
    }

}

export default HelpCenterView