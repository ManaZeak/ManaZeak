/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  UserMenu class                                 *
 *                                                 *
 *  Handle the user's menu                         *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import Modal from '../../../utils/Modal.js'
import ContextMenu from '../../../utils/ContextMenu.js'
import ContextMenuEntry from '../../../utils/ContextMenuEntry.js'

class UserMenu {

    constructor(container) {
        this.LOG = false; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('      UserMenu construction');
        }

        this.contextMenu = null;
        this._createUI(container);
        this._setupContextMenu();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : _createUI (private)
     * class  : UserMenu
     * desc   : Build UI Elements
     * arg    : {object} container - The UserMenu container
     **/
    _createUI(container) {
        if (window.debug && this.LOG) {
            console.log('      UserMenu : _createUI call');
        }

        this.ui = {
            container: document.createElement("DIV"),
            img:       document.createElement("IMG")
        };

        this.ui.container.className = "mzk-user-expander";
        this.ui.img.src             = "/static/img/controls/user.svg";

        this.ui.container.appendChild(this.ui.img);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _setupContextMenu (private)
     * class  : UserMenu
     * desc   : UserMenu context menu
     **/
    _setupContextMenu() {
        if (window.debug && this.LOG) {
            console.log('      UserMenu : _setupContextMenu call');
        }

        let that         = this;
        this.contextMenu = new ContextMenu(this.ui.container, null, 'click');

        if (window.app.user.hasPermission("ADMV")) {
            let adm = new ContextMenuEntry('admin', window.app.nls.userMenu.admin, function() {
                window.app.showAppView('mzk_admin');
            });
            that.contextMenu.getContextMenu().addChild(adm, 'invite', false);
        }
        if (window.app.user.hasPermission("SPON")) {
            this.contextMenu.addEntry('invite', window.app.nls.userMenu.inviteCode, function() {
                new Modal('inviteCode', null).open();
            });
        }
        this.contextMenu.addEntry('settings', window.app.user.getUsername(), function() { // TODO : replace w/ username
            window.app.showAppView('mzk_user');
        });
        if (window.app.user.hasPermission("STAT")) {
            this.contextMenu.addEntry('stats', window.app.nls.userMenu.stats, function() {
                window.app.showAppView('mzk_stats');
            });
        }
        this.contextMenu.addEntry('settings', window.app.nls.userMenu.helpCenter, function() { // TODO : replace w/ username
            window.app.showAppView('mzk_help');
        });
        this.contextMenu.addEntry('logout', window.app.nls.userMenu.logOut, function() {
            window.app.logOut();
        });
    }

}

export default UserMenu
