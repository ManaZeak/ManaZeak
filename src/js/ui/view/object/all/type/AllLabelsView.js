import AllTagsView from "../AllTagsView";
'use strict';


class AllLabelsView extends AllTagsView {


  constructor() {
    super({
      type: 'label',
      sort: 'letters'
    });

    this._keyWords = { // Those keys are required in mother class to process objects by types
      object: 'labels',
      defaultImg: 'label',
      fromResponse: 'LABELS',
      objectName: 'LABEL_NAME',
      objectId: 'LABEL_ID',
      objectPp: 'LABEL_PP',
      objectEntryType: 'SingleLabel'
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


export default AllLabelsView;