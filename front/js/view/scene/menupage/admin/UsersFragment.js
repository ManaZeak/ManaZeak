import DragElement from '../../../../utils/DragElement';
import DropElement from '../../../../utils/DropElement';


class UsersFragment {


  constructor(parent) {
    this._parent = parent;

    this._users = [];
    this._badges = [];

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
    const usersWrapper = this._parent.querySelector('#users-wrapper');
    for (let i = 0; i < usersWrapper.children.length; ++i) {
      this._users.push(usersWrapper.children[i]);
    }
    const badgesWrapper = this._parent.querySelector('#badges-wrapper');
    for (let i = 0; i < badgesWrapper.children.length; ++i) {
      this._badges.push(badgesWrapper.children[i]);
    }
  }


  _events() {
    for (let i = 0; i < this._users.length; ++i) {
      const dropElement = new DropElement({
        target: this._users[i],
        onDrop: this._dropOnUser.bind(this)
      });
      this._dropElements.push(dropElement);
    }

    for (let i = 0; i < this._badges.length; ++i) {
      const dragElement = new DragElement({
        target: this._badges[i],
        data: {
          type: 'badge',
          id: this._badges[i].dataset.id
        }
      });
      this._dragElements.push(dragElement);
    }
  }


  _dropOnUser(data) {
    console.log(data);
  }


}


export default UsersFragment;