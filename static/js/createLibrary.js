var createLibrary = function() {
    this.ui = {
        title: null,
        input: {
            name: null,
            path: null
        },
        scan: null
    };

    this.init();
};

createLibrary.prototype = {
    init: function() {
        var br = document.createElement('br');

        this.createLibrary = document.createElement("div");
        this.createLibrary.id = "createLibrary";

        this.ui.title = document.createElement("h1");
        this.ui.title.innerHTML = "New library";

        this.ui.input.name = document.createElement("input");
        this.ui.input.name.id = "name";
        this.ui.input.name.type = "text";
        this.ui.input.name.placeholder = "Enter the name of the library here";

        this.ui.input.path = document.createElement("input");
        this.ui.input.path.id = "path";
        this.ui.input.path.type = "text";
        this.ui.input.path.placeholder = "Enter the path to your library";

        this.ui.scan = document.createElement("button");
        this.ui.scan.id = "buttonScan";
        this.ui.scan.innerHTML = "Scan";

        this.createLibrary.appendChild(this.ui.title);
        this.createLibrary.appendChild(this.ui.input.name);
        this.createLibrary.appendChild(br);
        this.createLibrary.appendChild(this.ui.input.path);
        this.createLibrary.appendChild(this.ui.scan);

        document.getElementById("mainContainer").appendChild(this.createLibrary);

        this.ui.scan.addEventListener("click", this.testInput.bind(this));
    },

    testInput: function() {
        if (this.ui.input.name.value !== '' && this.ui.input.path.value !== '') {
            console.log(this.ui.input.name.value);
            console.log(this.ui.input.path.value);
            this.sendInfo()
        } else {
            var errorNotification = new Notification("User input error", "You must fill all the fields in order to create à new library.");
        }
    },

    sendInfo: function() {
        var xmlhttp = new XMLHttpRequest();
        var cookies = this.parseCookies();
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
            NAME: this.ui.input.name.value,
            URL: this.ui.input.path.value
        }));
    },

    scanLibrary: function(id) {
        var xmlhttp = new XMLHttpRequest();
        var cookies = this.parseCookies();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                console.log(JSON.parse(this.responseText));
            }
        };

        xmlhttp.open("POST", "ajax/rescan/", true); // TODO : replace /rescan by corresponding trigger
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            ID: id
        }));
    },

    parseCookies: function() { // TODO : put this in Utils
        var cookies = {};

        if (document.cookie && document.cookie !== '') {
            document.cookie.split(';').forEach(function (c) {
                var m = c.trim().match(/(\w+)=(.*)/);
                if (m !== undefined) {
                    cookies[m[1]] = decodeURIComponent(m[2]);
                }
            });
        }

        return cookies;
    }
};
