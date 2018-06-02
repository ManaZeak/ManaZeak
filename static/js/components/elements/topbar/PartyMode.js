/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  PartyMode class                                *
 *                                                 *
 *  Handle the firring of the PartyView in TopBar  *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class PartyMode {

    constructor(container) {
        this.LOG = true; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('      PartyMode construction');
        }

        this._createUI(container);
        this._eventListener();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : PartyMode
     * desc   : Build UI elements
     * arg    : {object} container - The PartyMode container
     **/
    _createUI(container) {
        if (window.debug && this.LOG) {
            console.log('      PartyMode : _createUI call');
        }

        this.ui = {
            container: document.createElement("DIV"),
            img:       document.createElement("IMG")
        };

        this.ui.container.className = "mzk-party-mode-button";
        this.ui.img.src             = "/static/img/controls/party.svg";

        this.ui.container.appendChild(this.ui.img);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : PartyMode
     * desc   : PartyMode event listeners
     **/
    _eventListener() {
        if (window.debug && this.LOG) {
            console.log('      PartyMode : _eventListener call');
        }

        this.ui.img.addEventListener("click", function() {
            window.app.showAppView("mzk_party");
        });
    }

}

export default PartyMode