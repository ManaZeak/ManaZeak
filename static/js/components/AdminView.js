/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let AdminView = function(container) {
    this._createUI(container);
};


AdminView.prototype = {

    _createUI: function(container) {
        this.ui = {
            container: document.createElement("DIV")
        };

        this.ui.container.id = "admin";

        container.appendChild(this.ui.container);

        let that = this;
        JSONParsedGetRequest(
            "ajax/getAdminView/",
            function(response) {
                if (response.DONE) {
                    that.ui.dropLabel = document.createElement("P");
                    that.ui.dropButton = document.createElement("BUTTON");

                    that.ui.dropLabel.innerHTML = "Drop the database";
                    that.ui.dropButton.innerHTML = "DROP";

                    that.ui.container.appendChild(that.ui.dropLabel);
                    that.ui.container.appendChild(that.ui.dropButton);

                    that._eventListener();
                } else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                    window.app.refreshUI();
                }
            }
        );
    },


    _requestDrop: function() {
        JSONParsedPostRequest(
            "ajax/ZNCcuoa8kJL8z6xgNZKnW(mMfahHf9j6w6Fi3HFc",
            null,
            function(response) {
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    _eventListener: function() {
        this.ui.dropButton.addEventListener("click", this._requestDrop.bind(this));
    }
};
