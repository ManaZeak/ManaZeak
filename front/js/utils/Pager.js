import '../../scss/tool/_pager.scss';


class Pager {

  constructor(options) {
    this._target = options.target;
    this._size = parseInt(options.size);
    this._maxItems = parseInt(options.maxItems);
    this._active = parseInt(options.active);
    this._clickedCB = options.clicked;
    this._totalPages = Math.floor(this._size / this._maxItems);

    this._container = null;
    this._evtIds = [];

    this._init();
  }


  destroy() {
    if (this._container) {
      this._target.removeChild(this._container);
    }
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }
  

  _init() {
    if (this._totalPages === 0) {
      return;
    }

    this._target.classList.add('pager');
    this._container = document.createElement('DIV');
    if (this._totalPages < 7) {
      this._createSimple();
    } else {
      this._createLarge();
    }
  }


  _createSimple() {
    for (let i = 0; i < this._totalPages; ++i) {
      const element = document.createElement('SPAN');
      element.dataset.page = i + 1;
      element.innerHTML = i + 1;
      if (i + 1 === this._active) {
        element.classList.add('selected');
      }
      this._container.appendChild(element);
    }
    this._target.appendChild(this._container);
  }


  _createLarge() {
    if (this._active < 3) {
      for (let i = 0; i < 7; ++i) { // Left side extremum
        const element = document.createElement('SPAN');
        element.dataset.page = i + 1;
        element.innerHTML = i + 1;
        if (i + 1 === this._active) {
          element.classList.add('selected');
        }
        this._evtIds.push(Evts.addEvent('click', element, () => this._clickedCB(element.dataset.page)));
        this._container.appendChild(element);
      }

      const more = document.createElement('SPAN');
      more.innerHTML = '···';
      const last = document.createElement('SPAN');
      last.innerHTML = this._totalPages;
      this._container.appendChild(more);
      this._evtIds.push(Evts.addEvent('click', last, () => this._clickedCB(this._totalPages)));
      this._container.appendChild(last);
    } else if (this._totalPages - this._active < 4) { // Right side extremum
      const first = document.createElement('SPAN');
      first.innerHTML = '1';
      const more = document.createElement('SPAN');
      more.innerHTML = '···';
      this._evtIds.push(Evts.addEvent('click', first, () => this._clickedCB(1)));
      this._container.appendChild(first);
      this._container.appendChild(more);

      for (let i = this._totalPages - 7; i < this._totalPages; ++i) {
        const element = document.createElement('SPAN');
        element.dataset.page = i + 1;
        element.innerHTML = i + 1;
        if (i + 1 === this._active) {
          element.classList.add('selected');
        }
        this._evtIds.push(Evts.addEvent('click', element, () => this._clickedCB(element.dataset.page)));
        this._container.appendChild(element);
      }
    } else {
      const first = document.createElement('SPAN');
      first.innerHTML = '1';
      const more1 = document.createElement('SPAN');
      more1.innerHTML = '···';
      this._evtIds.push(Evts.addEvent('click', first, () => this._clickedCB(1)));
      this._container.appendChild(first);
      this._container.appendChild(more1);

      for (let i = this._active - 3; i < this._active + 2; ++i) {
        const element = document.createElement('SPAN');
        element.dataset.page = i;
        element.innerHTML = i;
        if (i + 1 === this._active) {
          element.classList.add('selected');
        }
        this._evtIds.push(Evts.addEvent('click', element, () => this._clickedCB(element.dataset.page)));
        this._container.appendChild(element);
      }

      const more2 = document.createElement('SPAN');
      more2.innerHTML = '···';
      const last = document.createElement('SPAN');
      last.innerHTML = this._totalPages;
      this._container.appendChild(more2);
      this._evtIds.push(Evts.addEvent('click', last, () => this._clickedCB(this._totalPages)));
      this._container.appendChild(last);      
    }

    this._target.appendChild(this._container);
  }


}


export default Pager;
