/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Playlist class - Allow multiple tracks manipulation                                *
 *                                                                                     *
 *  id         : integer      - the playlist ID in db                                  *
 *  newLibrary : boolean      - true means user wants to create a new library,         *
 *                              false means that user wants to load existing playlist  *
 *  cookies    : DOM Obj      - user cookies                                           *
 *  tracks     : Array[Track] - Playlist tracks                                        *
 *  callback   : function     - function to call after _fillTrack on newLibrary        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Playlist = function(id, name, newLibrary, load, cookies, tracks, callback) {

    // NewLibrary relative attributes, useless if newLibrary = false
    this.ui = {
        infoLabel: null,
        name:      null,
        path:      null,
        convert:   null,
        scan:      null
    };
    this.scanModal = null;


    // Playlist internal attributes
    this.name = name;
    this.load = load;
    this.tracks = [];
    this.isLibrary = false;


    // Filling Playlist object
    this.id = id;
    this.newLibrary = newLibrary;
    this.cookies = cookies;

    if (typeof tracks !== 'undefined') {
        this.rawTracks = tracks;
    } else {
        this.rawTracks = [];
    }

    if (typeof callback !== 'undefined') {
        this.callback = callback;
    } else {
        this.callback = null;
    }
    // Set interval for _scan function
    this.refreshIntervalId = -1;



    this._init(); // Playlist initialization
};


Playlist.prototype = {

    _init: function() {
        if (this.load) { this._loadLibrary(); } // Library creation process
        else { this._newLibrary(); }            // Library loading process
    },


    _newLibrary: function() {
        this.isLibrary = true;
        var that = this;

        JSONParsedGetRequest(
            "components/newLibrary",
            true,
            function(response) {
                document.getElementById("mainContainer").insertAdjacentHTML('beforeend', response);

                that.ui.infoLabel   = document.getElementById("infoLabel");
                that.ui.name        = document.getElementById("name");
                that.ui.path        = document.getElementById("path");
                that.ui.convert     = document.getElementById("convert");
                that.ui.scan        = document.getElementById("scan");

                console.log(that.newLibrary);

                if (that.newLibrary) { // TODO : Typography style to set - Replace newLibrary bool by radiobox (must disapear in the end)
                    console.log("Here");
                    that.ui.infoLabel.innerHTML = "Welcome! Fill the path with your library's one, name it and let the magic begin!" +
                        "<br><br>Some additionnal features are waiting for you if your library is synced with other devices, using " +
                        "<a href=\"http://syncthing.net\" target=\"_blank\">SyncThing</a>.<br><br>Check out the " +
                        "<a href=\"https://github.com/Squadella/ManaZeak\" target=\"_blank\">read me</a> to know more about it.";
                } else {
                    console.log("There");
                    that.ui.infoLabel.innerHTML = "Welcome! Fill the path with your library's one, name it and let the magic begin!\n";
                    // TODO : remove path input depending on radioBox
                }

                that.ui.scan.addEventListener("click", that._checkInputs.bind(that));
            }
        );
    },


    _loadLibrary: function() {
        this._fillTracks(this.rawTracks);
    },


    _checkInputs: function() {
        if (this.ui.name.value !== '' && this.ui.path.value !== '') {
            this._requestNewLibrary();
        } else {
            if (this.ui.name.value !== '') {
                this.ui.path.style.border = "solid 1px red";
                new Notification("Path field is empty.", "You must specify the path of your library.");
            } else if (this.ui.path.value !== '') {
                this.ui.name.style.border = "solid 1px red";
                new Notification("Name field is empty.", "You must give your library a name.");
            } else {
                this.ui.path.style.border = "solid 1px red";
                this.ui.name.style.border = "solid 1px red";
                new Notification("Both fields are empty.", "You must fill both fields to create a new library.");
            }
        }
    },


    _requestNewLibrary: function() {
        var that = this;

        JSONParsedPostRequest(
            "ajax/newLibrary/",
            this.cookies,
            JSON.stringify({
                NAME: this.ui.name.value,
                URL:  this.ui.path.value
            }),
            function(response) {
                if (response.DONE === "FAIL") {
                    new Notification("Error in path field.", response.ERROR);
                } else {
                    that.name = that.ui.name.value;
                    that.scanModal = new Modal("scanLibrary"); // TODO : send parameters (todo when modal class is bigger)
                    that.scanModal.open();
                    that.id = response.ID;
                    that._scanLibrary(response.ID);
                }
            }
        );
    },


    _scanLibrary: function(id) {
        var that = this;

        this.refreshIntervalId = setInterval(function() {
            that._scanLibrary_aux();
        }, 5000); // every 5s
    },


    _scanLibrary_aux: function() {
        var that = this;
        console.log("Scanning library -- in progress");

        JSONParsedPostRequest(
            "ajax/checkLibraryScan/",
            this.cookies,
            JSON.stringify({
                ID:      id
            }),
            function(response) {
                if (response.DONE === "FAIL") {
                    new Notification("Scan error.", response.FAILS.length + " files haven't been scanned.");
                } else {
                    var self = that;

                    JSONParsedPostRequest(
                        "ajax/rescan/",
                        that.cookies,
                        JSON.stringify({
                            ID:      id,
                            CONVERT: that.ui.convert.checked
                        }),
                        function(response) {
                            if (response.DONE === "FAIL") {
                                 // TODO : put href to view more (file list for ex)
                                new Notification("Scan error.", response.FAILS.length + " files haven't been scanned.");
                            } else {
                                console.log("Scanning library -- done");
                                self._getTracksFromServer(response.ID);
                            }
                        }
                    );
                }
            }
        );
    },



    _getTracksFromServer: function(id) {
        var that = this;
        console.log("Tracks received from server -- in progress");

        JSONParsedPostRequest(
            "ajax/getSimplifiedTracks/",
            this.cookies,
            JSON.stringify({
                ID: id,
                SAVE: true
            }),
            function(response) {
                console.log("Tracks received from server -- done");
                that.rawTracks = response;
                that.scanModal.close();
                that._fillTracks(that.rawTracks);
            }
        );
    },


    _fillTracks: function(tracks) {
        for (var i = 0; i < tracks.length ;++i) {
            this.tracks.push(new Track(tracks[i]));
        }

        if (this.newLibrary) {
            document.getElementById("mainContainer").removeChild(document.getElementById("newLibrary"));
            this.callback();
        }
    },


    // Class Getters and Setters
    getTracks: function()     { return this.tracks; },
    getName: function()       { return this.name;   },

    setName: function(name)   { this.name = name;   }
};
