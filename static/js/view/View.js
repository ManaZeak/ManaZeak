import ProgressBar from './modules/ProgressBar.js'

class View {
  constructor() {
    this.progressBar = new ProgressBar({
      timecode: true
    });

    this.test();
  }

  changeTrack(isPlaying) {
    this.togglePlay(isPlaying);
    this.progressBar.updateDuration(mzk.model.player.getDuration());
  }

  togglePlay(isPlaying) {
    if (!isPlaying) {
      document.getElementById("play").innerHTML = 'Play';
      this.progressBar.desactivate();
    }

    else if (isPlaying) {
      document.getElementById("play").innerHTML = 'Pause';
      this.progressBar.activate();
    }
  }

  stopPlayback(hasSource) {
    !hasSource ? document.getElementById("play").innerHTML = 'Play' : Notification.error({ message: 'Player didnt stopped well' });
    this.progressBar.resetProgressBar();
    this.progressBar.resetTimecode();
  }

  updateVolume(isMuted, volume) {
    document.getElementById("vo").innerHTML = 'Volume: ' + volume;
    !isMuted ? document.getElementById("mute").innerHTML = 'Mute' : document.getElementById("mute").innerHTML = 'UnMute';
  }

  updateProgress(progress) {
    this.progressBar.setProgress(progress);
    document.getElementById("seak").innerHTML = progress + ' %';
  }

  test() { // This has to go when controls are a thing
    let b, c, d, e, f, g, h, i, j, k, l, m, n, o;
    b = document.getElementById("play");
    c = document.getElementById("stop");
    d = document.getElementById("change");
    h = document.getElementById("change1");
    e = document.getElementById("mute");
    i = document.getElementById("vd");
    j = document.getElementById("vu");
    k = document.getElementById("seak");
    l = document.getElementById("rewind");
    m = document.getElementById("ff");
    n = document.getElementById("vh");
    o = document.getElementById("half");

    b.addEventListener('click', function() { mzk.togglePlay(); });
    c.addEventListener('click', function() { mzk.stopPlayback(); });
    d.addEventListener('click', function() { mzk.changeTrack(5); });
    h.addEventListener('click', function() { mzk.changeTrack(7); });
    e.addEventListener('click', function() { mzk.toggleMute(); });
    i.addEventListener('click', function() { mzk.adjustVolume(-0.1); });
    j.addEventListener('click', function() { mzk.adjustVolume(0.1); });
    n.addEventListener('click', function() { mzk.setVolume(0.5); });
    l.addEventListener('click', function() { mzk.adjustProgress(-10); });
    m.addEventListener('click', function() { mzk.adjustProgress(10); });
    o.addEventListener('click', function() { mzk.setProgress(50); });

    Notification.info({ message: 'Success UI start' });
  }
}

export default View
