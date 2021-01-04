import DragElement from '../../../../utils/DragElement';
import DropElement from '../../../../utils/DropElement';


class WishesFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._dropElements = [];
    this._dragElements = [];

    this._fillAttributes();
    this._events();
  }


  destroy() {
    for (let i = 0; i < this._dropElements.length; ++i) {
      this._dropElements[i].destroy();
    }
    for (let i = 0; i < this._dragElements.length; ++i) {
      this._dragElements[i].destroy();
    }
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {

  }


  _events() {
    const pendingWishes = this._target.querySelector('#pending-wishes');
    const acceptedWishes = this._target.querySelector('#accepted-wishes');
    const refusedWishes = this._target.querySelector('#refused-wishes');

    /* Drop containers */

    const pendingDropContainer = new DropElement({
      target: pendingWishes,
      onDrop: this._dropOnPending.bind(this)
    });

    const acceptedDropContainer = new DropElement({
      target: acceptedWishes,
      onDrop: this._dropOnAccepted.bind(this)
    });

    const refusedDropContainer = new DropElement({
      target: refusedWishes,
      onDrop: this._dropOnRefused.bind(this)
    });

    this._dropElements.push(pendingDropContainer);
    this._dropElements.push(acceptedDropContainer);
    this._dropElements.push(refusedDropContainer);

    /* Draggable items */

    for (let i = 0; i < pendingWishes.children.length; ++i) {
      if (pendingWishes.children[i].nodeName !== 'H1') {
        const dragElement = new DragElement({
          target: pendingWishes.children[i],
          data: {
            wishId: pendingWishes.children[i].dataset.id
          }
        });
        this._dragElements.push(dragElement);
      }
    }

    for (let i = 0; i < acceptedWishes.children.length; ++i) {
      if (acceptedWishes.children[i].nodeName !== 'H1') {
        const dragElement = new DragElement({
          target: acceptedWishes.children[i],
          data: {
            wishId: acceptedWishes.children[i].dataset.id
          }
        });
        this._dragElements.push(dragElement);
      }
    }

    for (let i = 0; i < refusedWishes.children.length; ++i) {
      if (refusedWishes.children[i].nodeName !== 'H1') {
        const dragElement = new DragElement({
          target: refusedWishes.children[i],
          data: {
            wishId: refusedWishes.children[i].dataset.id
          }
        });
        this._dragElements.push(dragElement);
      }
    }
  }


  _dropOnPending(data) {
    mzk.kom.post(`/admin/wish/reset/${data.wishId}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _dropOnAccepted(data) {
    mzk.kom.post(`/admin/wish/accept/${data.wishId}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _dropOnRefused(data) {
    mzk.kom.post(`/admin/wish/reject/${data.wishId}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


}


export default WishesFragment;