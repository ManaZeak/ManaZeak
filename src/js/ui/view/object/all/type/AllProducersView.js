import AllTagsView from "../AllTagsView";
import ScrollBar from "../../../../component/bar/ScrollBar";
'use strict';


class AllProducersView extends AllTagsView {


  constructor() {
    super({
      type: 'producer',
      sort: 'letters'
    });

    this._keyWords = { // Those keys are required in mother class to process objects by types
      object: 'producers',
      fromResponse: 'PRODUCERS',
      objectName: 'PRODUCER_NAME',
      objectId: 'PRODUCER_ID',
      objectPp: 'PRODUCER_PP',
      objectEntryType: 'SingleProducer'
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


export default AllProducersView;