/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  ContextMenuEntry sub class                     *
 *                                                 *
 *  Entry in the ContextMenu                       *
 *                                                 *
 *  entryID       : {int} TODO                     *
 *  displayString : {string} TODO                  *
 *  callback      : {function} TODO                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

const NB_OF_NAMED_ARGS = 3; // /!\ IMPORTANT - CHANGE THIS IF YOU ADD/REMOVE ARGUMENTS FROM THIS CONSTRUCTOR /!\

let ContextMenuEntry = function (entryID, displayString, callback/*, MORE ARGUMENTS HERE*/) {

    this.entryID          = entryID;
    this.displayString    = displayString;
    this.callback         = callback;
    this.callbackArgs     = arguments.length > NB_OF_NAMED_ARGS ? new Array(arguments.length - NB_OF_NAMED_ARGS) : [];
    this.multiOpenSubmenu = false;
    this.hideRule         = null;
    this.showRule         = null;
    this.element          = null;
    this.children         = [];
    this.parent           = null;

    for (let i = NB_OF_NAMED_ARGS; i < arguments.length; ++i) {
        this.callbackArgs[i - NB_OF_NAMED_ARGS] = arguments[i];
    }

    this._checkStylesheet();
    this._init();
};


ContextMenuEntry.prototype = {

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : activateEventListener (public)
     * class  : ContextMenuEntry
     * desc   : activates the event listeners for the entire menu system
     **/
    activateEventListener: function () { //Call this on the root
        let self = this;

        document.body.addEventListener('click', function(event) {
            let target = event.target;
            while (target && target != self.element)
                target = target.parentNode;

            if(target != self.element)
                self.element.dispatchEvent(new Event('mzk_ctx:close', {bubbles: true}));
        }, true);

        this.element.addEventListener("click", function (event) {
            if (event.target.tagName !== 'LI') { return true; }

            let target  = event.target;
            let ixArray = new Array(10);
            let i       = 0;

            while (target.parentNode !== self.element) {
                ixArray[i++] = target.dataset.parentIx;

                do {
                    target = target.parentNode;
                } while (target.tagName !== 'LI');
            }

            ixArray[i] = target.dataset.parentIx;

            let clicked = self;

            for (i; i >= 0; --i) {
                clicked = clicked.children[ixArray[i]];
            }

            //If the entry is a leaf then run its action
            if (clicked.children.length === 0) { clicked._runCallback(); }

            //Else expand it
            else {
                if (clicked.parent.multiOpenSubmenu) {
                    clicked.parent.closeAll();
                }

                clicked.element.classList.toggle("mzk-ctx-open");
            }
        });
    },


    /**
     * method : addChild (public)
     * class  : ContextMenuEntry
     * desc   : add a subentry to this menu
     * arg    : {object} other_entry - the ContextMenuEntry to add
     *          {string} before_ID   - the ID of the element before which to add
     *          {bool}   after       - add after the ID instead of before
     **/
    addChild: function (other_entry, before_ID, after) {
        //Create the child element
        let li              = document.createElement("LI");
        li.dataset.parentIx = this.children.length;

        if (other_entry.entryID) { li.id = "mzk-ctx-li-" + other_entry.entryID; }

        li.textContent      = other_entry.displayString;
        li.appendChild(other_entry.element);

        //Find where to insert it
        let childRef        = this._findChildByID(before_ID);
        if (childRef) {
            if (after === false) { childRef = childRef.element.parentNode;             }
            else                 { childRef = childRef.element.parentNode.nextSibling; }
        }

        //Insert it and add the cross references
        this.element.insertBefore(li, childRef);
        this.children.push(other_entry);
        other_entry.parent = this;

        if (this.element.parentNode) { this.element.parentNode.classList.add("mzk-ctx-submenu"); }
        return other_entry;
    },


    /**
     * method : closeAll (public)
     * class  : ContextMenuEntry
     * desc   : close the menu and its submenus
     **/
    closeAll: function() {
        this.children.forEach(function(child) {
            child.closeAll();
            child.element.classList.remove("mzk-ctx-open");
        });
    },


    /**
     * method : seMultiOpenSubmenu (public)
     * class  : ContextMenuEntry
     * desc   : set the boolean that allow for multiple submenus to be opened
     * arg    : {bool} allow - whether to allow or forbid multiple open submenus
     **/
    seMultiOpenSubmenu: function(allow) {
        this.multiOpenSubmenu = allow;
        return this;
    },


    /**
     * method : setVisibleAreas (public)
     * class  : ContextMenuEntry
     * desc   : hides the entry unless the menu was opened on a child node of a node whose id is contained in the array
     * arg    : {array/string} array_of_IDs - the IDs to allow
     **/
    setVisibleAreas: function(array_of_IDs) {
        if (this.entryID === null || this.entryID !== undefined) {
            return;
        }

        let menu_selector = "#mzk-ctx-wrap";
        let this_selector = " #mzk-ctx-li-" + this.entryID;
        let hide_css      = "{ display: none; visibility: hidden; }";
        let show_css      = "{ display: block; visibility: visible; }";
        let sheet         = window.app.cssFiles.contextMenu;

        this.hideRule     = sheet.insertRule(menu_selector + this_selector + hide_css);
        let show_selector = ".mzk-ctx-void";

        for (let i = 0; i < array_of_IDs.length; ++i) {
            show_selector += "," + menu_selector + ".mzk-ctx-include-" + array_of_IDs[i] + this_selector;
        }

        this.showRule     = sheet.insertRule(show_selector + show_css);
    },

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _checkStylesheet (private)
     * class  : ContextMenuEntry
     * desc   : setup the stylesheet needed for the setVisibleAreas function
     **/
    _checkStylesheet: function() {
        if (window.app.cssFiles.contextMenu) { return; }

        let el = document.createElement("STYLE");
        // Webkit hack to enable the stylesheet
        el.appendChild(document.createTextNode(""));

        let styleSheetIx = document.styleSheets.length;

        document.head.appendChild(el);
        window.app.cssFiles.contextMenu = document.styleSheets[styleSheetIx];
    },


    /**
     * method : _findChildByID (private)
     * class  : ContextMenuEntry
     * desc   : find a direct child from its ID
     * arg    : {string} childID - the ID of the child
     **/
    _findChildByID: function(childID) {
        if (childID === null || childID === undefined) { return null; }

        for (let i = 0; i < this.children.length; ++i) {
            if (this.children[i].entryID === childID) { return this.children[i]; }
        }

        return null;
    },


    /**
     * method : _init (private)
     * class  : ContextMenuEntry
     * desc   : creates the DOM element
     **/
    _init: function () {
        this.element = document.createElement("UL");

        if (this.entryID) { this.element.id = "mzk-ctx-ul-" + this.entryID; }
    },


    /**
     * method : _runCallback (private)
     * class  : ContextMenuEntry
     * desc   : run the callback associated with the entry
     **/
    _runCallback: function () {
        if (this.callback) {
            this.children.forEach(function(child) {
                child.closeAll();
                child.element.classList.remove("mzk-ctx-open");
            });
            this.callback.apply(null, this.callbackArgs);
        }
        this.element.dispatchEvent(new Event('mzk_ctx:close', {bubbles: true}));
    }

};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                       *
 *  ContextMenu class                                                    *
 *                                                                       *
 *  Handle the context menu on right click                               *
 *                                                                       *
 *  parentElement : {object} the container hoisting the menu             *
 *  openCallback  : {function} A function to run when the menu is opened *
 *  event         : {string} The trigger event                           *
 *                                                                       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

