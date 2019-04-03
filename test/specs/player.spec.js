import Player from '../../src/js/core/Player.js';

window.mzk = {};
let player = {};

describe('Player unit tests', function() {


  beforeEach(function() {
    player = new Player();
  });


  afterEach(function() {
    const previousPlayer = document.getElementById('mzk-audio-player');

    if (previousPlayer) {
      document.body.removeChild(previousPlayer);
    }
  });


  it('Instanciation and initialization | covers Player constructor', function(done) {
    expect(player).not.toBe(null); // Player object has been created
    expect(player._volume).toBe(1); // Volume has been correctly initialized
    expect(player._isMuted).toBe(false); // isMuted flag has been correctly initialized
    expect(player._isPlaying).toBe(false); // isPlaying flag has been correctly initialized
    expect(document.getElementById('mzk-audio-player')).not.toBe(null); // Check that audio tag has been appended to document

    done();
  });


  it('Volume modification | covers volume setter', function(done) {
    player.volume = -100; // OOB (lower overflow)
    expect(player._volume).toBe(0);
    expect(player._player.volume).toBe(0);
    expect(player._isMuted).toBe(true);
    player.volume = 100; // OOB (higher overflow)
    expect(player._volume).toBe(1);
    expect(player._player.volume).toBe(1);
    expect(player._isMuted).toBe(false);
    player.volume = 0;
    expect(player._volume).toBe(0);
    expect(player._player.volume).toBe(0);
    expect(player._isMuted).toBe(true);
    player.volume = 0.5; // Half
    expect(player._volume).toBe(0.5);
    expect(player._player.volume).toBe(0.5);
    expect(player._isMuted).toBe(false);
    player.volume = 1;
    expect(player._volume).toBe(1);
    expect(player._player.volume).toBe(1);
    expect(player._isMuted).toBe(false);

    done();
  });


  it('Volume modification | covers adjustVolume()', function(done) {
    player.adjustVolume(-100); // OOB (lower overflow) adjustVolume()
    expect(player._volume).toBe(0);
    expect(player._player.volume).toBe(0);
    expect(player._isMuted).toBe(true);
    player.adjustVolume(100); // OOB (higher overflow) adjustVolume()
    expect(player._volume).toBe(1);
    expect(player._player.volume).toBe(1);
    expect(player._isMuted).toBe(false);
    player.adjustVolume(-0.1); // Regular positive adjustVolume()
    expect(player._volume).toBe(0.9);
    expect(player._player.volume).toBe(0.9);
    player.adjustVolume(0.1); // Regular negative adjustVolume()
    expect(player._volume).toBe(1);
    expect(player._player.volume).toBe(1);

    done();
  });


  it('Volume modification | covers mute(), unmute(), toggleMute()', function(done) {
    player.volume = 0.9;
    player.mute(); // Mute player action
    expect(player._volume).toBe(0.9); // Old volume value has been stored
    expect(player._player.volume).toBe(0);
    expect(player._isMuted).toBe(true);
    player.unmute(); // UnMute player action
    expect(player._volume).toBe(0.9);
    expect(player._player.volume).toBe(0.9);
    expect(player._isMuted).toBe(false);
    player.volume = 0;
    expect(player._isMuted).toBe(true);
    player.unmute(); // UnMute player action
    expect(player._volume).toBe(0.5); // Player restore default half volume value
    expect(player._player.volume).toBe(0.5);
    expect(player._isMuted).toBe(false);
    player.volume = 0.9;
    player.toggleMute();
    expect(player._volume).toBe(0.9); // Old volume value has been stored
    expect(player._player.volume).toBe(0);
    expect(player._isMuted).toBe(true);
    player.toggleMute();
    expect(player._volume).toBe(0.9);
    expect(player._player.volume).toBe(0.9);
    expect(player._isMuted).toBe(false);

    done();
  });


  it('Player playback | covers changeTrack(), pause(), play(), togglePlay()', function(done) {
    expect(player._player.src).toBe('');
    player.changeTrack(/* local tst fq */)
      .then(() => {
        expect(player._player.src).not.toBe('');
        expect(player._player.src).toBe(/* local tst fq */);
        expect(player._isPlaying).toBe(true);
        player.pause();
        expect(player._isPlaying).toBe(false);
        expect(player._player.src).not.toBe('');
        player.play();
        expect(player._isPlaying).toBe(true);
        player.togglePlay();
        expect(player._isPlaying).toBe(false);
        expect(player._player.src).not.toBe('');
        player.togglePlay();
        expect(player._isPlaying).toBe(true);

        done();
      });
  });


  it('Player playback progress | covers adjustProgress(), repeatTrack(), stop(), trackEnded evt', function(done) {
    window.mzk.trackEnded = function() {
      expect(player._isPlaying).toBe(false);
      player.stop();
      expect(player._isPlaying).toBe(false);
      expect(player._player.src).toBe('');

      done();
    };

    player.changeTrack(/* local tst fq */)
      .then(() => {
        window.setTimeout(() => {
          player.adjustProgress(50);
          expect(Math.round(player._player.currentTime)).toBe(97);
          player.repeatTrack();
          expect(Math.round(player._player.currentTime)).toBe(0);
          player.adjustProgress(-1000);
          expect(Math.round(player._player.currentTime)).toBe(0);
          player.adjustProgress(1000);
          expect(Math.round(player._player.currentTime)).toBe(0);
          done();
        }, 500);
      });
  });


  it('Getter test | covers getIsPlaying(), getIsMuted(), getVolume(), getProgress(), getDuration(), getCurrentTime(), hasSource()', function(done) {
    player.changeTrack(/* local tst fq */)
      .then(() => {
        expect(player.playing).toBe(true);
        player.pause();
        expect(player.playing).toBe(false);
        player.play();
        expect(player.muted).toBe(false);
        player.mute();
        expect(player.muted).toBe(true);
        expect(player.volume).toBe(1);
        player.unmute();
        expect(player.muted).toBe(false);
        expect(player.volume).toBe(1);

        window.setTimeout(function() {
          expect(Math.round(player.progress * 100)).toBe(8);
          expect(Math.round(player.duration)).toBe(193);
          expect(player.hasSource()).toBe(true);

          done();
        }, 200);
      });
  });
});
