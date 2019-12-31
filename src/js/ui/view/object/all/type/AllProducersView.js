import AllTagsView from "../AllTagsView";
'use strict';


class AllProducersView extends AllTagsView {


  constructor() {
    super({
      type: 'producer',
      sort: 'letters',
      keys: { // Those keys are required in mother class to process objects by types
        OBJECTS: 'PRODUCERS',
        ID: 'PRODUCER_ID',
        NAME: 'PRODUCER_NAME',
        PP: 'PRODUCER_PP',
        defaultSVG: 'artist'
      }
    });
  }


}


export default AllProducersView;