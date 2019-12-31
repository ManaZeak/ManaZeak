import AllTagsView from "../AllTagsView";
'use strict';


class AllLabelsView extends AllTagsView {


  constructor() {
    super({
      type: 'label',
      sort: 'letters',
      keys: { // Those keys are required in mother class to process objects by types
        OBJECTS: 'LABELS',
        NAME: 'LABEL_NAME',
        ID: 'LABEL_ID',
        PP: 'LABEL_PP',
        defaultSVG: 'label'
      }
    });
  }


}


export default AllLabelsView;