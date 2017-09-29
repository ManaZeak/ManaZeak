var Track = function(track) {
    this.uiTrack = null;
    this.isSelected = false;

    this.id = {
        track: track.ID,
        album: track.ALBUM.ID,
        artists: this.getArtistsIDFromArtistsArray(track.ARTISTS)
    };

    this.title        = track.TITLE;
    this.year         = track.YEAR;
    this.composer     = track.COMPOSER;
    this.perfomer     = track.PERFOMER;
    this.track        = track.TRACK_NUMBER;
    this.trackTotal   = track.ALBUM.TOTAL_TRACK;
    this.disc         = track.DISC_NUMBER;
    this.discTotal    = track.ALBUM.TOTAL_DISC;
    this.bpm          = track.BPM;
    this.lyrics       = track.LYRICS;
    this.comment      = track.COMMENT;
    this.bitRate      = track.BITRATE;
    this.sampleRate   = track.SAMPLERATE;
    this.duration     = track.DURATION;
    this.size         = track.SIZE;
    this.lastModified = track.LAST_MODIFIED;
    this.artist       = this.getArtistFromArtistsArray(track.ARTISTS);
    this.album        = track.ALBUM.TITLE;
    this.genre        = track.GENRE;
    this.fileType     = track.FILE_TYPE;
};

Track.prototype = {

    getArtistsIDFromArtistsArray: function(artists) {
        var artistsID = [];

        for (var i = 0; i < artists.length ;++i) {
            artistsID.push(artists[i].ID);
        }

        return artistsID;
    },


    getArtistFromArtistsArray: function(artists) {
        var artistsName = []; // Artists name array
        var artist = ""; // Output string

        for (var i = 0; i < artists.length ;++i) {
            artistsName.push(artists[i].NAME);
        }

        artistsName.sort();

        for (i = 0; i < artistsName.length ;++i) {
            artist += artistsName[i];

            if (i < (artistsName.length - 1)) { artist += ", "; }
        }

        return artist;
    },


    createListViewEntry: function(listView) {
        this.uiTrack = document.createElement("div");
        this.uiTrack.className = "trackContainer";

        var title    = document.createElement("div");
        var artist   = document.createElement("div");
        var composer = document.createElement("div");
        var album    = document.createElement("div");
        var genre    = document.createElement("div");
        var year     = document.createElement("div");

        title.className    = "title";
        artist.className   = "artist";
        composer.className = "composer";
        album.className    = "album";
        genre.className     = "genre";
        year.className     = "year";

        title.innerHTML    = this.title;
        artist.innerHTML   = this.artist;
        composer.innerHTML = this.composer;
        album.innerHTML    = this.album;
        genre.innerHTML    = this.genre;
        year.innerHTML     = this.year;

        this.uiTrack.appendChild(title);
        this.uiTrack.appendChild(artist);
        this.uiTrack.appendChild(composer);
        this.uiTrack.appendChild(album);
        this.uiTrack.appendChild(genre);
        this.uiTrack.appendChild(year);

        this.uiTrack.addEventListener("dblclick", this.toggleSelected.bind(this));

        listView.appendChild(this.uiTrack);
    },

    toggleSelected: function() {
        if (this.isSelected) {
            this.isSelected = !this.isSelected;
            this.uiTrack.style.background = "none";
        } else {
            this.isSelected = !this.isSelected;
            this.uiTrack.style.background = "red";
        }
    }
};
