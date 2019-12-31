import AllTagsView from "../AllTagsView";
'use strict';


class AllAlbumsView extends AllTagsView {


  constructor() {
    super({
      type: 'album',
      sort: 'years',
      keys: { // Those keys are required in mother class to process objects by types
        OBJECTS: 'ALBUMS',
        ID: 'ALBUM_ID',
        NAME: 'ALBUM_TITLE',
        YEAR: 'ALBUM_YEAR', // Year is required on album objects to sort by year (You don't say???)
        PP: 'ALBUM_COVER',
        defaultSVG: 'album'
      }
    });
  }


}


export default AllAlbumsView;