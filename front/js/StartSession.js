import Kom from './core/Kom.js';
'use strict';

console.log('Successfully loaded JS bundle');
const kom = new Kom();
/* WIP */
const userTmp = document.getElementsByClassName('user-avatar')[0];
userTmp.addEventListener('click', () => {
    kom.getText('/fragment/user-profile/').then(response => {
        console.log(response);
    });
});
