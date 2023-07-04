class ProfileFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;
    this._evtIds = [];
    this._fillAttributes();
  }


  destroy() {
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    if (this._target.querySelector('#parent-name').innerHTML === '') {
      this._target.querySelector('#user-info').removeChild(this._target.querySelector('#user-parent'));
    }

    const date = new Date(this._target.querySelector('#member-since').innerHTML);
    this._target.querySelector('#member-since').innerHTML = Utils.formatDate(date);

    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#edit-account'), this._editAccount, this));
    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#password'), mzk.setModal.bind(mzk, { name: 'ResetPassword' }), this));
    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#copy-invite-link'), this._copyInviteLink, this));
  }


  _editAccount() {
    const userInfo = this._target.querySelector('#user-info');
    mzk.setModal({
      name: 'EditAccount',
      data: {
        email: userInfo.querySelector('#email').textContent,
        name: userInfo.querySelector('#name').textContent,
        surname: userInfo.querySelector('#surname').textContent,
        bio: userInfo.querySelector('#bio').textContent,
        birthDate: userInfo.querySelector('#birthdate').textContent,
        country: userInfo.querySelector('#country').textContent,
        locale: userInfo.querySelector('#locale').textContent
      }
    });
  }


  _copyInviteLink() {
    const inviteCode = this._target.querySelector('#invite-code').innerHTML;
    const link = `${window.location.origin}/register/?invite-code=${inviteCode}`;
    this._saveToClipboard(link)
      .then(() => Logger.raise('F_INVIT_LINK_CLIPBOARD_SUCCESS'))
      .catch(() => Logger.raise('F_INVIT_LINK_CLIPBOARD_ERROR'));
  }


  _saveToClipboard(text) {
    return new Promise((resolve, reject) => {
      // Standard fallback if clipboard API not available
      if (!navigator.clipboard) {
        const textArea = document.createElement('TEXTAREA');
        textArea.value = text;
        textArea.setAttribute('style', 'position:absolute;top:-100%;left:-100%;');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        // Save fake text area content to clipboard
        try {
          document.execCommand('copy');
          document.body.removeChild(textArea);
          resolve();
        } catch (err) {
          document.body.removeChild(textArea);
          reject();
        }
      }
      // Use clipboard API otherwise
      navigator.clipboard.writeText(text).then(resolve, reject);
    });
  }


}


export default ProfileFragment;