class ContextMenu {
    constructor(parentElement, openCallback, event) {

        this.contextMenu   = null;
        this.parentElement = parentElement;
        this.openCallback  = openCallback;
        this.element       = null;
        this.isVisible     = false;
        this.event         = event ? event : 'contextmenu';

        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : addEntry (public)
     * class  : ContextMenu
     * desc   : Add an entry to the ContextMenu
     **/
    addEntry(entryPath, displayStr, callback /*, more args for the callback */) {
        let context;
        let parent = this.contextMenu;

        let i, j;
        if (Array.isArray(entryPath)) {
            pathForward: for (i = 0; i < entryPath.length - 1; ++i) {
                for (j = 0; j < parent.children.length; ++j)
                    if (parent.children[j].entryID == entryPath[i]) {
                        parent = parent.children[j];
                        continue pathForward;
                    }

                parent   = parent.addChild(new ContextMenuEntry(entryPath[i], entryPath[i]));
            }
            arguments[0] = entryPath[entryPath.length - 1];
        }

        context = Object.create(ContextMenuEntry.prototype);
        ContextMenuEntry.apply(context, arguments);
        parent.addChild(context);
    }


    /**
     * method : reattach (public)
     * class  : ContextMenu
     * desc   : (re-)add the context menu to its parent
     **/
    reattach() {
        this.parentElement.insertBefore(this.element, this.parentElement.firstChild);
    }


    setInvisible() {
        removeVisibilityLock(this.element);
    }


    /**
     * method : getRoot
     * class  : ContextMenu
     * desc   : Return the root of the menu
     **/
    getRoot() {
        return this.contextMenu;
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : _init (private)
     * class  : ContextMenu
     * desc   : Building entries and UI
     **/
    _init() {
        this.contextMenu = new ContextMenuEntry("master", "", null);
        this.contextMenu.activateEventListener();
        this.element     = document.createElement('DIV');
        this.element.id  = "mzk-ctx-wrap";
        this.element.appendChild(this.contextMenu.element);
        this.parentElement.insertBefore(this.element, this.parentElement.firstChild);

        this._eventListener();
        this._keyListener();
    }


    /**
     * method : _eventListener (private)
     * class  : ContextMenu
     * desc   : ContextMenu event listeners
     **/
    _eventListener() {
        let self = this;

        this.parentElement.addEventListener(this.event, function(event) {
            if (event.pageY <= document.documentElement.clientHeight / 2) {
                self.element.style.bottom = "unset";
                self.element.style.top    = event.pageY + "px";
            }

            else {
                self.element.style.top    = "unset";
                self.element.style.bottom = (document.documentElement.clientHeight - event.pageY) + "px";
            }

            if (event.pageX <= document.documentElement.clientWidth / 2) {
                self.element.style.right = "unset";
                self.element.style.left  = event.pageX + "px";
            }

            else {
                self.element.style.left  = "unset";
                self.element.style.right = (document.documentElement.clientWidth - event.pageX) + "px";
            }

            self.contextMenu.closeAll();
            self.element.className = "";

            let target = event.target;

            while (target) {
                if(target.id) { self.element.classList.add("mzk-ctx-include-" + target.id); }
                target = target.parentNode;
            }

            addVisibilityLock(self.element);
            if (self.openCallback) { self.openCallback(event); }
        });

        this.element.addEventListener('mzk_ctx:close', function() {
            self.element.className = "";
            self.contextMenu.closeAll();
        });
    }

    /**
     * method : _keyListener (private)
     * class  : ContextMenu
     * desc   : ContextMenu key listeners
     **/
    _keyListener() {
        let that = this;

        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 27: // Esc
                    if (that.isVisible) { that.toggleVisibilityLock(); }
                    break;

                default:
                    break;
            }
        });
    }

}
