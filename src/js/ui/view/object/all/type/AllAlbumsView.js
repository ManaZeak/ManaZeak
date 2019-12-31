import AllTagsView from "../AllTagsView";
import ScrollBar from "../../../../component/bar/ScrollBar";
'use strict';


class AllAlbumsView extends AllTagsView {


  constructor() {
    super({
      type: 'album',
      sort: 'years'
    });

    this._keyWords = { // Those keys are required in mother class to process objects by types
      object: 'albums',
      fromResponse: 'ALBUMS',
      objectName: 'ALBUM_TITLE',
      objectYear: 'ALBUM_YEAR', // Year is required to sort by year (You don't say???)
      objectId: 'ALBUM_ID',
      objectPp: 'ALBUM_COVER',
      objectEntryType: 'SingleAlbum'
    };

    this._init()
      .then(this._processByYear.bind(this))
      .then(this._buildYearsView.bind(this))
      .then(this._viewReady);
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default AllAlbumsView;