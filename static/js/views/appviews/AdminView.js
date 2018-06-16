/* * * * * * * * * * * * * * * * * * * * * *
 *                                 *
 *  AdminView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedPostRequest, JSONParsedGetRequest, secondsToTimecode } from '../../utils/Utils.js'
import Notification from '../../utils/Notification.js'
import View from '../../core/View.js'
import Modal from '../../utils/Modal.js'

class AdminView extends View {

    constructor() {
        super();

        this.LOG = false; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('    AdminView construction');
        }

        this.info  = null;
        this.modal = null;
        this.currentPage = null;

        this._init();
    }


    /**
     * method : updateAdminInfo (public)
     * class  : AdminView
     * desc   : Updates admin information
     **/
    updateAdminInfo(callback) {
        if (window.debug && this.LOG) {
            console.log('    AdminView : updateAdminInfo call');
        }

        let that = this;
        JSONParsedGetRequest(
            "admin/getView/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     USER: {
                 *         GODFATHER_NAME:
                 *         NAME:
                 *         IS_ADMIN:
                 *         JOINED:
                 *         LAST_LOGIN:
                 *         USER_ID:
                 *         INVITE_CODE:
                 *         MANACOIN:
                 *     }
                 *     LIBRARIES: {
                 *         NAME:
                 *         PATH:
                 *         NUMBER_TRACK:
                 *         TOTAL_DURATION:
                 *         ID:
                 *     }
                 *     SYNC_KEY:
                 *     BUFFER_PATH:
                 *     INVITE_ENABLED:
                 * } */
                 if (window.debug && that.LOG) {
                     console.log('    AdminView : updateAdminInfo server response');
                 }

                if (response.DONE) {
                    that.info = response;
                    if(that.currentPage)
                        that.currentPage();

                    if (callback) {
                        callback();
                    }
                }
            }
        );
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : AdminView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _clearPageSpace call');
        }

        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : AdminView
     * desc   : Build UI elements
     **/
    _createUI() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _createUI call');
        }

        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:     document.createElement("UL"),
            menuDB:       document.createElement("LI"),
            menuUser:     document.createElement("LI"),
            menuLib:      document.createElement("LI"),
            menuSC:       document.createElement("LI"),
            menuWish:     document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.classList.add("mzk-adminview");
        this.ui.menu.className      = "mzk-left-menu";
        this.ui.content.className   = "mzk-admin-content";

        this.ui.menuTitle.innerHTML = window.app.nls.views.admin.panel;
        this.ui.menuDB.innerHTML    = window.app.nls.views.admin.database.entry;
        this.ui.menuUser.innerHTML  = window.app.nls.views.admin.groupsAndUsers.entry;
        this.ui.menuLib.innerHTML   = window.app.nls.views.admin.libraries.entry;
        this.ui.menuSC.innerHTML    = window.app.nls.views.admin.syncthing.entry;
        this.ui.menuWish.innerHTML  = window.app.nls.views.admin.wishes.entry;

        this.ui.menuList.appendChild(this.ui.menuDB);
        this.ui.menuList.appendChild(this.ui.menuUser);
        this.ui.menuList.appendChild(this.ui.menuLib);
        this.ui.menuList.appendChild(this.ui.menuWish);
        this.ui.menuList.appendChild(this.ui.menuSC);

        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestDBPage();
    }


    /**
     * method : _eventListener (private)
     * class  : AdminView
     * desc   : AdminView event listeners
     **/
    _eventListener() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _eventListener call');
        }

        this.ui.menuDB.addEventListener("click", this._requestDBPage.bind(this));
        this.ui.menuUser.addEventListener("click", this._requestUsersPage.bind(this));
        this.ui.menuLib.addEventListener("click", this._requestLibrariesPage.bind(this));
        this.ui.menuSC.addEventListener("click", this._requestSCPage.bind(this));
        this.ui.menuWish.addEventListener("click", this._requestWishPage.bind(this));
    }


    /**
     * method : _init (private)
     * class  : AdminView
     * desc   : Create view to DB page by default
     **/
    _init() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _init call');
        }

        let that = this;
        this.updateAdminInfo(function() {
            that._createUI();
        });
    }


    /**
     * method : _requestDBPage (private)
     * class  : AdminView
     * desc   : Display the database management page
     **/
    _requestDBPage() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _requestDBPage call');
        }

        this.currentPage = this._requestDBPage;
        this._clearPageSpace();
        this.ui.menuDB.className        = "mzk-selected";
        this.ui.contentTitle.innerHTML  = window.app.nls.views.admin.database.title;

        this.ui.rmMoodLabel             = document.createElement("P");
        this.ui.rmMoodButton            = document.createElement("BUTTON");
        this.ui.rmCoverLabel            = document.createElement("P");
        this.ui.rmCoverButton           = document.createElement("BUTTON");
        this.ui.dropLabel               = document.createElement("P");
        this.ui.dropButton              = document.createElement("BUTTON");

        this.ui.rmCoverLabel.innerHTML  = "<b>" + window.app.nls.views.admin.database.extractCovers.title + "</b><br>" +
            "<br>" +
            window.app.nls.views.admin.database.extractCovers.text;
        this.ui.rmMoodLabel.innerHTML   = "<b>" + window.app.nls.views.admin.database.removeMoodbars.title + "</b><br>" +
            "<br>" +
            window.app.nls.views.admin.database.removeMoodbars.text;
        this.ui.dropLabel.innerHTML     = "<b>" + window.app.nls.views.admin.database.dropDatabase.title + "</b><br>" +
            "<br>" +
            window.app.nls.views.admin.database.dropDatabase.text;
        this.ui.rmMoodButton.innerHTML  = window.app.nls.views.admin.database.removeMoodbars.button;
        this.ui.rmCoverButton.innerHTML = window.app.nls.views.admin.database.extractCovers.button;
        this.ui.dropButton.innerHTML    = window.app.nls.views.admin.database.dropDatabase.button;

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.rmCoverLabel);
        this.ui.content.appendChild(this.ui.rmCoverButton);
        this.ui.content.appendChild(this.ui.rmMoodLabel);
        this.ui.content.appendChild(this.ui.rmMoodButton);
        this.ui.content.appendChild(this.ui.dropLabel);
        this.ui.content.appendChild(this.ui.dropButton);

        this.ui.rmMoodButton.addEventListener("click", this._removeMoodbar.bind(this));
        this.ui.rmCoverButton.addEventListener("click", this._regenCover.bind(this));
        this.ui.dropButton.addEventListener("click", this._requestDrop.bind(this));
    }


    _regenCover() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _regenCover call');
        }

        let that = this;
        JSONParsedGetRequest(
            "admin/regenerateCovers/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                 if (window.debug && this.LOG) {
                     console.log('    AdminView : _regenCover call');
                 }

                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestDeleteLibraries (private)
     * class  : AdminView
     * desc   : Request to delete all library
     **/
    _requestDeleteLibraries() { // TODO : put the code below in APP
        if (window.debug && this.LOG) {
            console.log('    AdminView : _requestDeleteLibraries call');
        }

        let that = this;
        JSONParsedGetRequest(
            "library/deleteAll/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (window.debug && this.LOG) {
                    console.log('    AdminView : _requestDeleteLibraries server response');
                }

                if (response.DONE) {
                    window.app.playlists.clear();
                    window.app.changePlaylist();
                    that.ui.rmLibButton.blur();
                    that.updateAdminInfo();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestRescanLibraries (private)
     * class  : AdminView
     * desc   : Request to rescan all library
     **/
    _requestRescanLibraries() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _requestRescanLibrary call');
        }

        let that = this;
        JSONParsedGetRequest(
            "library/rescanAll/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PATH        : string
                 * } */
                if (window.debug && this.LOG) {
                    console.log('    AdminView : _requestRescanLibrary server response');
                }

                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestUsersPage (private)
     * class  : AdminView
     * desc   : Display the users management page
     **/
    _requestUsersPage() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _requestUsersPage call');
        }

        this.currentPage = this._requestUsersPage;
        this._clearPageSpace();
        this.ui.menuUser.className     = "mzk-selected";
        this.ui.contentTitle.innerHTML = window.app.nls.views.admin.groupsAndUsers.title;

        let sponsoringLabel            = document.createElement("P");
        let sponsoringSpan             = document.createElement("SPAN");
        let sponsoring                 = document.createElement("BUTTON");
        let groupListTitle             = document.createElement("P");
        let groupList                  = document.createElement("UL");
        let userListTitle              = document.createElement("P");
        let userList                   = document.createElement("UL");

        let that = this;
        for (let i = 0; i < this.info.USER.length; ++i) {
            let element                = document.createElement("LI");
            let grant                  = document.createElement("IMG");
            let rm                     = document.createElement("IMG");
            grant.src                  = "/static/img/controls/edit.svg";
            rm.src                     = "/static/img/controls/trash.svg";

            grant.addEventListener('click', function() {
                new Modal('chooseGroup', {
                    USER: that.info.USER[i],
                    GROUPS: that.info.GROUPS,
                    PERMISSIONS: that.info.PERMISSIONS
                }).open();
            });

            rm.addEventListener("click", function() {
                window.app.deleteUser(that.info.USER[i].USER_ID);
            });

            element.innerHTML          = "<b>" + this.info.USER[i].NAME + "</b> (" + this.info.USER[i].GROUP_NAME + ") <br><br>" +
                                         window.app.nls.views.admin.groupsAndUsers.users.list.entry.id + this.info.USER[i].INVITE_CODE + "<br>" +
                                         window.app.nls.views.admin.groupsAndUsers.users.list.entry.godfather + this.info.USER[i].GODFATHER_NAME + " (" + this.info.USER[i].GODFATHER_CODE + ")<br>" +
                                         window.app.nls.views.admin.groupsAndUsers.users.list.entry.manacoin + this.info.USER[i].MANACOIN + "<br><br>" +
                                         window.app.nls.views.admin.groupsAndUsers.users.list.entry.joined + this.info.USER[i].JOINED + "<br>" +
                                         window.app.nls.views.admin.groupsAndUsers.users.list.entry.login + this.info.USER[i].LAST_LOGIN;

            element.appendChild(rm);

            if (window.app.user.hasPermission("GAPR")) {
                element.appendChild(grant);
            }

            userList.appendChild(element);
        }

        for (let i = 0; i < this.info.GROUPS.length; ++i) {
            let element                = document.createElement("LI");
            let mod                    = document.createElement("IMG");
            mod.src                    = "/static/img/controls/edit.svg";
            element.innerHTML = "<b>" + this.info.GROUPS[i].NAME + "</b><br>" +
                                "(" + this.info.GROUPS[i].PERMISSIONS.length + "/"  + Object.keys(this.info.PERMISSIONS).length + window.app.nls.views.admin.groupsAndUsers.groups.list.permissions + ")";

            mod.addEventListener('click', function() {
                new Modal('editGroup', {
                    GROUP: that.info.GROUPS[i],
                    PERMISSIONS: that.info.PERMISSIONS
                }).open();
            });

            if (window.app.user.hasPermission("GRPE")) {
                element.appendChild(mod);
            }

            groupList.appendChild(element);
        }

        let status                     = this.info.INVITE_ENABLED ? window.app.nls.views.admin.groupsAndUsers.sponsoring.status.enabled : window.app.nls.views.admin.groupsAndUsers.sponsoring.status.disabled;
        sponsoringLabel.innerHTML      = "<b>" + window.app.nls.views.admin.groupsAndUsers.sponsoring.title + "</b><br>" +
                                         "<br>" +
                                         window.app.nls.views.admin.groupsAndUsers.sponsoring.text + status + "</b>";
        sponsoring.innerHTML           = this.info.INVITE_ENABLED ? window.app.nls.views.admin.groupsAndUsers.sponsoring.button.disabled : window.app.nls.views.admin.groupsAndUsers.sponsoring.button.enabled;
        groupListTitle.innerHTML       = "<b>" + window.app.nls.views.admin.groupsAndUsers.groups.list.title + "</b>";
        userListTitle.innerHTML        = "<b>" + window.app.nls.views.admin.groupsAndUsers.users.list.title + "</b>";
        //godFather.setAttribute("onClick", godFather.checked = !godFather.checked);

        sponsoringSpan.appendChild(sponsoring);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(sponsoringLabel);
        this.ui.content.appendChild(sponsoringSpan);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(groupListTitle);
        this.ui.content.appendChild(groupList);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(userListTitle);
        this.ui.content.appendChild(userList);

        sponsoring.addEventListener("click", this._toggleInviteMode.bind(this));
    }


    /**
     * method : _requestLibrariesPage (private)
     * class  : AdminView
     * desc   : Display the libraries management page
     **/
    _requestLibrariesPage() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _requestLibrariesPage call');
        }

        if (!window.app.user.hasPermission("LIBR")) {
            return;
        }

        this.currentPage = this._requestLibrariesPage;
        this._clearPageSpace();
        this.ui.menuLib.className         = "mzk-selected";
        this.ui.contentTitle.innerHTML    = window.app.nls.views.admin.libraries.title;

        this.ui.rescanLibLabel            = document.createElement("P");
        this.ui.rescanLibButton           = document.createElement("BUTTON");
        this.ui.rmLibLabel                = document.createElement("P");
        this.ui.rmLibButton               = document.createElement("BUTTON");
        this.ui.libListLabel              = document.createElement("P");

        this.ui.rescanLibLabel.innerHTML  = "<b>" + window.app.nls.views.admin.libraries.rescanLibraries.title + "</b><br>" +
                                            "<br>" +
                                            window.app.nls.views.admin.libraries.rescanLibraries.text;
        this.ui.rescanLibButton.innerHTML = window.app.nls.views.admin.libraries.rescanLibraries.button;
        this.ui.rmLibLabel.innerHTML      = "<b>" + window.app.nls.views.admin.libraries.removeLibraries.title + "</b><br>" +
                                            "<br>" +
                                            window.app.nls.views.admin.libraries.removeLibraries.text;
        this.ui.rmLibButton.innerHTML     = window.app.nls.views.admin.libraries.removeLibraries.button;
        this.ui.libListLabel.innerHTML    = "<b>" + window.app.nls.views.admin.libraries.list.title + "</b>";

        let list                          = document.createElement("UL");

        let that = this;
        for (let i = 0; i < this.info.LIBRARIES.length; ++i) {
            let element                   = document.createElement("LI");
            let rm                        = document.createElement("IMG");
            rm.src                        = "/static/img/controls/trash.svg";
            let deletedID                 = that.info.LIBRARIES[i].ID;
            rm.addEventListener("click", function() {
                window.app.deletePlaylist(window.app.getPlaylistFromId(that.info.LIBRARIES[i].ID));
            });
            element.innerHTML             = "<b>" + this.info.LIBRARIES[i].NAME + "</b> - " + this.info.LIBRARIES[i].PATH + "<br>" +
                                            this.info.LIBRARIES[i].NUMBER_TRACK + " " + (this.info.LIBRARIES[i].NUMBER_TRACK  > 1 ? window.app.nls.utils.tracks : window.app.nls.utils.track) + " - " + secondsToTimecode(this.info.LIBRARIES[i].TOTAL_DURATION);

            element.appendChild(rm);
            list.appendChild(element);
        }

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.rescanLibLabel);
        this.ui.content.appendChild(this.ui.rescanLibButton);
        this.ui.content.appendChild(this.ui.rmLibLabel);
        this.ui.content.appendChild(this.ui.rmLibButton);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.libListLabel);
        this.ui.content.appendChild(list);

        this.ui.rescanLibButton.addEventListener("click", function() {
            that._requestRescanLibraries();
        });
        this.ui.rmLibButton.addEventListener("click", function() {
            that._requestDeleteLibraries();
        });
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Display the SyncThing management page
     **/
    _requestSCPage() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _requestSCPage call');
        }

        this.currentPage = this._requestSCPage;
        this._clearPageSpace();
        this.ui.menuSC.className       = "mzk-selected";
        this.ui.contentTitle.innerHTML = window.app.nls.views.admin.syncthing.title;

        this.ui.apiKeyLabel            = document.createElement("P");
        this.ui.apiKeyField            = document.createElement("INPUT");
        this.ui.apiKeyButton           = document.createElement("BUTTON");
        this.ui.bufferLabel            = document.createElement("P");
        this.ui.bufferField            = document.createElement("INPUT");
        this.ui.bufferButton           = document.createElement("BUTTON");
        this.ui.rescanLabel            = document.createElement("P");
        this.ui.rescanButton           = document.createElement("BUTTON");

        this.ui.apiKeyField.type       = "text";
        this.ui.apiKeyField.value      = this.info.SYNC_KEY;
        this.ui.apiKeyField.type       = "text";
        this.ui.bufferField.value      = this.info.BUFFER_PATH;
        this.ui.apiKeyLabel.innerHTML  = "<b>" + window.app.nls.views.admin.syncthing.apiKey.title + "</b><br>" +
                                         "<br>" +
                                         window.app.nls.views.admin.syncthing.apiKey.text;
        this.ui.apiKeyButton.innerHTML = window.app.nls.views.admin.syncthing.apiKey.button;
        this.ui.bufferLabel.innerHTML  = "<b>" + window.app.nls.views.admin.syncthing.bufferPath.title + "</b><br>" +
                                         "<br>" +
                                         window.app.nls.views.admin.syncthing.bufferPath.text;
        this.ui.bufferButton.innerHTML = window.app.nls.views.admin.syncthing.bufferPath.button;
        this.ui.rescanLabel.innerHTML  = "<b>" + window.app.nls.views.admin.syncthing.rescanFolders.title + "</b><br>" +
                                         "<br>" +
                                         window.app.nls.views.admin.syncthing.rescanFolders.text;
        this.ui.rescanButton.innerHTML = window.app.nls.views.admin.syncthing.rescanFolders.button;

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.apiKeyLabel);
        this.ui.content.appendChild(this.ui.apiKeyField);
        this.ui.content.appendChild(this.ui.apiKeyButton);
        this.ui.content.appendChild(this.ui.bufferLabel);
        this.ui.content.appendChild(this.ui.bufferField);
        this.ui.content.appendChild(this.ui.bufferButton);
        this.ui.content.appendChild(this.ui.rescanLabel);
        this.ui.content.appendChild(this.ui.rescanButton);

        let that = this;
        this.ui.apiKeyButton.addEventListener("click", this._submitAPIKey.bind(this));
        this.ui.bufferButton.addEventListener("click", this._submitBufferPath.bind(this));
        this.ui.rescanButton.addEventListener("click", this._rescanSC.bind(this));
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Display the SyncThing management page
     **/
    _requestWishPage() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _requestWishPage call');
        }

        this.currentPage = this._requestWishPage;
        this._clearPageSpace();
        this.ui.menuWish.className     = "mzk-selected";
        this.ui.contentTitle.innerHTML = window.app.nls.views.admin.wishes.title;

        let list                       = document.createElement("UL");

        let that = this;
        JSONParsedPostRequest(
            "wish/get/",
            JSON.stringify({
                ALL: true
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     RESULT: {
                 *         WISH_ID:
                 *         DATE:
                 *         TEXT:
                 *         USERNAME:
                 *         STATUS:
                 *     }
                 * } */
                if (response.DONE) {
                    if (window.debug && that.LOG) {
                        console.log('    AdminView : _requestWishPage server response');
                    }

                    for (let i = 0; i < response.RESULT.length; ++i) {
                        let element        = document.createElement("LI");
                        let accept         = document.createElement("IMG");
                        let refuse         = document.createElement("IMG");

                        element.className  = "mzk-wish-entry";
                        accept.className   = "mzk-accept";

                        element.innerHTML  = response.RESULT[i].USERNAME + ", " + response.RESULT[i].DATE + ":<br>" +
                                             "<b>" + response.RESULT[i].TEXT + "</b><br>";

                        switch (response.RESULT[i].STATUS) {
                            case 0:
                                accept.src = "/static/img/controls/accepted.svg";
                                refuse.src = "/static/img/controls/refused.svg";
                                break;
                            case 1:
                                accept.src = "/static/img/controls/accepted.svg";
                                refuse.src = "/static/img/controls/refused-true.svg";
                                break;
                            case 2:
                                accept.src = "/static/img/controls/accepted-true.svg";
                                refuse.src = "/static/img/controls/refused.svg";
                                break;
                        }

                        let self = that;
                        accept.addEventListener("click", function() {
                            self._updateWishStatus(response.RESULT[i].WISH_ID, 2, function() {
                                accept.src = "/static/img/controls/accepted-true.svg";
                                refuse.src = "/static/img/controls/refused.svg";
                            });
                        });
                        refuse.addEventListener("click", function() {
                            self._updateWishStatus(response.RESULT[i].WISH_ID, 1, function() {
                                accept.src = "/static/img/controls/accepted.svg";
                                refuse.src = "/static/img/controls/refused-true.svg";
                            });
                        });

                        element.appendChild(accept);
                        element.appendChild(refuse);
                        list.appendChild(element);
                    }

                    that.ui.content.appendChild(that.ui.contentTitle);
                    that.ui.content.appendChild(document.createElement("HR"));
                    that.ui.content.appendChild(list);
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Update the vote on a given wish
     **/
    _updateWishStatus(wishID, status, callback) {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _updayeWishStatus call');
        }

        let that = this;
        JSONParsedPostRequest(
            "wish/setStatus/",
            JSON.stringify({
                WISH_ID: wishID,
                STATUS:  status
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    AdminView : _updayeWishStatus server response');
                }

                if (response.DONE) {
                    if (callback) {
                        callback();
                    }

                    else {
                        that._requestWishPage();
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestDrop (private)
     * class  : AdminView
     * desc   : Send a drop db request to the server
     **/
    _requestDrop() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _requestDrop call');
        }

        // TODO : put modal on drop action to confirm ?
        let that = this;
        JSONParsedGetRequest(
            "admin/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    AdminView : _requestDrop server response');
                }

                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.dropButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _rescanSC (private)
     * class  : AdminView
     * desc   : Rescan syncthing folders
     **/
    _rescanSC() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _rescanSC call');
        }

        let that = this;
        JSONParsedGetRequest(
            "admin/syncthingRescan",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    AdminView : _rescanSC server response');
                }

                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.rescanButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _removeMoodbar (private)
     * class  : AdminView
     * desc   : Remove all moodbar from server
     **/
    _removeMoodbar() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _removeMoodbar call');
        }

        let that = this;
        JSONParsedGetRequest(
            "admin/removeAllMoods/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    AdminView : _removeMoodbar server response');
                }

                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.rmMoodButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _submitAPIKey (private)
     * class  : AdminView
     * desc   : Submit the SyncThing API key
     **/
    _submitAPIKey() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _submitAPIKey call');
        }

        let that = this;
        JSONParsedPostRequest(
            "admin/changeSyncthingAPIKey/",
            JSON.stringify({
                SYNC_KEY: this.ui.apiKeyField.value // TODO : Warning, value must be tested
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    AdminView : _submitAPIKey server response');
                }

                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.apiKeyButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _submitAPIKey (private)
     * class  : AdminView
     * desc   : Submit the SyncThing API key
     **/
    _submitBufferPath() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _submitBufferPath call');
        }

        let that = this;
        JSONParsedPostRequest(
            "admin/changeBufferPath/",
            JSON.stringify({
                BUFFER_PATH: this.ui.bufferField.value // TODO : Warning, value must be tested
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (window.debug && this.LOG) {
                    console.log('    AdminView : _submitBufferPath server response');
                }

                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.bufferButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _toggleInviteMode (private)
     * class  : AdminView
     * desc   : Toggle user sponsoring in app
     **/
    _toggleInviteMode() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _toggleInviteMode call');
        }

        let that = this;
        JSONParsedGetRequest(
            "admin/toggleInvite/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    AdminView : _toggleInviteMode call');
                }

                if (response.DONE) {
                    that._requestUsersPage();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _unselectAllMenuEntries (private)
     * class  : AdminView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        if (window.debug && this.LOG) {
            console.log('    AdminView : _unselectAllMenuEntries call');
        }

        this.ui.menuDB.className   = "";
        this.ui.menuUser.className = "";
        this.ui.menuLib.className  = "";
        this.ui.menuSC.className   = "";
        this.ui.menuWish.className = "";
    }

}

export default AdminView
