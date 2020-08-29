'use strict';


class Aside {


    constructor() {
        this._collapser = document.getElementById('aside-toggle');
        this._container = document.getElementById('aside');

        this._isCollapsed = false;

        this._events();
    }


    _events() {
        this._toggleAside = this._toggleAside.bind(this);
        this._collapser.addEventListener('click', this._toggleAside, false);
    }


    _toggleAside(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this._isCollapsed === true) {
            this.open();
        } else {
            this.close();
        }
    }


    open() {
        if (this._isCollapsed === true) {
            const asideWidth = '--mzk-aside-width';
            document.querySelector(':root').style.removeProperty(asideWidth); // Clear previous aside value
            this._isCollapsed = false;
            this._container.classList.remove('collapsed');
            requestAnimationFrame(() => {
                const style = getComputedStyle(document.documentElement);
                const asideDefaultWidth = style.getPropertyValue('--mzk-aside-default-width');
                document.querySelector(':root').style.setProperty(asideWidth, asideDefaultWidth);
            });
        }
    }


    close() {
        if (this._isCollapsed === false) {
            const asideWidth = '--mzk-aside-width';
            document.querySelector(':root').style.removeProperty(asideWidth); // Clear previous aside value
            this._isCollapsed = true;
            this._container.classList.add('collapsed');
            requestAnimationFrame(() => {
                const style = getComputedStyle(document.documentElement);
                const asideCollapsedWidth = style.getPropertyValue('--mzk-aside-collapsed-width');
                document.querySelector(':root').style.setProperty(asideWidth, asideCollapsedWidth);
            });
        }
    }

}


export default Aside;
