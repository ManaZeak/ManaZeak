class Playlist {
  constructor(options) {
    this._id = options.id;
    this._name = options.name;
    this._description = options.description;
    this._isLibrary = options.isLibrary;
  }

  getTracks(response) {
    console.log('gg');
  }
}

export default Playlist;
