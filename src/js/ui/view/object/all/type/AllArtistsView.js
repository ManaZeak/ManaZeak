import AllTagsView from "../AllTagsView";
'use strict';


class AllArtistsView extends AllTagsView {


  constructor() {
    super({
      type: 'artist',
      sort: 'letters',
      keys: { // Those keys are required in mother class to process objects by types
        OBJECTS: 'ARTISTS',
        ID: 'ARTIST_ID',
        NAME: 'ARTIST_NAME',
        PP: 'ARTIST_PP',
        defaultSVG: 'artist'
      }
    });
  }


}


export default AllArtistsView;
