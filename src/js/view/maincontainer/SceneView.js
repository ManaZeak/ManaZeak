'use strict';


class SceneView {
  constructor() {
    this._tracks = [];
    this._scrollBar = {};

    this._selection = [];
    this._click = { // Object to handle click events on track entries
      dbclick: false,
      targetId: -1,
      timeoutId: -1
    };

    this._playingTrackIndex = -1;
  }

_trackClicked(event) {
    event.stopPropagation(); // Block window click listener

    const closest = event.target.closest('.track');
    let targetId = 0;

    if (closest === null) {
      this.unselectAll();
      return;
    } else {
      targetId = closest.dataset.id;
    }

    if (!this._click.dbclick || this._click.targetId !== targetId) { // Second test force dbclick to occur on same track
      this._click.dbclick = true;
      this._click.targetId = targetId;

      if (!event.ctrlKey) { // Simple click unselects all
        const isTargetSelected = this._tracks[targetId].getIsSelected(); // Saving target selection state before unselecting all
        this.unselectAll();
        this._tracks[targetId].setSelected(isTargetSelected); // Restore previous state to properly use in Normal click behavior condition
        this._selection.push(parseInt(targetId, 10));
      }

      if (event.ctrlKey && event.shiftKey && this._selection.length > 0) { // Ctrl + Shift + Click : fill selection in between target and closest selectioned track
        mzk.view.startLoading()
          .then(() => {
            let start = 0;
            let end = 0;

            if (parseInt(targetId, 10) < this._selection[0]) { // Compare to this._selection[0] since this._selection is always ordered
              start = parseInt(targetId, 10);
              end = this._selection[0];
            } else if (parseInt(targetId, 10) > this._selection[this._selection.length - 1]) { // Same here with greater index in this._selection
              start = this._selection[this._selection.length - 1] + 1; // +1  to avoid first item repetition
              end = parseInt(targetId, 10) + 1; // +1 to not forget the targetId too
            }

            for (let i = start; i < end; ++i) { // Loop to fill in between items
              this._tracks[i].setSelected(true);
              this._selection.push(i);
            }

            mzk.view.stopLoading();
          });
      } else { // Normal click behavior
        mzk.view.startLoading()
          .then(() => {
            if (this._tracks[targetId].getIsSelected()) {
              this._tracks[targetId].setSelected(false);
              this._selection.splice(this._selection.indexOf(targetId), 1);
            } else {
              this._tracks[targetId].setSelected(true);
              this._selection.push(parseInt(targetId, 10));
            }

            mzk.view.stopLoading();
          });
      }

      this._click.timeoutId = setTimeout(() => {
        this._click.dbclick = false;
      }, 300); // Double click speed lower than 300ms
    } else {
      clearTimeout(this._click.timeoutId);
      this.stopPlayback();
      this._tracks[targetId].setSelected(true);
      this._selection.push(parseInt(targetId, 10));
      mzk.changeTrack(this._tracks[targetId].id);
    }

    this._selection.sort((a, b) => {
      return (a - b);
    });
  }

  stopPlayback() {

  }

  unselectAll() {
    this._selection = [];

    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].setSelected(false);
    }
  }

  changeTrack(id) {
    let targetId = 0;

    for ( let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].id === id) {
        targetId = i;
        break;
      }
    }

    mzk.view.startLoading()
      .then(() => {
        this._playingTrackIndex !== -1 ? this._tracks[this._playingTrackIndex].setPlaying(false) : undefined;

        this._playingTrackIndex = targetId;
        this._click.dbclick = false;
        this._tracks[targetId].setPlaying(true);
        mzk.view.stopLoading();
      });
  }

  addTracks() {

  }

  centerOn(options) {
    let index = -1;
    if (options.index && options.index !== -1) {
      index = options.index;
    } else if (options.id) {
      let index = -1;
      for (let i = 0; i < this._tracks.length; ++i) {
        if (parseInt(this._tracks[i].id) === id) {
          index = i;
          break;
        }
      }
    }

    if (index === -1) {
      Errors.raise({
        code: 'CANT_CENTER_TRACK',
        frontend: true
      });
      return;
    }

    const relativeDelta = this._tracks[index].dom.offsetTop + this._tracks[index].dom.scrollHeight / 2;
    this._dom.container.scrollTop = relativeDelta - this._dom.container.clientHeight / 2;
  }

  refreshView() {

  }

  getDOMFragment() {
    return this._dom.fragment;
  }

  get playingTrackId() {
      return this._tracks
  }

  getNextTrackId() {
    return this._tracks[(this._playingTrackIndex + 1) % this._tracks.length].id;
  }

  getPreviousTrackId() {
    return this._tracks[(this._playingTrackIndex + this._tracks.length - 1) % this._tracks.length].id;
  }

  getFirstTrackId() {
    return this._tracks[0].id;
  }

  isLastTrack() {
    return this._playingTrackIndex === this._tracks.length - 1;
  }

  get playingTrackIndex() {
      return this._playingTrackIndex;
  }
}

export default SceneView;
