var Playlist = function() {
    this.ui = {
        name: null,
        path: null,
        convert: null,
        scan: null
    };

    this.tracks = null;
    this.init();
};

Playlist.prototype = {
    init: function() {
        this.newLibraryMenu();
    },

    testInput: function() {
        if (this.ui.name.value !== '' && this.ui.path.value !== '') {
            this.sendInfo()
        } else {
            var errorNotification = new Notification("User input error", "You must fill all the fields in order to create à new library.");
        }
    },

    sendInfo: function() {
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
                that.tracks = JSON.parse(this.responseText);
                that.getTracksArtistsAndAlbums();
            }
        };

        xmlhttp.open("POST", "ajax/getPlaylistTracks/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ID: id
        }));
    },

    getTracksArtistsAndAlbums: function() {
        var albumsID = [];
        var artistsID = [];

        for (var i = 0; i < this.tracks.length ;++i) {
            albumsID.push(this.tracks[i].fields.album);

            for (var j = 0; j < this.tracks[i].fields.artist.length ;++j) {
                artistsID.push(this.tracks[i].fields.artist[j]);
            }
        }

        console.log(albumsID);
        console.log(artistsID);

        var xmlhttp = new XMLHttpRequest();
        var cookies = getCookies();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                that.tracks = JSON.parse(this.responseText);
                that.getTracksArtistsAndAlbums();
            }
        };

        xmlhttp.open("POST", "ajax/getTracksArtistsAndAlbums/", true);
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ALBUMS: albumsID,
            ARTISTS: artistsID
        }));


    },

    newLibraryMenu: function() {
        var xmlhttp = new XMLHttpRequest();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("mainContainer").insertAdjacentHTML('beforeend', this.responseText);
                that.ui.name = document.getElementById("name");
                that.ui.path = document.getElementById("path");
                that.ui.convert = document.getElementById("convert");
                that.ui.scan = document.getElementById("buttonScan");
                that.ui.scan.addEventListener("click", that.testInput.bind(that));
            }
        };

        xmlhttp.open("GET", "components/newLibrary", true);
        xmlhttp.send();
    }
};
