import DragElement from '../../../../utils/DragElement';
import DropElement from '../../../../utils/DropElement';
import ScrollBar from '../../../../view/navigation/ScrollBar';


class UsersFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._users = [];
    this._badges = [];

    this._dropElements = [];
    this._dragElements = [];
    this._scrolls = [];
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

    for (let i = 0; i < this._scrolls.length; ++i) {
      this._scrolls[i].destroy();
    }

    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    // Saving users and badge from template
    const usersWrapper = this._target.querySelector('#users-wrapper');
    for (let i = 0; i < usersWrapper.children.length; ++i) {
      this._users.push(usersWrapper.children[i]);
    }
/*
    this._scrolls.push(new ScrollBar({
      target: usersWrapper,
      style: {
        color: '#56D45B'
      }
    }));
*/
    const badgesWrapper = this._target.querySelector('#badges-wrapper');
    for (let i = 0; i < badgesWrapper.children.length; ++i) {
      this._badges.push(badgesWrapper.children[i]);
    }
    // Build drag behavior for badges
    for (let i = 0; i < this._badges.length; ++i) {
      const dragElement = new DragElement({
        target: this._badges[i],
        data: {
          badgeId: this._badges[i].dataset.id
        }
      });
      this._dragElements.push(dragElement);
    }
    // Build drop behavior for users and setup ban/delete events for each
    for (let i = 0; i < this._users.length; ++i) {
      const dropElement = new DropElement({
        target: this._users[i],
        onDrop: this._dropOnUser.bind(this._users[i], this._refreshCB)
      });
      this._dropElements.push(dropElement);
      // Ban/Delete events
      const banUser = this._users[i].children[this._users[i].children.length - 1].children[0];
      const deleteUser = this._users[i].children[this._users[i].children.length - 1].children[1];
      this._evtIds.push(Evts.addEvent('click', banUser, this._banUser, { element: this._users[i], scope: this }));
      this._evtIds.push(Evts.addEvent('click', deleteUser, this._deleteUser, { element: this._users[i], scope: this }));
    }
    // Badge creation event
    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#new-badge'), mzk.setModal.bind(mzk, { name: 'Badge' }), this));
  }


  _dropOnUser(refreshCB, data) {
    mzk.kom.post('/badge/associate/', {
      userId: this.dataset.id,
      badgeId: data.badgeId
    }).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _banUser() {
    mzk.kom.post(`/admin/user/deactivate/${this.element.dataset.id}/`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this.scope._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _deleteUser() {
    mzk.kom.post(`/admin/user/delete/${this.element.dataset.id}/`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this.scope._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


}


export default UsersFragment;
