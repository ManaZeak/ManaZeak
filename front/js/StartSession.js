import Kom from './core/Kom.js';
'use strict';

console.log('Successfully loaded JS bundle');
const kom = new Kom();
/* WIP */
const userTmp = document.getElementsByClassName('user-avatar')[0];
userTmp.addEventListener('click', () => {
    kom.getText('/fragment/user-profile/').then(response => {
        const scene = document.getElementsByClassName('scene')[0];
        const parser = new DOMParser();
        const dom = parser.parseFromString(response, 'text/html');
        scene.appendChild(dom.body.firstChild);
    }).catch(err => {
        console.log(err);
    });
});
