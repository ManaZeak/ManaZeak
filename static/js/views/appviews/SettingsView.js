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
        this._init();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : AdminView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : AdminView
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

        this.ui.container.id        = "admin";
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
     * class  : AdminView
     * desc   : AdminView event listeners
     **/
    _eventListener() {
        this.ui.menuGen.addEventListener("click", this._requestGeneralPage.bind(this));
    }


    /**
     * method : _init (private)
     * class  : AdminView
     * desc   : Create view to DB page by default
     **/
    _init() {
        let that = this;
        this._updateSettingsInfo(function() {
            that._createUI();
        });
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : SettingsView
     * desc   :
     **/
    _requestGeneralPage() {
        this._updateSettingsInfo();
        this._clearPageSpace();
        this.ui.menuGen.className        = "selected";
        this.ui.contentTitle.innerHTML  = "General settings";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    _unselectAllMenuEntries() {
        this.ui.menuGen.className   = "";
    }


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
