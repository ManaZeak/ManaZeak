var Database = function() {
    this.ui = {
        scan: {
            button: document.getElementById("buttonScan")
        }
    };

    this.init();
};

Database.prototype = {
    init: function() {
        this.ui.scan.button.addEventListener("click", this.tmp.bind(this));
    },

    tmp: function() {
        var xmlhttp = new XMLHttpRequest();
        //var url = "../ajax/rescan";
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var myArr = JSON.parse(this.responseText);
                console.log(myArr);
                that.myFunction(myArr);
            }
        };
        xmlhttp.open("GET", "../ajax/rescan", true);
        xmlhttp.send();
    },

    myFunction: function(arr) {
        var out = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            out += '<a href="' + arr[i].url + '">' +
            arr[i].display + '</a><br>';
        }
        document.getElementById("id01").innerHTML = out;
    }
};
