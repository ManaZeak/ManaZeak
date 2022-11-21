class ViewHistory {


  constructor() {
    this._previousView = [];
    this._nextView = [];
    this._abortNextAdd = false;

    this._init()
      .then(this._events.bind(this));
  }


  _init() {
    return new Promise(resolve => {
      // New navigation, create baseline states
      if (window.history.state === null) {
        // Back history entry
        window.history.replaceState({ isBackPage: true }, '', '');
        // MainPage history entry
        window.history.pushState({ isBackPage: false }, '', '');
        // Push baseline view
        this._previousView.push({ name: 'MainPage' });
        resolve();
        return;
      }
      // User arrived from back button
      if (window.history.state.isBackPage) {
        window.history.pushState({ isBackPage: false }, '', '');
      }

      resolve();
    });
  }


  _events() {
    window.addEventListener('popstate', this._popState.bind(this));    
  }


  _popState(e) {
    if (e.state !== null) {
      if (e.state.isBackPage) {
        if (this._previousView.length > 0) {
          mzk.ui.previousHistoryView();
        }
      } else {
        mzk.ui.nextHistoryView();
      }
    }
  }


  addView(options) {
    if (this._abortNextAdd === false) {
      window.history.pushState({ isBackPage: true }, '', '');
      this._previousView.push(options);
    } else {
      // Restore abort next add flag to initial state 
      this._abortNextAdd = false;
    }
  }


  getPreviousView() {
    if (this._previousView.length > 0) {
      // Removing last view from previous, adding it in next
      this._nextView.push(this._previousView.pop());
      // Ensure the next setView isn't save (snake eating its tail, no thx)
      this._abortNextAdd = true;
      return this._previousView[this._previousView.length - 1];
    }

    return null;
  }


  getNextView() {
    if (this._nextView.length > 0) {
      const view = this._nextView.pop();
      return view;
    }

    return null;
  }


}


export default ViewHistory;
