/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  TopBar class - handle the topbar (moodbar & user account)                          *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var TopBar = function(cookies) {
    this.moodbar = document.getElementById("moodbar");
    this.cookies = cookies;

    this.init();
};


TopBar.prototype = {

    init: function() {
        // TODO : set default moodbar (nothing)
    },


    changeMoodbar: function(id) {
        var that = this;

        renderMoodFile("../../mood/test.mood", that.moodbar);
/*
        JSONParsedPostRequest( // Loading playlists
            "ajax/getMoodbarFromID/",
            this.cookies,
            JSON.stringify({
                ID: id
            }),
            function(response) {
                renderMoodFile(response.FILE, that.moodbar);
            }
        );
*/
    }
};
