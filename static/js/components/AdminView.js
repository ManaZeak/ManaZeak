/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let AdminView = function() {
    View.call(this, null);
    this._createUI();
};


AdminView.prototype = {

    _createUI: function() {
        this.ui = {
            container: this.container
        };

        this.ui.container.id = "admin";

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

                    that.ui.dropButton.addEventListener("click", that._requestDrop.bind(that));

                } else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                    window.app.refreshUI();
                }
            }
        );
    },


    _requestDrop: function() {
        JSONParsedGetRequest(
            "ajax/ZNCcuoa8kJL8z6xgNZKnW(mMfahHf9j6w6Fi3HFc",
            function(response) {
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },

};

extendClass(View, AdminView);