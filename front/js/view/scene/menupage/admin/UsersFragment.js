import DragElement from '../../../../utils/DragElement';
import DropElement from '../../../../utils/DropElement';


class UsersFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

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
    const usersWrapper = this._target.querySelector('#users-wrapper');
    for (let i = 0; i < usersWrapper.children.length; ++i) {
      this._users.push(usersWrapper.children[i]);
    }
    const badgesWrapper = this._target.querySelector('#badges-wrapper');
    for (let i = 0; i < badgesWrapper.children.length; ++i) {
      this._badges.push(badgesWrapper.children[i]);
    }
  }


  _events() {
    for (let i = 0; i < this._users.length; ++i) {
      const dropElement = new DropElement({
        target: this._users[i],
        onDrop: this._dropOnUser.bind(this._users[i], this._refreshCB)
      });
      this._dropElements.push(dropElement);
    }

    for (let i = 0; i < this._badges.length; ++i) {
      const dragElement = new DragElement({
        target: this._badges[i],
        data: {
          badgeId: this._badges[i].dataset.id
        }
      });
      this._dragElements.push(dragElement);
    }
  }


  _dropOnUser(refreshCB, data) {
    mzk.kom.post('/badge/associate', {
      userId: this.dataset.id,
      badgeId: data.badgeId
    }).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


}


export default UsersFragment;