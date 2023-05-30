class ViewHistory {


  constructor() {
    this._previousView = [];
    this._nextView = [];
    this._abortNextAdd = false;
    this._fromPreviousClicked = false;

    this._previousButton = null;
    this._nextButton = null;

    this._init()
      .then(this._events.bind(this))
      .catch(err => console.error(err));
  }


  _init() {
    return new Promise(resolve => {
      this._previousButton = document.getElementById('topbar-view-previous');
      this._nextButton = document.getElementById('topbar-view-next');
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
    this._previousButton.addEventListener('click', this._previousClicked.bind(this));
    this._nextButton.addEventListener('click', this._nextClicked.bind(this));
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


  _previousClicked() {
    // Init a previous clicked state for further addView to properly handle next view reset
    this._nextButton.classList.remove('disabled');
    this._fromPreviousClicked = true;
    mzk.ui.previousHistoryView();
  }


  _nextClicked() {
    mzk.ui.nextHistoryView();
  }


  addView(options) {
    // We must know when to reset next array (clicking on a view different than next one in nextView)
    if (!this._fromPreviousClicked && this._nextView.length && this._nextView[this._nextView.length - 1] !== options) {
      this._nextView = [];
    }
    // reset bu default the from previous clicked flag
    this._fromPreviousClicked = false;

    if (this._abortNextAdd === false) {
      window.history.pushState({ isBackPage: true }, '', '');
      this._previousView.push(options);
    } else {
      // Restore abort next add flag to initial state 
      this._abortNextAdd = false;
    }

    if (this._previousView.length > 1) {
      this._previousButton.classList.remove('disabled');
    } else {
      this._previousButton.classList.add('disabled');
    }

    if (this._nextView.length === 0) {
      this._nextButton.classList.add('disabled');
    } else {
      this._nextButton.classList.remove('disabled');
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
