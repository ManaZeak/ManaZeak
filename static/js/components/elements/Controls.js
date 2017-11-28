/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Controls class - handle the playlist info container (right/footbar)                *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Controls = function(container) {
    // UI
    this.container = document.createElement("DIV");

    this.ui = {
        play: {
            button: document.createElement("A"),
            image:  document.createElement("IMG")
        },
        stop: {
            button: document.createElement("A"),
            image:  document.createElement("IMG")
        },
        repeat: {
            button: document.createElement("A"),
            image:  document.createElement("IMG")
        },
        shuffle: {
            button: document.createElement("A"),
            image:  document.createElement("IMG")
        },
        next: {
            button: document.createElement("A"),
            image:  document.createElement("IMG")
        },
        previous: {
            button: document.createElement("A"),
            image:  document.createElement("IMG")
        },
        queueExpander: {
            button: document.createElement("DIV"),
            image:  document.createElement("IMG")
        }
    };

    // TODO : queue content to put in

    this.container.id = "half";

    this.ui.play.button.id = "buttonPlay";
    this.ui.play.image.id = "imagePlay";
    this.ui.stop.button.id = "buttonStop";
    this.ui.stop.image.id = "imageStop";
    this.ui.repeat.button.id = "buttonRepeat";
    this.ui.repeat.image.id = "imageRepeat";
    this.ui.shuffle.button.id = "buttonShuffle";
    this.ui.shuffle.image.id = "imageShuffle";
    this.ui.next.button.id = "buttonNext";
    this.ui.next.image.id = "imageNext";
    this.ui.previous.button.id = "buttonPrevious";
    this.ui.previous.image.id = "imagePrevious";
    this.ui.queueExpander.button.id = "queueExpander";
    this.ui.queueExpander.image.id = "imageQueueExpander";

    this.ui.play.image.src = "/static/img/player/play.svg";
    this.ui.stop.image.src = "/static/img/player/stop.svg";
    this.ui.repeat.image.src = "/static/img/player/repeat.svg";
    this.ui.shuffle.image.src = "/static/img/player/shuffle.svg";
    this.ui.next.image.src = "/static/img/player/next.svg";
    this.ui.previous.image.src = "/static/img/player/previous.svg";
    this.ui.queueExpander.image.src = "/static/img/player/menu.svg";

    this.ui.repeat.button.appendChild(this.ui.repeat.image);
    this.container.appendChild(this.ui.repeat.button);
    this.ui.shuffle.button.appendChild(this.ui.shuffle.image);
    this.container.appendChild(this.ui.shuffle.button);
    this.ui.previous.button.appendChild(this.ui.previous.image);
    this.container.appendChild(this.ui.previous.button);
    this.ui.play.button.appendChild(this.ui.play.image);
    this.container.appendChild(this.ui.play.button);
    this.ui.stop.button.appendChild(this.ui.stop.image);
    this.container.appendChild(this.ui.stop.button);
    this.ui.next.button.appendChild(this.ui.next.image);
    this.container.appendChild(this.ui.next.button);
    this.ui.queueExpander.button.appendChild(this.ui.queueExpander.image);
    this.container.appendChild(this.ui.queueExpander.button);

    this.volumeBar   = new VolumeBar(this.container);
    container.appendChild(this.container);

    this._eventListener();
};


Controls.prototype = {

    setPlayPause: function() {
        if(window.app.player.getIsPlaying() === true)
            this.ui.play.image.src = "/static/img/player/pause.svg";
        else
            this.ui.play.image.src = "/static/img/player/play.svg";
    },


    _eventListener: function() {
        var that = this;
        // Button event listeners
        this.ui.play.button.addEventListener("click", window.app.togglePlay.bind(window.app));
        this.ui.stop.button.addEventListener("click", window.app.stopPlayback.bind(window.app));

        window.app.addListener(['togglePlay', 'stopPlayback'], this.setPlayPause.bind(this));
        window.app.addListener(['adjustVolume'], function() {

        });

        this.ui.shuffle.button.addEventListener("click", window.app.toggleShuffle.bind(window.app));
        this.ui.repeat.button.addEventListener("click", window.app.toggleRepeat.bind(window.app));
        this.ui.next.button.addEventListener("click", window.app.next.bind(window.app));
        this.ui.previous.button.addEventListener("click", window.app.previous.bind(window.app));
        //this.ui.queueExpander.button.addEventListener("click", this.toggleQueue.bind(this));
    }
};
