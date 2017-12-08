/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Track class - track object from db with all its metadata                           *
 *                                                                                     *
 *  track     : raw track incoming from db JSON                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let Track = function(track) {
    this.updateMetadata(track);
};


Track.prototype = {

    _getArtistsIDFromArtistsArray: function(artists) {
        if (artists === null || artists === undefined) {
            return "";
        }

        let artistsID = [];

        for (let i = 0; i < artists.length; ++i) {
            artistsID.push(artists[i].ID);
        }

        return artistsID;
    },


    _getArtistFromArtistsArray: function(artists) {
        if (artists === null || artists === undefined) {
            return "";
        }

        let artistsName = []; // Artists name array
        let artist = ""; // Output string

        for (let i = 0; i < artists.length; ++i) {
            artistsName.push(artists[i].NAME);
        }

        artistsName.sort(); // In order to get artists alphabetically ordered

        for (i = 0; i < artistsName.length; ++i) {
            artist += artistsName[i];

            if (i < (artistsName.length - 1)) { artist += ", "; }
        }

        return artist;
    },


    updateMetadata: function(track) {
        // Filling Track object
        this.id = {
            track:          track.ID ? track.ID : "",
            album:          track.ALBUM.ID ? track.ALBUM.ID : "",
            artists:        this._getArtistsIDFromArtistsArray(track.ARTISTS)
        };
        this.title        = track.TITLE             ? track.TITLE : "";
        this.year         = track.YEAR              ? track.YEAR : "";
        this.composer     = track.COMPOSER          ? track.COMPOSER : "";
        this.performer    = track.PERFORMER         ? track.PERFORMER : "";
        this.track        = track.TRACK_NUMBER      ? track.TRACK_NUMBER : "";
        this.trackTotal   = track.ALBUM.TOTAL_TRACK ? track.ALBUM.TOTAL_TRACK : "";
        this.disc         = track.DISC_NUMBER       ? track.DISC_NMBER : "";
        this.discTotal    = track.ALBUM.TOTAL_DISC  ? track.ALBUM.TOTAL_DISC : "";
        this.bpm          = track.BPM               ? track.BPM : "";
        this.lyrics       = track.LYRICS            ? track.LYRICS : "";
        this.comment      = track.COMMENT           ? track.COMMENT : "";
        this.bitRate      = track.BITRATE           ? track.BITRATE : "";
        this.sampleRate   = track.SAMPLERATE        ? track.SAMPLERATE : "";
        this.duration     = track.DURATION          ? track.DURATION : "";
        this.size         = track.SIZE              ? track.SIZE : "";
        this.lastModified = track.LAST_MODIFIED     ? track.LAST_MODIFIED : "";
        this.album        = track.ALBUM.TITLE       ? track.ALBUM.TITLE : "";
        this.genre        = track.GENRE             ? track.GENRE : "";
        this.fileType     = track.FILE_TYPE         ? track.FILE_TYPE : "";
        this.cover        = track.COVER             ? "../static/img/covers/" + track.COVER : "../static/img/utils/defaultcover.svg";
        this.artist       = this._getArtistFromArtistsArray(track.ARTISTS);
        this.albumArtist  = this._getArtistFromArtistsArray(track.ALBUM.ARTIST);
        console.log(this);

    }
};
