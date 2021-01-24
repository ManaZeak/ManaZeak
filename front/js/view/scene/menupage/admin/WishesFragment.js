import DragElement from '../../../../utils/DragElement';
import DropElement from '../../../../utils/DropElement';


class WishesFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._dropElements = [];
    this._dragElements = [];
    this._evtIds = [];

    this._fillAttributes();
  }


  destroy() {
    for (let i = 0; i < this._dropElements.length; ++i) {
      this._dropElements[i].destroy();
    }
    for (let i = 0; i < this._dragElements.length; ++i) {
      this._dragElements[i].destroy();
    }

    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    this._setDragDropElements('#pending-wishes', 'reset');
    this._setDragDropElements('#accepted-wishes', 'accept');
    this._setDragDropElements('#refused-wishes', 'reject');
  }


  _setDragDropElements(selector, type) {
    const wishes = this._target.querySelector(selector);
    // Drop wrapper
    const dropContainer = new DropElement({
      target: wishes,
      onDrop: this._wishDroppedOn.bind(this, type)
    });
    this._dropElements.push(dropContainer);
    for (let i = 0; i < wishes.children.length; ++i) {
      // We ignore the title of each section (Pending/Accepted/Refused)
      if (wishes.children[i].nodeName !== 'H1') {
        // Drag elements
        const dragElement = new DragElement({
          target: wishes.children[i],
          data: {
            wishId: wishes.children[i].dataset.id
          }
        });
        this._dragElements.push(dragElement);
        // Remove wish
        this._evtIds.push(Events.addEvent('click', wishes.children[i], this._removeWish, { element: wishes.children[i], scope: this }));
      }
    }
  }


  _wishDroppedOn(type, data) {
    mzk.kom.post(`/admin/wish/${type}/${data.wishId}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _removeWish() {
    mzk.kom.post(`/admin/wish/delete/${this.element.dataset.id}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this.scope._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


}


export default WishesFragment;
