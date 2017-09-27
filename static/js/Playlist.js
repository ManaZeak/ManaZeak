var Playlist = function() {
    this.ui = {
        name: null,
        path: null,
        convert: null,
        scan: null
    };

    this.rawTtracks = null;
    this.init();
};

Playlist.prototype = {
    init: function() {
        var that = this;

        fetchComponentUI("components/newLibrary", function(response) {
            document.getElementById("mainContainer").insertAdjacentHTML('beforeend', response);

            that.ui.name    = document.getElementById("name");
            that.ui.path    = document.getElementById("path");
            that.ui.convert = document.getElementById("convert");
            that.ui.scan    = document.getElementById("buttonScan");

            that.ui.scan.addEventListener("click", that.testInput.bind(that));
        });
    },

    testInput: function() {
        if (this.ui.name.value !== '' && this.ui.path.value !== '') {
            this.setLibraryPath()
        } else {
            new Notification("User input error", "You must fill all the fields in order to create à new library.");
        }
    },

    setLibraryPath: function() {
        var xmlhttp = new XMLHttpRequest();
        var cookies = getCookies();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                // TODO : check response
                var parsedJSON = JSON.parse(this.responseText);
                console.log(parsedJSON.ID);
                that.scanLibrary(parsedJSON.ID); // Library ID
            }
        };

        xmlhttp.open("POST", "ajax/setLibraryPath/", true); // TODO : replace /rescan by corresponding trigger
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            NAME: this.ui.name.value,
            URL: this.ui.path.value
        }));
    },

    scanLibrary: function(id) {
        var xmlhttp = new XMLHttpRequest();
        var cookies = getCookies();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                // TODO : handle incoming errors if scan didn't worked
                that.getPlaylistTracks(JSON.parse(this.responseText).ID);
            }
        };

        xmlhttp.open("POST", "ajax/rescan/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ID: id,
            CONVERT: this.ui.convert.checked
        }));
    },

    getPlaylistTracks: function(id) {
        var xmlhttp = new XMLHttpRequest();
        var cookies = getCookies();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                that.rawTracks = JSON.parse(this.responseText);
                that.getTracksArtists();
            }
        };

        xmlhttp.open("POST", "ajax/getPlaylistTracks/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ID: id
        }));
    },

    getTracksArtists: function() {
        var artistsID = [];

        for (var i = 0; i < this.rawTracks.length ;++i) {
            for (var j = 0; j < this.rawTracks[i].fields.artist.length ;++j) {
                artistsID.push(this.rawTracks[i].fields.artist[j]);
            }
        }

        var xmlhttp = new XMLHttpRequest();
        var cookies = getCookies();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                var tmp = JSON.parse(this.responseText);

                console.log(that.rawTracks);
/*
                for (var i = 0; i < tmp.length ; ++i) {
                    for (var j = 0; j < that.rawTracks.length ;++j) {
                        if (tmp[i].pk === that.rawTracks[j].fields.artist[0]) {
                            console.log(i + " " + j + " Found");
                        }
                    }
                } */
            }
        };

        xmlhttp.open("POST", "ajax/getTracksArtists/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ARTISTS: artistsID
        }));
    },

    getTracksAlbums: function() {
        var albumsID = [];

        for (var i = 0; i < this.rawTracks.length ;++i) {
            albumsID.push(this.rawTracks[i].fields.album);
        }

        var xmlhttp = new XMLHttpRequest();
        var cookies = getCookies();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                console.log(this.responseText);
            }
        };

        xmlhttp.open("POST", "ajax/getTracksAlbums/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ALBUMS: albumsID
        }));
    }
};
