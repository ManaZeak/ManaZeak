var Library = function(isFirstLibrary, cookies, tracks) {
    this.ui = {
        infoLabel: null,
        name:      null,
        path:      null,
        convert:   null,
        scan:      null
    };

    this.isFirstLibrary = isFirstLibrary;
    this.cookies = cookies;

    this.scanModal = null;

    if (typeof tracks === 'undefined') {
        this.rawTracks = [];
    } else {
        this.rawTracks = tracks;
    }
    this.tracks = [];

    this.init();
};

Library.prototype = {

    init: function() {
        if (this.isFirstLibrary) {
            this._newLibrary();
        }

        else {
            this._loadLibrary();
        }

    },

    _loadLibrary: function() {
        this.fillTracks(this.rawTracks);
    },


    _newLibrary: function() {
        var that = this;

        fetchComponentUI("components/newLibrary", function(response) {
            document.getElementById("mainContainer").insertAdjacentHTML('beforeend', response);

            that.ui.infoLabel   = document.getElementById("infoLabel");
            that.ui.name        = document.getElementById("name");
            that.ui.path        = document.getElementById("path");
            that.ui.convert     = document.getElementById("convert");
            that.ui.scan        = document.getElementById("scan");

            if (that.isFirstLibrary) { // TODO : Typography style to set
                that.ui.infoLabel.innerHTML = "Welcome! Fill the path with your library's one, name it and let the magic begin!" +
                    "<br><br>Some additionnal features are waiting for you if your library is synced with other devices, using " +
                    "<a href=\"http://syncthing.net\" target=\"_blank\">SyncThing</a>.<br><br>Check out the " +
                    "<a href=\"https://github.com/Squadella/ManaZeak\" target=\"_blank\">read me</a> to know more about it.";
            } else {
                that.ui.infoLabel.innerHTML = "Welcome! Fill the path with your library's one, name it and let the magic begin!\n";
            }

            that.ui.scan.addEventListener("click", that._checkInputs.bind(that));
        });
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
        var xmlhttp = new XMLHttpRequest();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path, name given by user
                var parsedJSON = JSON.parse(this.responseText);

                if (parsedJSON.DONE === "FAIL") {
                    new Notification("Error in path field.", parsedJSON.ERROR);
                } else {
                    that.scanModal = new Modal(); // TODO : send parameters
                    that.scanLibrary(parsedJSON.ID); // Library ID
                }
            }
        };

        xmlhttp.open("POST", "ajax/newLibrary/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', this.cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            NAME: this.ui.name.value,
            URL:  this.ui.path.value
        }));
    },


    scanLibrary: function(id) {
        var xmlhttp = new XMLHttpRequest();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending convert flag given by user and associated playlist's ID
                var parsedJSON = JSON.parse(this.responseText);

                if (parsedJSON.DONE === "FAIL") {
                    new Notification("Scan error.", parsedJSON.FAILS.length + " files haven't been scanned."); // TODO : put href to view more (file list for ex)
                } else {
                    that.scanModal.close();
                    that.getTracksFromServer(parsedJSON.ID);
                }
            }
        };

        xmlhttp.open("POST", "ajax/rescan/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', this.cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ID:      id,
            CONVERT: this.ui.convert.checked
        }));
    },


    getTracksFromServer: function(id) {
        var xmlhttp = new XMLHttpRequest();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                that.rawTracks = JSON.parse(this.responseText);
                that.fillTracks(that.rawTracks);
            }
        };

        xmlhttp.open("POST", "ajax/getPlaylistTracks/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', this.cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ID: id
        }));
    },


    fillTracks: function(tracks) {
        for (var i = 0; i < tracks.length ;++i) {
           this.tracks.push(new Track(tracks[i]));
        }

        if (this.isFirstLibrary) {
            document.getElementById("mainContainer").removeChild(document.getElementById("newLibrary"));
        }
        
        var tmp = new ListView(this.tracks);
    }
};
