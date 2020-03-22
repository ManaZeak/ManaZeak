class AdminSceneView {


  constructor(options) {
    this._type = options.type;
    this._parent = options.parent;

    this._dom = {
      wrapper: null
    }
  }


  _init() { // Must be called in child class when needed, and chain the specific ui initialization with then
    return new Promise((resolve, reject) => {
      this._fetchWrapper()
        .then(resolve).catch(reject);
    });
  }


  _fetchWrapper() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.getTemplate(`view/admin/${this._type}/layout/`)
        .then((response) => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(response, 'text/html');

            const wrapperClass = `admin-${this._type}-page`;
            this._dom.wrapper = doc.getElementsByClassName(wrapperClass)[0];
            this._parent.appendChild(this._dom.wrapper);

            resolve(doc);
          } catch (error) {
            reject(error);
          }
        });
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default AdminSceneView;