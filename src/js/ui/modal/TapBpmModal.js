import Modal from '../component/overlay/Modal.js';
'use strict';


class TapBpmModal extends Modal {


  constructor(options) {
    super(options);

    this._trackId = options.trackId;
    this._bpmClickContainer = null;
    this._bpm = null;
		this._count = 0;
		// Timestamps
		this._ts = {
			current: 0,
			previous: 0,
			first: 0
		};
  }


  setActions(doc) {
    const closeTop = doc.getElementById('user-id-close-top');
    const resetBottom = doc.getElementById('reset-bpm');
    const sendBottom = doc.getElementById('send-bpm');
    const trackTitle = doc.getElementById('track-title');
    const trackArtist = doc.getElementById('track-artist');
    const trackBpm = doc.getElementById('track-current-bpm');

    this._bpmClickContainer = doc.getElementsByClassName('bpm-click-container')[0];
    this._bpm = doc.getElementsByClassName('bpm-value')[0];

    closeTop.addEventListener('click', this.close.bind(this));
    resetBottom.addEventListener('click', this._resetBpm.bind(this));
    sendBottom.addEventListener('click', this._sendBpm.bind(this));
    this._bpmClickContainer.addEventListener('click', this._tap.bind(this));

    mzk.komunikator.get(`track/getBpm/${this._trackId}/`)
      .then(response => {
        trackTitle.innerHTML = response.TRACK_TITLE;
        trackArtist.innerHTML = response.TRACK_ARTIST;
        trackBpm.innerHTML = response.TRACK_BPM === null ? mzk.lang.tags.notSet : response.TRACK_BPM;
      })
      .catch(err => {
        console.error(err);
      });
  }


  _tap() {
		this._ts.current = Date.now();
		// Store the first timestamp of the tap sequence on first click
		if (this._ts.first === 0) {
			this._ts.first = this._ts.current;
		}

	  if (this._ts.previous !== 0) {
	    let bpm = 60000 * this._count / (this._ts.current - this._ts.first);
      if (bpm % 1 > 0.5) {
        this._bpm.innerHTML = Math.ceil(bpm);
      } else {
        this._bpm.innerHTML = Math.round(bpm);
      }
	  }
	  // Store the old timestamp
	  this._ts.previous = this._ts.current;
		++this._count;

    this._bpmClickContainer.style.border = 'dashed 3px #F74B46'; // Color is mzk-color-anti-primary-dark
    setTimeout(() => {
      this._bpmClickContainer.style.border = 'dashed 3px #0F1015'; // Default color is pzk-color-bg-dark
    }, 100);
  }


  _resetBpm() {
		this._count = 0;
		this._ts.current = 0;
		this._ts.previous = 0;
		this._ts.first = 0;
    this._bpm.innerHTML = '0';
    this._bpmClickContainer.style.border = 'dashed 3px #0F1015';
  }


  _sendBpm() {
    const options = {
      TRACK_ID: this._trackId,
      BPM: this._bpm.innerHTML
    };

    mzk.komunikator.post('track/setBpm/', options)
      .then(this.close.bind(this))
      .catch(err => {
        console.error(err);
      });
  }


}

export default TapBpmModal;
