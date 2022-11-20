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

    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#edit-account'), mzk.setModal.bind(mzk, { name: 'EditAccount' }), this));
    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#password'), mzk.setModal.bind(mzk, { name: 'ResetPassword' }), this));
    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#copy-invite'), this._copyInviteCode, this));
    this._evtIds.push(Evts.addEvent('click', this._target.querySelector('#copy-invite-link'), this._copyInviteLink, this));
  }


  _copyInviteCode() {
    const inviteCode = this._target.querySelector('#invite-code').innerHTML;
    this._saveToClipboard(inviteCode)
      .then(() => Logger.raise('F_INVIT_CODE_CLIPBOARD_SUCCESS'))
      .catch(() => Logger.raise('F_INVIT_CODE_CLIPBOARD_ERROR'));
  }


  _copyInviteLink() {
    const inviteCode = this._target.querySelector('#invite-code').innerHTML;
    const link = `${window.location.origin}/register?invite-code=${inviteCode}`;
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
