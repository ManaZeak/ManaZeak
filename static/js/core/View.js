/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  View class                             *
 *                                         *
 *  Parent class for every view displayed  *
 *  in mainContainer                       *
 *                                         *
 *  data : {object} data                   *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class View {
    constructor() {

        this.container           = document.createElement("DIV");
        this.container.innerHTML = "";
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getDataFromPlaylist (public)
     * class  : Viewa
     * desc   : Get data from playlist
     * arg    : {object} playlist - The playlist to get data from
     **/
    getDataFromPlaylist(playlist) {
        return null;
    }


    /**
     * method : getContainer (public)
     * class  : View
     * desc   : Returns the HTML of the view
     * return : {object} - The view container
     **/
    getContainer() {
        return this.container;
    }


    _init(data) {

    }

}
