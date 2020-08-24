import Kom from './core/Kom.js';
'use strict';

console.log('Successfully loaded JS bundle');
const kom = new Kom();
/* WIP */
const userTmp = document.getElementByClassName('user-avatar')[0];
userTmp.onClick = () => {
    kom.getText('/fragments/user/userProfile').then(response => {
        console.log(response);
    });
};
