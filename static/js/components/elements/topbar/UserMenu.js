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
        this.ui = {
            container: document.createElement("DIV"),
            img:       document.createElement("IMG")
        };

        this.ui.container.className = "mzk-user-expander";
        this.ui.img.src             = "/static/img/utils/user.svg";

        this.ui.container.appendChild(this.ui.img);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _setupContextMenu (private)
     * class  : UserMenu
     * desc   : UserMenu context menu
     **/
    _setupContextMenu() {
        let that         = this;
        this.contextMenu = new ContextMenu(this.ui.container, null, 'click');

        if (window.app.user.hasPermission("ADMV")) {
            let adm = new ContextMenuEntry('admin', 'Admin', function() {
                window.app.showAppView('mzk_admin');
            });
            that.contextMenu.getContextMenu().addChild(adm, 'invite', false);
        }
        if (window.app.user.hasPermission("SPON")) {
            this.contextMenu.addEntry('invite', 'Invite Code', function() {
                new Modal('inviteCode', null).open();
            });
        }
        this.contextMenu.addEntry('settings', window.app.user.getUsername(), function() { // TODO : replace w/ username
            window.app.showAppView('mzk_user');
        });
        if (window.app.user.hasPermission("STAT")) {
            this.contextMenu.addEntry('stats', 'Stats', function() {
                window.app.showAppView('mzk_stats');
            });
        }
        this.contextMenu.addEntry('logout', 'Log out', function() {
            window.app.logOut();
        });
    }

}

export default UserMenu
