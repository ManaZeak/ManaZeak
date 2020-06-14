class AdminUserEntry {


  constructor(user) {
    this._user = this._createUser(user);
  }


  _createUser(user) {
    console.log(user)
    const userContainer = document.createElement('DIV');
    userContainer.classList.add('user-item');

    const userName = document.createElement('P');
    const value = document.createElement('P');

    userName.innerHTML = user.NAME;

    userContainer.appendChild(userName);
    userContainer.appendChild(value);
    return userContainer;
  }


  get dom() {
    return this._user;
  }


}


export default AdminUserEntry;
