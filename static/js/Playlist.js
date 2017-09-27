var Playlist = function() {
    this.ui = {
        title: null,
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
        var br = document.createElement('br');

        this.createLibrary = document.createElement("div");
        this.createLibrary.id = "createLibrary";

        this.ui.title = document.createElement("h1");
        this.ui.title.innerHTML = "New library";

        this.ui.name = document.createElement("input");
        this.ui.name.id = "name";
        this.ui.name.type = "text";
        this.ui.name.placeholder = "Enter the name of the library here";

        this.ui.path = document.createElement("input");
        this.ui.path.id = "path";
        this.ui.path.type = "text";
        this.ui.path.placeholder = "Enter the path to your library";

        this.ui.convert = document.createElement("input");
        this.ui.convert.id = "convert";
        this.ui.convert.type = "checkbox";

        this.ui.scan = document.createElement("button");
        this.ui.scan.id = "buttonScan";
        this.ui.scan.innerHTML = "Scan";

        this.createLibrary.appendChild(this.ui.title);
        this.createLibrary.appendChild(this.ui.name);
        this.createLibrary.appendChild(br);
        this.createLibrary.appendChild(this.ui.path);
        this.createLibrary.appendChild(this.ui.convert);
        this.createLibrary.appendChild(this.ui.scan);

        document.getElementById("mainContainer").appendChild(this.createLibrary);

        this.ui.scan.addEventListener("click", this.testInput.bind(this));
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
                that.scanLibrary(parsedJSON.ID);
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
                console.log(JSON.parse(this.responseText));
                // TODO : handle incoming errors if scan didn't worked
                that.getPlaylistTracks(id);
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


    }
};

/* Get a template ready to add in document

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.responseText);
            }
        };
        xhr.open('GET', '/app/templates/db.html');
        xhr.send();

*/