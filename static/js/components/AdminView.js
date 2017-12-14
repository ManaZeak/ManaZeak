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
    }
};
