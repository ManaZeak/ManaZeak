/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let Stats = function(container) {
    this._createUI(container);
    this._fetchStats();
};


Stats.prototype = {

    _createUI: function(container) {
        this.ui = {
            container: document.createElement("DIV")
        };

        this.ui.container.id = "stats";

        container.appendChild(this.ui.container);
    },


    _fetchStats: function() {
        JSONParsedPostRequest(
            "ajax/getUserStats/",
            false,
            function(response) {
                console.log(response);
            }
        );
    }
};
