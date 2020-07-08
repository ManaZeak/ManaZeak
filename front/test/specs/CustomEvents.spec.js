import CustomEvents from '../CustomEvents.js'
'use strict';


// Working component, re-instantiated before each test
let AppEvents = null;


describe('CustomEvents unit test', () => {


  beforeEach(() => {
    AppEvents = new CustomEvents();
  });


  it('Component construction', done => {
    // Component existence
    expect(AppEvents).not.toEqual(undefined);
    expect(AppEvents).not.toEqual(null);
    // Component proper construction
    expect(AppEvents._debug).toEqual(false);
    expect(typeof AppEvents._idIncrementor).toEqual('number');
    expect(AppEvents._regularEvents.length).toEqual(0);
    expect(Object.keys(AppEvents._customEvents).length).toEqual(0);
    expect(AppEvents.version).toEqual('1.0.0'); // Check version number
    done();
  });


  it('Component construction in debug mode', done => {
    // Re-instantiate AppEvents in debug
    AppEvents = new CustomEvents(true);
    // Component proper construction
    expect(AppEvents._debug).toEqual(true);
    done();
  });


  it('Component construction with wrong argument type', done => {
    // Send string instead of boolean
    AppEvents = new CustomEvents('Not a string');
    // Component proper construction
    expect(AppEvents._debug).toEqual(false);
    done();
  });


  it('Component destruction', done => {
    AppEvents.destroy();
    // Check proper object destruction
    expect(JSON.stringify(AppEvents)).toEqual('{}');
    done();
  });


  /* Classic JavaScript events override */


  it('Public method addEvent', done => {
    const testDiv = document.createElement('DIV');
    let called = 0;
    const cb = event => {
      // Test object construction
      expect(AppEvents._regularEvents.length).toEqual(1); // We only have one event listener
      expect(AppEvents._regularEvents[0].id).toEqual(AppEvents._idIncrementor - 1);
      expect(AppEvents._regularEvents[0].element).toEqual(testDiv);
      expect(AppEvents._regularEvents[0].eventName).toEqual('click');
      expect(AppEvents._regularEvents[0].scope).toEqual(testDiv); // Default scope is element
      expect(typeof AppEvents._regularEvents[0].callback).toEqual('function');
      expect(AppEvents._regularEvents[0].options).toEqual(false);
      // Test received event, must be 'click'
      expect(typeof event).toEqual('object');
      expect(event.type).toEqual('click');
      called++;
    };
    // Proper subscription and return value
    const evtId = AppEvents.addEvent('click', testDiv, cb);
    expect(typeof evtId).toEqual('number');
    expect(evtId).toEqual(AppEvents._idIncrementor - 1);
    // Trigger that regular event
    testDiv.click();
    expect(called).toEqual(1);
    testDiv.click();
    expect(called).toEqual(2);
    // Missing argument test
    expect(AppEvents.addEvent()).toEqual(false);
    expect(AppEvents.addEvent('click', null, null)).toEqual(false);
    expect(AppEvents.addEvent('click', testDiv, null)).toEqual(false);
    expect(AppEvents.addEvent(null, testDiv, null)).toEqual(false);
    expect(AppEvents.addEvent(null, testDiv, () => {})).toEqual(false);
    expect(AppEvents.addEvent(null, null, () => {})).toEqual(false);
    done();
  });


  it('Public method addEvent with wrong arguments', done => {
    const testDiv = document.createElement('DIV');
    // Mandatory arguments
    // Send number instead of string for eventName
    expect(AppEvents.addEvent(42, testDiv, () => {})).toEqual(false);
    // Send string instead of object for element
    expect(AppEvents.addEvent('click', 'Not a string', () => {})).toEqual(false);
    // Send string instead of function for callback
    expect(AppEvents.addEvent('click', testDiv, 'Not a string')).toEqual(false);
    // Optional arguments
    // Send string instead of object for scope
    expect(AppEvents.addEvent('click', testDiv, () => {}, 'Not a string')).toEqual(false);
    // Send string instead of object for options
    expect(AppEvents.addEvent('click', testDiv, () => {}, window, 'Not a string')).toEqual(false);
    done();
  });


  it('Public method removeEvent', done => {
    // Event callback
    let called = 0;
    const cb = () => { called++; };
    const testDiv = document.createElement('DIV');
    const evtId = AppEvents.addEvent('click', testDiv, cb);
    // First click
    testDiv.click();
    expect(called).toEqual(1);
    expect(AppEvents._regularEvents.length).toEqual(1);
    // Remove event
    expect(AppEvents.removeEvent(evtId)).toEqual(true);
    // Second click
    testDiv.click();
    expect(called).toEqual(1);
    expect(AppEvents._regularEvents.length).toEqual(0);
    // Remove an already removed event
    expect(AppEvents.removeEvent(evtId)).toEqual(false);
    // Missing argument test
    expect(AppEvents.removeEvent()).toEqual(false);
    done();
  });


  it('Public method removeEvent with wrong arguments', done => {
    // Mandatory arguments
    // Send number instead of string for eventId
    expect(AppEvents.removeEvent(42)).toEqual(false);
    done();
  });


  it('Public method removeAllEvents', done => {
    // Prepare test with 2 events and a test div
    const testDiv = document.createElement('DIV');
    AppEvents.addEvent('mousedown', testDiv, () => {});
    AppEvents.addEvent('mouseup', testDiv, () => {});
    expect(AppEvents._regularEvents.length).toEqual(2);
    // Call for removeAllEvents
    expect(AppEvents.removeAllEvents()).toEqual(true);
    expect(AppEvents._regularEvents.length).toEqual(0);
    // No event can be removed at this point, returning a false status
    expect(AppEvents.removeAllEvents()).toEqual(false);
    done();
  });


  it('Private method _clearRegularEvent', done => {
    const testDiv = document.createElement('DIV');
    AppEvents.addEvent('click', testDiv, () => {});
    expect(AppEvents._regularEvents.length).toEqual(1);
    // Clear without any index won't do anything
    expect(AppEvents._clearRegularEvent()).toEqual(false);
    expect(AppEvents._regularEvents.length).toEqual(1);
    // Now clear with first item index in stored event
    expect(AppEvents._clearRegularEvent(0)).toEqual(true);
    expect(AppEvents._regularEvents.length).toEqual(0);
    done();
  });


  it('Private method _clearRegularEvent with wrong arguments', done => {
    const testDiv = document.createElement('DIV');
    AppEvents.addEvent('click', testDiv, () => {});
    // Mandatory arguments
    // Send function instead of number for index
    expect(AppEvents._clearRegularEvent(() => {})).toEqual(false);
    done();
  });


  it('Private method _clearRegularEvent', done => {
    const testDiv = document.createElement('DIV');
    AppEvents.addEvent('click', testDiv, () => {});
    expect(AppEvents._regularEvents.length).toEqual(1);
    // Clear without any index won't do anything
    AppEvents._clearRegularEvent();
    expect(AppEvents._regularEvents.length).toEqual(1);
    // Now clear with first item index in stored event
    AppEvents._clearRegularEvent(0);
    expect(AppEvents._regularEvents.length).toEqual(0);
    done();
  });


  /* Custom events by name */


  it('Public method subscribe', done => {
    let called = 0;
    const evtId = AppEvents.subscribe('TestEvent', () => {
      expect(Object.keys(AppEvents._customEvents['TestEvent']).length).toEqual(1);
      expect(AppEvents._customEvents['TestEvent'][0].id).toEqual(AppEvents._idIncrementor - 1);
      expect(AppEvents._customEvents['TestEvent'][0].name).toEqual('TestEvent');
      expect(AppEvents._customEvents['TestEvent'][0].os).toEqual(false);
      expect(typeof AppEvents._customEvents['TestEvent'][0].callback).toEqual('function');
      called++;
    });
    expect(typeof evtId).toEqual('number');
    expect(evtId).toEqual(AppEvents._idIncrementor - 1);
    // All subscribe expects will be handle in publish call
    AppEvents.publish('TestEvent');
    // Check proper Events state
    expect(Object.keys(AppEvents._customEvents).length).toEqual(1);
    expect(AppEvents._customEvents['TestEvent']).not.toEqual(undefined);
    expect(AppEvents._customEvents['TestEvent']).not.toEqual(null);
    expect(called).toEqual(1);
    // Call again for publish to check incrementation
    AppEvents.publish('TestEvent');
    expect(called).toEqual(2);
    // Missing parameters for subscribe
    expect(AppEvents.subscribe()).toEqual(false);
    expect(AppEvents.subscribe('TestEvt', null)).toEqual(false);
    expect(AppEvents.subscribe(null, () => {})).toEqual(false);
    done();
  });


  it('Public method subscribe with one shot', done => {
    let called = 0;
    AppEvents.subscribe('TestEvent', () => {
      expect(Object.keys(AppEvents._customEvents['TestEvent']).length).toEqual(1); // We only have one subscription on event
      expect(AppEvents._customEvents['TestEvent'][0].name).toEqual('TestEvent');
      expect(AppEvents._customEvents['TestEvent'][0].os).toEqual(true); // One shot event
      expect(typeof AppEvents._customEvents['TestEvent'][0].callback).toEqual('function');
      called++;
    }, true); // Send true for one shot
    // All subscribe expects will be handle in publish call
    AppEvents.publish('TestEvent');
    // Check proper Events state
    expect(Object.keys(AppEvents._customEvents).length).toEqual(0);
    expect(called).toEqual(1);
    // All subscribe expects will be handle in publish call, we send here data
    AppEvents.publish('TestEvent');
    expect(called).toEqual(1);
    done();
  });


  it('Public method subscribe with wrong arguments', done => {
    // Mandatory arguments
    // Send number instead of string for eventName
    expect(AppEvents.subscribe(42, () => {})).toEqual(false);
    // Send string instead of string for callback
    expect(AppEvents.subscribe('TestEvent', 'Not a string')).toEqual(false);
    // Optional arguments
    // Send string instead of boolean for oneShot
    expect(AppEvents.subscribe('TestEvent', () => {}, 'Not a string')).toEqual(false);
    done();
  });


  it('Public method unsubscribe', done => {
    const subsId = AppEvents.subscribe('TestEvent', () => {});
    expect(Object.keys(AppEvents._customEvents).length).toEqual(1);
    // All subscribe expects will be handle in publish call, we send here data
    expect(AppEvents.unsubscribe(subsId)).toEqual(true);
    expect(Object.keys(AppEvents._customEvents).length).toEqual(0);
    expect(AppEvents.unsubscribe(subsId)).toEqual(false);
    // Missing parameters for subscribe
    expect(AppEvents.unsubscribe()).toEqual(false);
    done();
  });


  it('Public method unsubscribe with wrong arguments', done => {
    // Mandatory arguments
    // Send string instead of number for eventName
    expect(AppEvents.unsubscribe('Not a string')).toEqual(false);
    done();
  });


  it('Public method unsubscribeAllFor', done => {
    AppEvents.subscribe('TestEvent', () => {});
    AppEvents.subscribe('TestEvent', () => {});
    expect(Object.keys(AppEvents._customEvents).length).toEqual(1);
    // All subscribe expects will be handle in publish call, we send here data
    expect(AppEvents.unsubscribeAllFor('TestEvent')).toEqual(true);
    expect(Object.keys(AppEvents._customEvents).length).toEqual(0);
    expect(AppEvents.unsubscribeAllFor('TestEvent')).toEqual(false);
    // Missing parameters for subscribe
    expect(AppEvents.unsubscribeAllFor()).toEqual(false);
    done();
  });


  it('Public method unsubscribeAllFor with wrong arguments', done => {
    // Mandatory arguments
    // Send number instead of string for eventName
    expect(AppEvents.unsubscribeAllFor(42)).toEqual(false);
    done();
  });


  it('Public method publish without data', done => {
    AppEvents.subscribe('TestEvent', data => {
      expect(data).toEqual(null); // Default value for empty data must be undefined
    });
    // All subscribe expects will be handle in publish call
    expect(AppEvents.publish('TestEvent')).toEqual(true);
    done();
  });


  it('Public method publish with data', done => {
    AppEvents.subscribe('TestEvent', data => {
      expect(JSON.stringify(data)).toEqual(`{"passedData":[0,"1"]}`);
    });
    // Proper method call
    expect(AppEvents.publish('TestEvent', { passedData: [0, '1'] })).toEqual(true);
    // No registered event test
    expect(AppEvents.publish('NotTestEvent')).toEqual(false);
    // Missing mandatory arguments
    expect(AppEvents.publish()).toEqual(false);
    done();
  });


  it('Public method publish on un-existing event', done => {
    expect(AppEvents.publish('TestEvent')).toEqual(false);
    done();
  });


  it('Public method publish with wrong arguments', done => {
    // Mandatory arguments
    // Send number instead of string for eventName
    expect(AppEvents.publish(42)).toEqual(false);
    // Send number instead of object for data
    expect(AppEvents.publish('TestEvent', 42)).toEqual(false);
    done();
  });


});


