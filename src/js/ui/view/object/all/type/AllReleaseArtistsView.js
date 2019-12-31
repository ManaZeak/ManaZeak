import AllTagsView from "../AllTagsView";
'use strict';


class AllReleaseArtistsView extends AllTagsView {


  constructor() {
    super({
      type: 'releaseArtist',
      sort: 'letters'
    });

    this._keyWords = { // Those keys are required in mother class to process objects by types
      object: 'releaseArtists',
      defaultImg: 'artist',
      fromResponse: 'ARTISTS',
      objectName: 'ARTIST_NAME',
      objectId: 'ARTIST_ID',
      objectPp: 'ARTIST_PP',
      objectEntryType: 'SingleReleaseArtist'
    };

    this._init()
      .then(this._processByLetters.bind(this))
      .then(this._buildLettersView.bind(this))
      .then(this._viewReady);
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default AllReleaseArtistsView;