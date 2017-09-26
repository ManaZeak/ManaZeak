var createLibrary = function() {
    this.ui = {
        title: null,
        input: null,
        scan: null
    };

    this.init();
};

createLibrary.prototype = {
    init: function() {
        this.createLibrary = document.createElement("div");
        this.createLibrary.id = "createLibrary";

        this.ui.title = document.createElement("h1");
        this.ui.title.innerHTML = "New library";

        this.ui.input = document.createElement("input");
        this.ui.input.id = "path";
        this.ui.input.type = "text";
        this.ui.input.placeholder = "Enter the path to your library";

        this.ui.scan = document.createElement("button");
        this.ui.scan.id = "buttonScan";
        this.ui.scan.innerHTML = "Scan";

        this.createLibrary.appendChild(this.ui.title);
        this.createLibrary.appendChild(this.ui.input);
        this.createLibrary.appendChild(this.ui.scan);

        document.getElementById("mainContainer").appendChild(this.createLibrary);

        this.ui.scan.addEventListener("click", this.testInput.bind(this));
    },

    testInput: function() {
        // TODO : test user input to avoid problems
        this.scanLibrary()
    },

    scanLibrary: function() {
        var cookies = {};

        if (document.cookie && document.cookie !== '') {
            document.cookie.split(';').forEach(function (c) {
                var m = c.trim().match(/(\w+)=(.*)/);
                if (m !== undefined) {
                    cookies[m[1]] = decodeURIComponent(m[2]);
                }
            });
        }

        var xmlhttp = new XMLHttpRequest();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { // Sending path given by user
                console.log(JSON.parse(this.responseText));
            }
        };

        xmlhttp.open("POST", "ajax/rescan", true); // TODO : replace /rescan by corresponding trigger
        xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({name:"John Rambo", time:"2pm"}));
    }
};
