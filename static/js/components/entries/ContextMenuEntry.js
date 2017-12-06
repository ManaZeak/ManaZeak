/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ContextMenu class - handle the context menu on right click                         *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let ContextMenuEntry = function (entryID, displayString, callback/*, MORE ARGUMENTS HERE*/) {
    // /!\ IMPORTANT - CHANGE THIS IF YOU ADD/REMOVE ARGUMENTS FROM THIS CONSTRUCTOR /!\
    const NB_OF_NAMED_ARGS = 3;

    this.displayString = displayString;
    this.callback      = callback;
    this.callback_args = arguments.length > NB_OF_NAMED_ARGS ? new Array(arguments.length - NB_OF_NAMED_ARGS) : [];

    for (let i = NB_OF_NAMED_ARGS; i < arguments.length; ++i) {
        this.callback_args[i - NB_OF_NAMED_ARGS] = arguments[i];
    }

    this.multi_open_submenu = false;
    this.entryID            = entryID;
    this.hide_rule          = null;
    this.show_rule          = null;

    this.element            = null;
    this.children           = [];
    this.parent             = null;

    this.check_stylesheet();

    this._init();
};


ContextMenuEntry.prototype = {

    _init: function () {
        this.element = document.createElement("UL");

        if(this.entryID) { this.element.id = "mzk-ctx-ul-" + this.entryID; }
    },


    set_multi_open_submenu: function(allow) {
        this.multi_open_submenu = allow;

        return this;
    },


    set_visible_areas: function(array_of_IDs) {
        if (this.entryID === null || this.entryID !== undefined) {
            return;
        }

        let menu_selector = "#mzk-ctx-wrap";
        let this_selector = " #mzk-ctx-li-" + this.entryID;
        let hide_css      = "{ display: none; visibility: hidden; }";
        let show_css      = "{ display: block; visibility: visible; }";
        let sheet         = window.app.cssFiles.contextMenu;

        this.hide_rule = sheet.insertRule(menu_selector + this_selector + hide_css);
        let show_selector = ".mzk-ctx-void";

        for (let i = 0; i < array_of_IDs.length; ++i) {
            show_selector += "," + menu_selector + ".mzk-ctx-include-" + array_of_IDs[i] + this_selector;
        }

        this.show_rule    = sheet.insertRule(show_selector + show_css);
    },


    add_child: function (other_entry, before_ID, after) {
        //Create the child element
        let li = document.createElement("LI");
        li.dataset.parentIx = this.children.length;

        if (other_entry.entryID) { li.id = "mzk-ctx-li-" + other_entry.entryID; }

        li.textContent = other_entry.displayString;
        li.appendChild(other_entry.element);

        //Find where to insert it
        let childRef = this.find_child_by_ID(before_ID);

        if (childRef) {
            if (after === false) { childRef = childRef.element.parentNode;             }
            else                 { childRef = childRef.element.parentNode.nextSibling; }
        }

        //Insert it and add the cross references
        this.element.insertBefore(li, childRef);
        this.children.push(other_entry);
        other_entry.parent = this;

        if (this.element.parentNode) { this.element.parentNode.classList.add("mzk-ctx-submenu"); }
    },


    //Call this on the root
    activate_event_listener: function () {
        let self = this;

        this.element.addEventListener("click", function (event) {
            if (event.target.tagName !== 'LI') { return true; }

            let target  = event.target;
            let ixArray = new Array(10);
            let i       = 0;

            while (target.parentNode !== self.element) {
                ixArray[i++] = target.dataset.parentIx;

                do {
                    target = target.parentNode;
                } while(target.tagName !== 'LI');
            }

            ixArray[i] = target.dataset.parentIx;

            let clicked = self;

            for (i; i >= 0; --i) {
                clicked = clicked.children[ixArray[i]];
            }

            //If the entry is a leaf then run its action
            if (clicked.children.length === 0) { clicked.run_callback(); }

            //Else expand it
            else {
                if (clicked.parent.multi_open_submenu) { clicked.parent.close_all(); }

                clicked.element.classList.toggle("mzk-ctx-open");
                
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();
            }
        }, true);
    },


    find_child_by_ID: function(childID) {
        if (childID === null || childID === undefined) { return null; }

        for (let i = 0; i < this.children.length; ++i) {
            if (this.children[i].entryID === childID) { return this.children[i]; }
        }

        return null;
    },


    close_all: function() {
        this.children.forEach(function(child) {
           child.close_all();
           child.element.classList.remove("mzk-ctx-open");
        });
    },


    run_callback: function () {
        if (this.callback) { this.callback.apply(null, this.callback_args); }
    },


    check_stylesheet: function() {
        if(window.app.cssFiles.contextMenu) { return; }

        let el = document.createElement("STYLE");
        //Webkit hack to enable the stylesheet
        el.appendChild(document.createTextNode(""));

        let styleSheetIx = document.styleSheets.length;

        document.head.appendChild(el);
        window.app.cssFiles.contextMenu = document.styleSheets[styleSheetIx];
    }
};
