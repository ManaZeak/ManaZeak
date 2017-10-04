/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Modal = function(type) {

    switch (type) {
        case "newLibrary":
            this.open("utils/newLibraryModal");
            break;
        case "editMetadata":
            break;
        default:
            new Notification("Can not open modal", "The given modal type doesn't exists");
            break;
    }
};


Modal.prototype = {

    open: function(url) {
        JSONParsedGetRequest(
            url,
            true,
            function(response) {
               document.body.insertAdjacentHTML('beforeend', response);
            }
        );
    },

    close: function() {
        document.body.removeChild(document.getElementById("modal"));
    }
};
