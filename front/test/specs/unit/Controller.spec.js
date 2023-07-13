import Controller from '../../../js/core/Controller.js';


// Fake Mzk emulation, and import for test verification
import '../../utils/MzkFakeInfra.js';
import Player from '../../../js/core/Player.js';
import PlayerRepeatModeEnum from '../../../js/utils/enum/PlayerRepeatMode.js';
import PlayerPlaybackModeEnum from '../../../js/utils/enum/PlayerPlaybackMode.js';


window.mzk = {
  changeTrack: () => {},
  stopPlayback: () => {}
};


describe('Controller unit tests,', () => {


  it('Component proper construction', done => {
    window.DEBUG = false;
    const controller = new Controller();
    expect(controller._player instanceof Player).toEqual(true);
    expect(controller._playObject).toEqual(null);
    expect(controller._playingId).toEqual('-1');
    expect(controller._trackHistory).toEqual([]);
    expect(controller._queue).toEqual([]);
    expect(controller._shuffleQueue).toEqual([]);
    expect(controller._waitForShuffleTracks).toEqual(true);
    expect(controller._repeatMode).toEqual(PlayerRepeatModeEnum.NO_REPEAT);
    expect(controller._playbackMode).toEqual(PlayerPlaybackModeEnum.NORMAL);
    done();
  });


  it('Component proper construction', done => {
    let shortcutRegistered = 0;
    spyOn(Shortcut, 'register').and.callFake(() => {
      ++shortcutRegistered;
    });

    const controller = new Controller();
    expect(shortcutRegistered).toEqual(13);
    done();
  });
});
