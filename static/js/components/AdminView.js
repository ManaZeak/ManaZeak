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
            container: document.createElement("DIV"),
            dropLabel: document.createElement("P"),
            dropButton: document.createElement("BUTTON")
        };

        this.ui.container.id = "admin";

        this.ui.dropLabel.innerHTML = "Drop the database";
        this.ui.dropButton.innerHTML = "DROP";

        this.ui.container.appendChild(this.ui.dropLabel);
        this.ui.container.appendChild(this.ui.dropButton);

        container.appendChild(this.ui.container);
    }
};
