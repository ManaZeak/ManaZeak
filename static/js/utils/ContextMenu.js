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

import { addVisibilityLock, removeVisibilityLock } from './Utils.js'
import ContextMenuEntry from './ContextMenuEntry.js'

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
     * desc   : Add an entry to the
     * arg    : {string} entryPath - TODO
     *        : {} displayString - TODO
     *        : {function} callback - The function to callback - Not Mandatory
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

        //Simulate unshift on arguments
        let finalArgs = new Array(arguments.length);
        for(let i = 0; i < arguments.length; ++i)
            finalArgs[i + 1] = arguments[i];

        //Bind arguments array to the new constructor and call it
        parent.addChild(new (ContextMenuEntry.bind.apply(ContextMenuEntry, finalArgs))());
    }


    /**
     * method : reattach (public)
     * class  : ContextMenu
     * desc   : (re)add the context menu to its parent
     **/
    reattach() {
        this.parentElement.insertBefore(this.element, this.parentElement.firstChild);
    }


    /**
     * method : setInvisible (public)
     * class  : ContextMenu
     * desc   : Set ContextMenu invisible
     **/
    setInvisible() {
        removeVisibilityLock(this.element);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : ContextMenu
     * desc   : ContextMenu event listeners
     **/
    _eventListener() {
        let that = this;
        this.parentElement.addEventListener(this.event, function(event) {
            if (event.pageY <= document.documentElement.clientHeight / 2) {
                that.element.style.bottom = "unset";
                that.element.style.top    = event.pageY + "px";
            }

            else {
                that.element.style.top    = "unset";
                that.element.style.bottom = (document.documentElement.clientHeight - event.pageY) + "px";
            }

            if (event.pageX <= document.documentElement.clientWidth / 2) {
                that.element.style.right = "unset";
                that.element.style.left  = event.pageX + "px";
            }

            else {
                that.element.style.left  = "unset";
                that.element.style.right = (document.documentElement.clientWidth - event.pageX) + "px";
            }

            that.contextMenu.closeAll();
            that.element.className = "";

            let target = event.target;

            while (target) {
                if (target.id) {
                    that.element.classList.add("mzk-ctx-include-" + target.id);
                }

                target = target.parentNode;
            }

            addVisibilityLock(that.element);
            if (that.openCallback) {
                that.openCallback(event);
            }
        });

        this.element.addEventListener('mzk_ctx:close', function() {
            that.element.className = "";
            that.contextMenu.closeAll();
        });
    }


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
     * method : _keyListener (private)
     * class  : ContextMenu
     * desc   : ContextMenu key listeners
     **/
    _keyListener() {
        let that = this;
        document.addEventListener("keydown", function(event) { // TODO : put this in Shortcut
            switch (event.keyCode) {
                case 27: // Esc
                    if (that.isVisible) { that.toggleVisibilityLock(); }
                    break;

                default:
                    break;
            }
        });
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getContextMenu() { return this.contextMenu; }

}

export default ContextMenu