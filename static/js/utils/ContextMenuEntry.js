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

class ContextMenuEntry {

    constructor(entryID, displayString, callback/*, MORE ARGUMENTS HERE*/) {
        this.entryID          = entryID;
        this.displayString    = displayString;
        this.callback         = callback;
        this.callbackArgs     = arguments.length > NB_OF_NAMED_ARGS ? new Array(arguments.length - NB_OF_NAMED_ARGS) : [];
        this.multiOpenSubmenu = false;
        this.hideRule         = null;
        this.showRule         = null;
        this.element          = null;
        this.wrapper          = null;
        this.children         = [];
        this.parent           = null;

        for (let i = NB_OF_NAMED_ARGS; i < arguments.length; ++i) {
            this.callbackArgs[i - NB_OF_NAMED_ARGS] = arguments[i];
        }

        this._checkStylesheet();
        this._init();
    }


//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : activateEventListener (public)
     * class  : ContextMenuEntry
     * desc   : activates the event listeners for the entire menu system
     **/
    activateEventListener() { //Call this on the root
        let self = this;
        this.element.addEventListener("click", function (event) {

            let target = event.target;
            while(target.tagName != 'LI')
                if(target == self.element)
                    return true;
                else
                    target = target.parentNode;

            let elArray = new Array(10);
            let i       = 0;

            while (target.parentNode !== self.element) {
                elArray[i++] = target;

                do {
                    target = target.parentNode;
                } while (target.tagName !== 'LI');
            }

            elArray[i]  = target;

            let clicked = self;

            for (i; i >= 0; --i) {
                for(var j = 0; elArray[i] != clicked.children[j].wrapper; j++);

                clicked = clicked.children[j];
            }

            if (clicked.children.length === 0) { // If the entry is a leaf then run its action
                clicked._runCallback();
            }

            else { // Else expand it
                if (clicked.parent.multiOpenSubmenu) {
                    clicked.parent.closeAll();
                }

                clicked.element.classList.toggle("mzk-ctx-open");
            }
        });
    }


    /**
     * method : addChild (public)
     * class  : ContextMenuEntry
     * desc   : add a subentry to this menu
     * arg    : {object} other_entry - the ContextMenuEntry to add
     *          {string} before_ID   - the ID of the element before which to add
     *          {bool}   after       - add after the ID instead of before
     **/
    addChild(other_entry, before_ID, after) {

        //Find where to insert it
        let childRef        = this.findChildByID(before_ID);
        if (childRef) {
            if (after === true)  { childRef = childRef.element.parentNode.nextSibling; }
            else                 { childRef = childRef.element.parentNode;             }
        }

        //Insert it and add the cross references
        this.element.insertBefore(other_entry.wrapper, childRef);
        this.children.push(other_entry);
        other_entry.parent = this;

        if (this.element.parentNode) { this.element.parentNode.classList.add("mzk-ctx-submenu"); }
        return other_entry;
    }


    /**
     * method : findChildByID (private)
     * class  : ContextMenuEntry
     * desc   : find a direct child from its ID
     * arg    : {string} childID - the ID of the child
     **/
    findChildByID(childID) {
        if (childID === null || childID === undefined) {
            return null;
        }

        for (let i = 0; i < this.children.length; ++i) {
            if (this.children[i].entryID === childID) {
                return this.children[i];
            }
        }

        return null;
    }


    /**
     * method : removeChild (public)
     * class  : ContextMenuEntry
     * desc   : remove a subentry from this menu
     * arg    : {object} other_entry - the ContextMenuEntry to remove
     **/
    removeChild(otherID) {
        for(let i = 0; i < this.children.length; ++i)
            if(this.children[i].entryID == otherID) {
                let child = this.children[i];
                this.element.removeChild(child.element.parentNode);
                this.children.splice(i, 1);
                return child;
            }
        return null;
    }


    /**
     * method : closeAll (public)
     * class  : ContextMenuEntry
     * desc   : close the menu and its submenus
     **/
    closeAll() {
        this.children.forEach(function(child) {
            child.closeAll();
            child.element.classList.remove("mzk-ctx-open");
        });
    }

    /**
     * method : setDisplayString
     * class  : ContextMenuEntry
     * desc   : change the display string
     * arg    : {string} newStr
     */
    setDisplayString(newStr) {
        this.displayString = newStr;
        if(this.wrapper.firstChild)
            this.wrapper.firstChild.innerHTML = newStr;
    }


    /**
     * method : setMultiOpenSubmenu (public)
     * class  : ContextMenuEntry
     * desc   : set the boolean that allow for multiple submenus to be opened
     * arg    : {bool} allow - whether to allow or forbid multiple open submenus
     **/
    setMultiOpenSubmenu(allow) {
        this.multiOpenSubmenu = allow;
        return this;
    }


    /**
     * method : setVisibleAreas (public)
     * class  : ContextMenuEntry
     * desc   : hides the entry unless the menu was opened on a child node of a node whose id is contained in the array
     * arg    : {array/string} array_of_IDs - the IDs to allow
     **/
    setVisibleAreas(array_of_IDs) {
        if (this.entryID === null || this.entryID !== undefined) {
            return;
        }

        let menu_selector  = "#mzk-ctx-wrap";
        let this_selector  = " #mzk-ctx-li-" + this.entryID;
        let hide_css       = "{ display: none; visibility: hidden; }";
        let show_css       = "{ display: block; visibility: visible; }";
        let sheet          = window.app.cssFiles.contextMenu;

        this.hideRule      = sheet.insertRule(menu_selector + this_selector + hide_css);
        let show_selector  = ".mzk-ctx-void";

        for (let i = 0; i < array_of_IDs.length; ++i) {
            show_selector += "," + menu_selector + ".mzk-ctx-include-" + array_of_IDs[i] + this_selector;
        }

        this.showRule      = sheet.insertRule(show_selector + show_css);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _checkStylesheet (private)
     * class  : ContextMenuEntry
     * desc   : setup the stylesheet needed for the setVisibleAreas function
     **/
    _checkStylesheet() {
        if (window.app.cssFiles.contextMenu) {
            return;
        }

        let el = document.createElement("STYLE");
        // Webkit hack to enable the stylesheet
        el.appendChild(document.createTextNode(""));
        let styleSheetIx = document.styleSheets.length;
        document.head.appendChild(el);
        window.app.cssFiles.contextMenu = document.styleSheets[styleSheetIx];
    }


    /**
     * method : _init (private)
     * class  : ContextMenuEntry
     * desc   : creates the DOM element
     **/
    _init() {
        this.element = document.createElement("UL");
        this.wrapper = document.createElement("LI");

        if (this.entryID) {
            this.element.id = "mzk-ctx-ul-" + this.entryID;
            this.wrapper.id = "mzk-ctx-li-" + this.entryID;
        }
        this.wrapper.innerHTML      = '<span class="mzk-ctx-label">' + this.displayString + '</span>';
        this.wrapper.appendChild(this.element);
    }


    /**
     * method : _runCallback (private)
     * class  : ContextMenuEntry
     * desc   : run the callback associated with the entry
     **/
    _runCallback() {
        if (this.callback) {
            this.children.forEach(function(child) {
                child.closeAll();
                child.element.classList.remove("mzk-ctx-open");
            });
            this.callback.apply(null, this.callbackArgs);
        }
        window.app.closeActiveMenu();
    }

    //====================================== GETTERS ===================================================
    getID() { return this.entryID; }

}

export default ContextMenuEntry