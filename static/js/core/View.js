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
        this.container.className = "mzk-view";
        this.container.innerHTML = "";
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getContainer (public)
     * class  : View
     * desc   : Returns the HTML of the view
     * return : {object} - The view container
     **/
    getContainer() {
        return this.container;
    }


    /**
     * method : getDataFromPlaylist (public)
     * class  : View
     * desc   : Get data from playlist
     * arg    : {object} playlist - The playlist to get data from
     **/
    getDataFromPlaylist(playlist) {
        return null;
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _init (private)
     * class  : View
     * desc   : Init view
     * arg    : {object} data - Data to pass in view
     **/
    _init(data) {

    }

}

export default View