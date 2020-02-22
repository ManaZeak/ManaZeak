import AllTagsView from "../AllTagsView";
'use strict';


class AllCountriesView extends AllTagsView {


  constructor() {
    super({
      type: 'country',
      sort: 'letters',
      keys: { // Those keys are required in mother class to process objects by types
        OBJECTS: 'COUNTRIES',
        ID: 'COUNTRY_ID',
        NAME: 'COUNTRY_CODE',
        PP: 'COUNTRY_FLAG',
        defaultSVG: 'flag'
      }
    });
  }


}


export default AllCountriesView;