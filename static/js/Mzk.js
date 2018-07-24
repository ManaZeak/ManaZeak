import Player from './core/Player.js'

class Mzk {

  constructor() {
    this.player = new Player();
    this.test();
  }

  test() { // This has to go fast when View.js is implemented
    let b, c, d, e, f, g, h, i, j, k, l, m, n, o;
    b = document.getElementById("play");
    c = document.getElementById("stop");
    d = document.getElementById("change");
    h = document.getElementById("change1");
    e = document.getElementById("mute");
    g = document.getElementById("loop");
    i = document.getElementById("vd");
    j = document.getElementById("vu");
    k = document.getElementById("seak");
    l = document.getElementById("rewind");
    m = document.getElementById("ff");
    n = document.getElementById("vh");
    o = document.getElementById("half");

    b.addEventListener('click', function() {
      this.togglePlay();
      !this.getIsPlaying() ? b.innerHTML = 'Play' : b.innerHTML = 'Pause';
    }.bind(this.player));

    c.addEventListener('click', function() {
      this.stop();
      b.innerHTML = 'Play';
    }.bind(this.player));

    d.addEventListener('click', function() {
      let that = this;
      this.changeTrack('http://static.kevvv.in/sounds/callmemaybe.mp3')
        .then(function() { !that.getIsPlaying() ? b.innerHTML = 'Play' : b.innerHTML = 'Pause'; })
        .catch(function() { console.log('FAIL') });
    }.bind(this.player));

    h.addEventListener('click', function() {
      let that = this;
      this.changeTrack('http://static.kevvv.in/sounds/callmemaybe.mp3') // On change de track, et on attach avec then la réponse de la promesse retournée dans changeTrack
        .then(function() { !that.getIsPlaying() ? b.innerHTML = 'Play' : b.innerHTML = 'Pause'; });
    }.bind(this.player));

    e.addEventListener('click', function() {
      this.toggleMute();
      document.getElementById("vo").innerHTML = 'Volume: ' + this.getVolume();
      !this.getIsMuted() ? e.innerHTML = 'Mute' : e.innerHTML = 'UnMute';
    }.bind(this.player));

    g.addEventListener('click', function() {
      this.toggleLoop();
      !this.getIsLooping() ? g.innerHTML = 'Loop' : g.innerHTML = 'Unloop';
    }.bind(this.player));

    i.addEventListener('click', function() {
      this.adjustVolume(-0.1);
      !this.getIsMuted() ? e.innerHTML = 'Mute' : e.innerHTML = 'UnMute';
      document.getElementById("vo").innerHTML = 'Volume: ' + this.getVolume();
    }.bind(this.player));

    j.addEventListener('click', function() {
      this.adjustVolume(0.1);
      document.getElementById("vo").innerHTML = 'Volume: ' + this.getVolume();
      !this.getIsMuted() ? e.innerHTML = 'Mute' : e.innerHTML = 'UnMute';
    }.bind(this.player));

    n.addEventListener('click', function() {
      this.setVolume(0.5);
      document.getElementById("vo").innerHTML = 'Volume: ' + this.getVolume();
    }.bind(this.player));

    l.addEventListener('click', function() {
      this.adjustProgress(-10);
      k.innerHTML = this.getProgress() + ' %';
    }.bind(this.player));

    m.addEventListener('click', function() {
      this.adjustProgress(10);
      k.innerHTML = this.getProgress() + ' %';
    }.bind(this.player));

    o.addEventListener('click', function() {
      this.setProgress(50);
      k.innerHTML = this.getProgress() + ' %';
    }.bind(this.player));

    setInterval(() => {
      k.innerHTML = this.player.getProgress() + ' %';
    }, 20);
  }
}

export default Mzk
