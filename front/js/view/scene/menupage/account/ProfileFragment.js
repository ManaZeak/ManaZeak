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
    this._evtIds.push(Events.addEvent('click', this._target.querySelector('#edit-account'), mzk.setModal.bind(mzk, { name: 'EditAccount' }), this));
    this._evtIds.push(Events.addEvent('click', this._target.querySelector('#password'), mzk.setModal.bind(mzk, { name: 'ResetPassword' }), this));
    this._evtIds.push(Events.addEvent('click', this._target.querySelector('#copy-invite'), this._copyInvite, this));
    this._evtIds.push(Events.addEvent('click', this._target.querySelector('#copy-invite-link'), this._copyInviteLink, this));
  }


  _copyInvite() {
    const inviteCode = this._target.querySelector('#invite-code').innerHTML;
    this._saveToClipboard(inviteCode).then(() => {
      Logger.raise({
        severity: 'success',
        title: 'Saved in clipboard',
        message: 'The invitation code was saved in the clipboard successfully'
      });
    }).catch(() => {
      Logger.raise({
        severity: 'error',
        title: 'Unable to save in clipboard',
        message: 'The invitation code wasn\'t saved in the clipboard'
      });
    });
  }


  _copyInviteLink() {
    const inviteCode = this._target.querySelector('#invite-code').innerHTML;
    const link = `${window.location.origin}/register?invite-code=${inviteCode}`;
    this._saveToClipboard(link).then(() => {
      Logger.raise({
        severity: 'success',
        title: 'Saved in clipboard',
        message: 'The invitation link was saved in the clipboard successfully'
      });
    }).catch(() => {
      Logger.raise({
        severity: 'error',
        title: 'Unable to save in clipboard',
        message: 'The invitation code wasn\'t saved in the clipboard'
      });
    });
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