describe('CustomEvents functional test', () => {


  beforeEach(() => {
    AppEvents = new CustomEvents();
  });


  it('Validate add/remove event with scope', done => {
    let called = 0;
    const testDiv = document.createElement('DIV');
    class TestClass {
      constructor(AppEvents) {
        this.attribute = 'attr-value';
        this.evtId = AppEvents.addEvent('click', testDiv, this.cbWithScope, this);
        this.scopelessEvtId = AppEvents.addEvent('click', testDiv, this.cbWithoutScope);
        /* Testing part */
        expect(AppEvents._regularEvents.length).toEqual(2);
        testDiv.click();
        expect(called).toEqual(2);
        AppEvents.removeEvent(this.evtId);
        expect(AppEvents._regularEvents.length).toEqual(1);
        testDiv.click();
        expect(called).toEqual(3);
        AppEvents.removeEvent(this.scopelessEvtId);
        expect(AppEvents._regularEvents.length).toEqual(0);
        testDiv.click();
        expect(called).toEqual(3);
        done();
      }

      cbWithScope() {
        // Check that scope has been preserved in class callback
        expect(this).not.toEqual(testDiv);
        expect(this.attribute).toEqual('attr-value');
        expect(typeof this.evtId).toEqual('number');
        called++;
      }


      cbWithoutScope() {
        // Check that scope is element one
        expect(this).toEqual(testDiv);
        called++;
      }
    }
    // In real use case, AppEvents would be imported as component in class definition file
    new TestClass(AppEvents);
  });


});
