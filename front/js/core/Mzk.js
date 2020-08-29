import UserInterface from '../view/UserInterface';
import Kom from "./Kom";
'use strict';


class Mzk {


    constructor() {
        this.kom = null;
        this.ui = null;
    }


    initSession() {
        this.kom = new Kom();
        /* WIP */
        const userTmp = document.getElementsByClassName('user-avatar')[0];
        userTmp.addEventListener('click', () => {
            this.kom.getText('/fragment/user-profile/').then(response => {
                const scene = document.getElementsByClassName('scene')[0];
                const parser = new DOMParser();
                const dom = parser.parseFromString(response, 'text/html');
                scene.appendChild(dom.body.firstChild);
            }).catch(err => {
                console.log(err);
            });
        });

        this.ui = new UserInterface();
    }

}


export default Mzk;
