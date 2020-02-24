import PlayableView from "../../PlayableView";
import TrackContext from "../../../context/TrackContext";
'use strict';


// This mother class is a way to proxify the fetch layout and content for single object views
class SingleTagView extends PlayableView {


  constructor(options) {
    super(options);

    this._type = options.type;

    this._dom = {
      wrapper: null
    };

    this._trackContext = {}; // Context menu clicked on a track
  }


  _init() { // Must be called in child class when needed, and chain the specific ui initialization with then
    return new Promise((resolve, reject) => {
      this._fetchWrapper()
        .then(this._getSingle.bind(this))
        .then(resolve).catch(reject);
    });
  }


  _fetchWrapper() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.getTemplate(`view/single/${this._type}/layout/`)
        .then((response) => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(response, 'text/html');
            const wrapperClass = `single-${this._type}-page`;
            this._dom.wrapper = doc.getElementsByClassName(wrapperClass)[0];

            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
  }


  _getSingle() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.get(`view/single/${this._type}/${this._id}`)
        .then(response => {
          // Resolve promise to build UI in child class
          resolve(response);
        }).catch(reject);
    });
  }


  _setupContext() {
    this._trackContext = new TrackContext({
      target: this._dom.trackContainer,
      url: 'context/trackcontext/'
    });
  }


  _singleTagEvents() {
    return new Promise((resolve) => {
      this._dom.trackContainer.addEventListener('click', (event) => {
        this._trackClicked(event);
      });

      this._dom.play.addEventListener('click', () => {
        mzk.changeTrack(this.firstTrackId);
      }, false);

      this._dom.trackContainer.addEventListener('contextmenu', event => {
        event.preventDefault();

        if (this._dom.trackContainer.contains(this._trackContext.dom)) {
          this._trackContext.close();
        } else {
          this._contextClicked(event);
        }
      });
      resolve();
    });
  }


  _contextClicked(event) {
    if (event.target.closest('.track')) {
      this._trackContext.open(event, event.target.parentNode.dataset.id);
    }
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleTagView;
