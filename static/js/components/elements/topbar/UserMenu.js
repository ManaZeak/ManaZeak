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

        this.ui.container.id = "userExpander";
        this.ui.img.src      = "/static/img/utils/user.svg";

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

        this.contextMenu.addEntry('invite', 'Invite Code', function() {
            new Modal('inviteCode', null).open();
        });
        this.contextMenu.addEntry('settings', 'Username', function() { // TODO : replace w/ username
            window.app.showAppView('mzk_settings');
        });
        this.contextMenu.addEntry('stats', 'Stats', function() {
            window.app.showAppView('mzk_stats');
        });
        this.contextMenu.addEntry('logout', 'Log out', function() {
            window.app.logOut();
        });
        window.app.user.updateIsAdmin(function(is) {
            if (is) {
                let adm = new ContextMenuEntry('admin', 'Admin', function() {
                    window.app.showAppView('mzk_admin');
                });
                that.contextMenu.getContextMenu().addChild(adm, 'invite', false);
            }
        });
    }

}

export default UserMenu
