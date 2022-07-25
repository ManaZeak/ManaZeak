import Notification from '../../js/utils/Notification.js';

'use strict';


let NotificationMgt = {};
const testDefaultArguments = notificationMgt => {
  // Component existence
  expect(notificationMgt).not.toEqual(undefined);
  expect(notificationMgt).not.toEqual(null);
  // Default arguments
  expect(notificationMgt._dismissAllLock).toEqual(false);
  expect(notificationMgt._dom.outerHTML).toEqual('<div class="notification-container top-right"></div>');
  expect(notificationMgt._active).toEqual({});
  expect(notificationMgt._queue).toEqual({});
  expect(notificationMgt._queue).toEqual({});
  expect(JSON.stringify(notificationMgt._default)).toEqual(`{"handler":{"position":"top-right","thickBorder":"top","duration":5000,"transition":200,"maxActive":10},"notification":{"type":"info","message":"","title":"","iconless":false,"closable":true,"sticky":false,"renderTo":{},"CBtitle":"","callback":null,"isDimmed":false},"color":{"success":"rgb(76, 175, 80)","info":"rgb(3, 169, 244)","warning":"rgb(255, 152, 0)","error":"rgb(244, 67, 54)"},"svgPath":{"success":"M12.5 0C5.602 0 0 5.602 0 12.5S5.602 25 12.5 25 25 19.398 25 12.5 19.398 0 12.5 0zm-2.3 18.898l-5.5-5.5 1.8-1.796 3.7 3.699L18.5 7l1.8 1.8zm0 0","info":"M12.504.035a12.468 12.468 0 100 24.937 12.468 12.468 0 000-24.937zM15.1 19.359c-.643.25-1.153.445-1.537.576-.384.134-.825.199-1.333.199-.775 0-1.381-.192-1.813-.57a1.832 1.832 0 01-.642-1.442c0-.227.015-.459.047-.693.03-.24.083-.504.154-.806l.802-2.835c.069-.272.132-.527.182-.77.048-.244.069-.467.069-.668 0-.36-.075-.615-.223-.756-.153-.144-.437-.213-.857-.213-.207 0-.422.036-.639.095a9.914 9.914 0 00-.56.184l.213-.874a19.777 19.777 0 011.51-.549 4.48 4.48 0 011.361-.23c.77 0 1.368.19 1.784.56a1.857 1.857 0 01.626 1.452c0 .122-.012.341-.04.652a4.44 4.44 0 01-.162.856l-.798 2.831a8.133 8.133 0 00-.176.775c-.05.288-.075.51-.075.66 0 .374.082.633.251.771.165.134.458.202.875.202.192 0 .412-.037.66-.1.243-.073.42-.127.531-.18zm-.144-11.483a1.901 1.901 0 01-1.343.518 1.93 1.93 0 01-1.352-.518 1.65 1.65 0 01-.562-1.258 1.688 1.688 0 01.562-1.266 1.914 1.914 0 011.35-.522c.524 0 .975.173 1.345.523a1.673 1.673 0 01.56 1.266 1.65 1.65 0 01-.56 1.257z","warning":"M24.585 21.17L13.774 3.24a1.51 1.51 0 00-2.586 0L.376 21.17a1.51 1.51 0 001.293 2.29h21.623a1.51 1.51 0 001.292-2.29zM12.49 8.714c.621 0 1.146.35 1.146.97 0 1.895-.223 4.618-.223 6.513 0 .494-.541.7-.923.7-.51 0-.94-.208-.94-.701 0-1.894-.223-4.617-.223-6.511 0-.62.51-.971 1.163-.971zm.015 11.734a1.225 1.225 0 01-1.225-1.226c0-.669.525-1.227 1.225-1.227.652 0 1.21.558 1.21 1.227 0 .652-.557 1.225-1.21 1.225z","error":"M12.469.027c-3.332 0-6.465 1.301-8.824 3.653-4.86 4.86-4.86 12.777 0 17.636a12.392 12.392 0 008.824 3.653c3.336 0 6.465-1.301 8.824-3.653 4.863-4.859 4.863-12.777 0-17.636A12.417 12.417 0 0012.469.027zm5.61 18.086a1.137 1.137 0 01-.802.332c-.285 0-.582-.113-.8-.332l-4.008-4.008-4.008 4.008a1.137 1.137 0 01-.8.332c-.286 0-.583-.113-.802-.332a1.132 1.132 0 010-1.605l4.008-4.004L6.86 8.496a1.132 1.132 0 010-1.605 1.127 1.127 0 011.602 0l4.008 4.007 4.008-4.007a1.127 1.127 0 011.601 0c.45.449.45 1.164 0 1.605l-4.004 4.008 4.004 4.004c.45.449.45 1.164 0 1.605zm0 0"}}`);
  expect(notificationMgt._position).toEqual('top-right');
  expect(notificationMgt._thickBorder).toEqual('top');
  expect(notificationMgt._duration).toEqual(5000);
  expect(notificationMgt._transition).toEqual(200);
  expect(notificationMgt._maxActive).toEqual(10);
  expect(notificationMgt.version).toEqual('1.1.0');
};


describe('Notification unit test', () => {


  beforeEach(() => {
    NotificationMgt = new Notification();
  });


  afterEach(() => {
    // Component proper destruction
    NotificationMgt.destroy();
    NotificationMgt = null;
  });


  it('Component construction with no arguments', done => {
    // Notification must be built with default arguments
    testDefaultArguments(NotificationMgt);
    done();
  });


  it('Component construction with wrong arguments', done => {
    NotificationMgt.destroy(); // Must destroy default handler
    // Wrong type
    NotificationMgt = new Notification({
      position: () => {},
      thickBorder: 42,
      duration: 'Not a string',
      transition: 'Not a string',
      maxActive: 'Not a string'
    });
    // With wrong parameters, Notification must still be built with default arguments
    testDefaultArguments(NotificationMgt);
    // Component proper destruction
    NotificationMgt.destroy();
    // Invalid values for arguments
    NotificationMgt = new Notification({
      position: 'top-bottom',
      thickBorder: 'bopht',
      duration: -500,
      transition: -1000,
      maxActive: -1500
    });
    // With wrong parameters, Notification must still be built with default arguments
    testDefaultArguments(NotificationMgt);
    done();
  });


  it('Component construction', done => {
    NotificationMgt.destroy(); // Must destroy default handler
    NotificationMgt = new Notification({
      position: 'bottom-left',
      thickBorder: 'left',
      duration: 3000,
      transition: 500,
      maxActive: 5
    });
    // Notification must be built with default arguments
    // Component existence
    expect(NotificationMgt).not.toEqual(undefined);
    expect(NotificationMgt).not.toEqual(null);
    // Custom arguments
    expect(NotificationMgt._dismissAllLock).toEqual(false);
    expect(NotificationMgt._dom.outerHTML).toEqual('<div class="notification-container bottom-left"></div>');
    expect(NotificationMgt._active).toEqual({});
    expect(NotificationMgt._queue).toEqual({});
    expect(NotificationMgt._queue).toEqual({});
    expect(JSON.stringify(NotificationMgt._default)).toEqual(`{"handler":{"position":"top-right","thickBorder":"top","duration":5000,"transition":200,"maxActive":10},"notification":{"type":"info","message":"","title":"","iconless":false,"closable":true,"sticky":false,"renderTo":{},"CBtitle":"","callback":null,"isDimmed":false},"color":{"success":"rgb(76, 175, 80)","info":"rgb(3, 169, 244)","warning":"rgb(255, 152, 0)","error":"rgb(244, 67, 54)"},"svgPath":{"success":"M12.5 0C5.602 0 0 5.602 0 12.5S5.602 25 12.5 25 25 19.398 25 12.5 19.398 0 12.5 0zm-2.3 18.898l-5.5-5.5 1.8-1.796 3.7 3.699L18.5 7l1.8 1.8zm0 0","info":"M12.504.035a12.468 12.468 0 100 24.937 12.468 12.468 0 000-24.937zM15.1 19.359c-.643.25-1.153.445-1.537.576-.384.134-.825.199-1.333.199-.775 0-1.381-.192-1.813-.57a1.832 1.832 0 01-.642-1.442c0-.227.015-.459.047-.693.03-.24.083-.504.154-.806l.802-2.835c.069-.272.132-.527.182-.77.048-.244.069-.467.069-.668 0-.36-.075-.615-.223-.756-.153-.144-.437-.213-.857-.213-.207 0-.422.036-.639.095a9.914 9.914 0 00-.56.184l.213-.874a19.777 19.777 0 011.51-.549 4.48 4.48 0 011.361-.23c.77 0 1.368.19 1.784.56a1.857 1.857 0 01.626 1.452c0 .122-.012.341-.04.652a4.44 4.44 0 01-.162.856l-.798 2.831a8.133 8.133 0 00-.176.775c-.05.288-.075.51-.075.66 0 .374.082.633.251.771.165.134.458.202.875.202.192 0 .412-.037.66-.1.243-.073.42-.127.531-.18zm-.144-11.483a1.901 1.901 0 01-1.343.518 1.93 1.93 0 01-1.352-.518 1.65 1.65 0 01-.562-1.258 1.688 1.688 0 01.562-1.266 1.914 1.914 0 011.35-.522c.524 0 .975.173 1.345.523a1.673 1.673 0 01.56 1.266 1.65 1.65 0 01-.56 1.257z","warning":"M24.585 21.17L13.774 3.24a1.51 1.51 0 00-2.586 0L.376 21.17a1.51 1.51 0 001.293 2.29h21.623a1.51 1.51 0 001.292-2.29zM12.49 8.714c.621 0 1.146.35 1.146.97 0 1.895-.223 4.618-.223 6.513 0 .494-.541.7-.923.7-.51 0-.94-.208-.94-.701 0-1.894-.223-4.617-.223-6.511 0-.62.51-.971 1.163-.971zm.015 11.734a1.225 1.225 0 01-1.225-1.226c0-.669.525-1.227 1.225-1.227.652 0 1.21.558 1.21 1.227 0 .652-.557 1.225-1.21 1.225z","error":"M12.469.027c-3.332 0-6.465 1.301-8.824 3.653-4.86 4.86-4.86 12.777 0 17.636a12.392 12.392 0 008.824 3.653c3.336 0 6.465-1.301 8.824-3.653 4.863-4.859 4.863-12.777 0-17.636A12.417 12.417 0 0012.469.027zm5.61 18.086a1.137 1.137 0 01-.802.332c-.285 0-.582-.113-.8-.332l-4.008-4.008-4.008 4.008a1.137 1.137 0 01-.8.332c-.286 0-.583-.113-.802-.332a1.132 1.132 0 010-1.605l4.008-4.004L6.86 8.496a1.132 1.132 0 010-1.605 1.127 1.127 0 011.602 0l4.008 4.007 4.008-4.007a1.127 1.127 0 011.601 0c.45.449.45 1.164 0 1.605l-4.004 4.008 4.004 4.004c.45.449.45 1.164 0 1.605zm0 0"}}`);
    expect(NotificationMgt._position).toEqual('bottom-left');
    expect(NotificationMgt._thickBorder).toEqual('left');
    expect(NotificationMgt._duration).toEqual(3000);
    expect(NotificationMgt._transition).toEqual(500);
    expect(NotificationMgt._maxActive).toEqual(5);
    expect(NotificationMgt.version).toEqual('1.1.0');
    done();
  });


  /* No need to test destroy as if it didn't worked, previous test would have failed. */


  it('Private method _init', done => {
    spyOn(NotificationMgt, '_setOptionsDefault').and.callThrough();
    spyOn(NotificationMgt, '_setAttributesDefault').and.callThrough();
    spyOn(NotificationMgt, '_attach').and.callThrough();
    /* Test with default parameters */
    NotificationMgt._init();
    expect(NotificationMgt._setOptionsDefault).toHaveBeenCalled();
    expect(NotificationMgt._setAttributesDefault).toHaveBeenCalled();
    expect(NotificationMgt._attach).toHaveBeenCalled();
    expect(NotificationMgt._dom.classList.value).toEqual('notification-container top-right');
    expect(NotificationMgt._position).toEqual('top-right');
    expect(NotificationMgt._thickBorder).toEqual('top');
    expect(NotificationMgt._duration).toEqual(5000);
    expect(NotificationMgt._transition).toEqual(200);
    expect(NotificationMgt._maxActive).toEqual(10);
    /* test with invalid parameters */
    NotificationMgt._init({
      position: () => {},
      thickBorder: () => {},
      duration: () => {},
      transition: () => {},
      maxActive: () => {}
    });
    expect(NotificationMgt._setOptionsDefault).toHaveBeenCalled();
    expect(NotificationMgt._setAttributesDefault).toHaveBeenCalled();
    expect(NotificationMgt._attach).toHaveBeenCalled();
    expect(NotificationMgt._dom.classList.value).toEqual('notification-container top-right');
    expect(NotificationMgt._position).toEqual('top-right');
    expect(NotificationMgt._thickBorder).toEqual('top');
    expect(NotificationMgt._duration).toEqual(5000);
    expect(NotificationMgt._transition).toEqual(200);
    expect(NotificationMgt._maxActive).toEqual(10);
    /* Test with custom parameters */
    NotificationMgt._init({
      position: 'bottom-left',
      thickBorder: 'left',
      duration: 3000,
      transition: 500,
      maxActive: 5
    });
    expect(NotificationMgt._setOptionsDefault).toHaveBeenCalled();
    expect(NotificationMgt._setAttributesDefault).toHaveBeenCalled();
    expect(NotificationMgt._attach).toHaveBeenCalled();
    expect(NotificationMgt._dom.classList.value).toEqual('notification-container bottom-left');
    expect(NotificationMgt._position).toEqual('bottom-left');
    expect(NotificationMgt._thickBorder).toEqual('left');
    expect(NotificationMgt._duration).toEqual(3000);
    expect(NotificationMgt._transition).toEqual(500);
    expect(NotificationMgt._maxActive).toEqual(5);
    done();
  });


  it('Private method _setOptionsDefault', done => {
    /* Empty options provided */
    let options = {};
    NotificationMgt._setOptionsDefault(options);
    expect(options.position).toEqual('top-right');
    expect(options.thickBorder).toEqual('top');
    expect(options.duration).toEqual(5000);
    expect(options.transition).toEqual(200);
    expect(options.maxActive).toEqual(10);
    /* Wrong options object */
    options = {
      position: () => {},
      thickBorder: () => {},
      duration: () => {},
      transition: () => {},
      maxActive: () => {}
    };
    NotificationMgt._setOptionsDefault(options);
    expect(typeof options.position).toEqual('function');
    expect(typeof options.thickBorder).toEqual('function');
    expect(typeof options.duration).toEqual('function');
    expect(typeof options.transition).toEqual('function');
    expect(typeof options.maxActive).toEqual('function');
    /* Right parameters */
    options = {
      position: 'bottom-left',
      thickBorder: 'left',
      duration: 3000,
      transition: 500,
      maxActive: 5
    };
    NotificationMgt._setOptionsDefault(options);
    expect(options.position).toEqual('bottom-left');
    expect(options.thickBorder).toEqual('left');
    expect(options.duration).toEqual(3000);
    expect(options.transition).toEqual(500);
    expect(options.maxActive).toEqual(5);
    done();
  });


  it('Private method _setAttributesDefault', done => {
    /* Empty options provided */
    NotificationMgt._position = null;
    NotificationMgt._thickBorder = null;
    NotificationMgt._duration = null;
    NotificationMgt._transition = null;
    NotificationMgt._maxActive = null;
    NotificationMgt._setAttributesDefault();
    expect(NotificationMgt._position).toEqual('top-right');
    expect(NotificationMgt._thickBorder).toEqual('top');
    expect(NotificationMgt._duration).toEqual(5000);
    expect(NotificationMgt._transition).toEqual(200);
    expect(NotificationMgt._maxActive).toEqual(10);
    /* Wrong options object */
    NotificationMgt._position = () => {};
    NotificationMgt._thickBorder = () => {};
    NotificationMgt._duration = () => {};
    NotificationMgt._transition = () => {};
    NotificationMgt._maxActive = () => {};
    NotificationMgt._setAttributesDefault();
    expect(NotificationMgt._position).toEqual('top-right');
    expect(NotificationMgt._thickBorder).toEqual('top');
    expect(NotificationMgt._duration).toEqual(5000);
    expect(NotificationMgt._transition).toEqual(200);
    expect(NotificationMgt._maxActive).toEqual(10);
    /* Invalid values parameters */
    NotificationMgt._position = 'top-bottom';
    NotificationMgt._thickBorder = 'middle';
    NotificationMgt._duration = -5000;
    NotificationMgt._transition = -500;
    NotificationMgt._maxActive = -5;
    NotificationMgt._setAttributesDefault();
    expect(NotificationMgt._position).toEqual('top-right');
    expect(NotificationMgt._thickBorder).toEqual('top');
    expect(NotificationMgt._duration).toEqual(5000);
    expect(NotificationMgt._transition).toEqual(200);
    expect(NotificationMgt._maxActive).toEqual(10);
    /* Valid parameters */
    NotificationMgt._position = 'top-left';
    NotificationMgt._thickBorder = 'left';
    NotificationMgt._duration = 2000;
    NotificationMgt._transition = 100;
    NotificationMgt._maxActive = 2;
    NotificationMgt._setAttributesDefault();
    expect(NotificationMgt._position).toEqual('top-left');
    expect(NotificationMgt._thickBorder).toEqual('left');
    expect(NotificationMgt._duration).toEqual(2000);
    expect(NotificationMgt._transition).toEqual(100);
    expect(NotificationMgt._maxActive).toEqual(2);
    done();
  });


  it('Private method _attach', done => {
    NotificationMgt._attach();
    expect(document.body.lastElementChild).toEqual(NotificationMgt._dom);
    done();
  });


  it('Private method _events', done => {
    /* Basic notification with no sticky or closable */
    let notification = {
      dom: {
        addEventListener: type => {
          expect(type).toEqual('mouseover');
        }
      }
    };
    NotificationMgt._events(notification);
    /* Closable flag on */
    notification = {
      dom: {
        addEventListener: type => {
          if (type !== 'mouseover' && type !== 'click') {
            expect(false).toBe(true);
          }
        },
        close: {
          addEventListener: type => {
            expect(type).toEqual('click');
          },
        }
      },
      closable: true
    };
    NotificationMgt._events(notification);
    /* Sticky flag on */
    notification = {
      dom: {
        addEventListener: type => {
          if (type !== 'mouseout' && type !== 'mouseenter' && type !== 'mouseover') {
            expect(false).toBe(true);
          }
        }
      },
      sticky: true
    };
    NotificationMgt._events(notification);
    setTimeout(done, 100); // Wait way more time than required to ensure all listener has been set
  });


  it('Private method _buildUI', done => {
    /* Basic notification */
    let notification = {};
    spyOn(NotificationMgt, '_buildUIDom').and.callThrough();
    spyOn(NotificationMgt, '_buildNotificationType').and.callThrough();
    NotificationMgt._buildUI(notification);
    expect(notification.requestCount).toEqual(1);
    expect(notification.totalRequestCount).toEqual(1);
    expect(notification.dom.classList.value).toEqual('notification info');
    expect(notification.dom.text.classList.value).toEqual('text-container');
    expect(notification.dom.message.classList.value).toEqual(''); // Not iconless, standard P
    expect(notification.dom.firstElementChild.nodeName).toEqual('svg');
    expect(notification.dom.lastElementChild.innerHTML).not.toEqual('✖');
    expect(NotificationMgt._buildUIDom).toHaveBeenCalled();
    expect(NotificationMgt._buildNotificationType).toHaveBeenCalled();
    /* Iconless notification */
    notification = {
      iconless: true
    };
    NotificationMgt._buildUI(notification);
    expect(notification.dom.message.classList.value).toEqual('iconless-width');
    expect(notification.dom.firstElementChild.nodeName).not.toEqual('svg');
    /* Callback usage */
    notification = {
      callback: () => {},
      CBtitle: 'My custom callback'
    };
    NotificationMgt._buildUI(notification);
    expect(notification.dom.text.lastElementChild.nodeName).toEqual('BUTTON');
    expect(notification.dom.text.lastElementChild.innerHTML).toEqual('My custom callback');
    /* Closable notification */
    notification = {
      closable: true
    };
    NotificationMgt._buildUI(notification);
    expect(notification.dom.lastElementChild.nodeName).toEqual('DIV');
    expect(notification.dom.lastElementChild.innerHTML).toEqual('✖');
    done();
  });


  it('Private method _buildUIDom', done => {
    /* Standard UI build */
    let notification = {};
    NotificationMgt._buildUIDom(notification);
    expect(notification.dom.nodeName).toEqual('DIV');
    expect(notification.dom.icon.nodeName).toEqual('svg');
    expect(notification.dom.iconPath.nodeName).toEqual('path');
    expect(notification.dom.text.nodeName).toEqual('DIV');
    expect(notification.dom.close.nodeName).toEqual('DIV');
    expect(notification.dom.maintitle.nodeName).toEqual('H6');
    expect(notification.dom.message.nodeName).toEqual('P');
    expect(notification.dom.classList.value).toEqual('notification');
    expect(notification.dom.icon.classList.value).toEqual('vector-container');
    expect(notification.dom.text.classList.value).toEqual('text-container');
    expect(notification.dom.message.classList.value).toEqual('');
    expect(notification.dom.maintitle.innerHTML).toEqual('');
    expect(notification.dom.message.innerHTML).toEqual('');
    expect(notification.dom.close.innerHTML).toEqual('✖');
    expect(notification.dom.icon.attributes['viewBox'].value).toEqual('0 0 25 25');
    expect(notification.dom.icon.attributes['width'].value).toEqual('25');
    expect(notification.dom.icon.attributes['height'].value).toEqual('25');
    done();
  });


  it('Private method _buildNotificationType', done => {
    /* Default type */
    let notification = {
      dom: document.createElement('DIV'),
    };
    notification.dom.iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    NotificationMgt._buildNotificationType(notification);
    expect(notification.dom.classList.value).toEqual('info');
    expect(notification.dom.iconPath.attributes['fill'].value).toEqual(NotificationMgt._default.color.info);
    expect(notification.dom.iconPath.attributes['d'].value).toEqual(NotificationMgt._default.svgPath.info);
    /* Success type */
    notification = {
      type: 'success',
      dom: document.createElement('DIV'),
    };
    notification.dom.iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    NotificationMgt._buildNotificationType(notification);
    expect(notification.dom.classList.value).toEqual('success');
    expect(notification.dom.iconPath.attributes['fill'].value).toEqual(NotificationMgt._default.color.success);
    expect(notification.dom.iconPath.attributes['d'].value).toEqual(NotificationMgt._default.svgPath.success);
    /* Warning type */
    notification = {
      type: 'warning',
      dom: document.createElement('DIV'),
    };
    notification.dom.iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    NotificationMgt._buildNotificationType(notification);
    expect(notification.dom.classList.value).toEqual('warning');
    expect(notification.dom.iconPath.attributes['fill'].value).toEqual(NotificationMgt._default.color.warning);
    expect(notification.dom.iconPath.attributes['d'].value).toEqual(NotificationMgt._default.svgPath.warning);
    /* Error type */
    notification = {
      type: 'error',
      dom: document.createElement('DIV'),
    };
    notification.dom.iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    NotificationMgt._buildNotificationType(notification);
    expect(notification.dom.classList.value).toEqual('error');
    expect(notification.dom.iconPath.attributes['fill'].value).toEqual(NotificationMgt._default.color.error);
    expect(notification.dom.iconPath.attributes['d'].value).toEqual(NotificationMgt._default.svgPath.error);
    /* Error type */
    notification = {
      type: 'info',
      dom: document.createElement('DIV'),
    };
    notification.dom.iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    NotificationMgt._buildNotificationType(notification);
    expect(notification.dom.classList.value).toEqual('info');
    expect(notification.dom.iconPath.attributes['fill'].value).toEqual(NotificationMgt._default.color.info);
    expect(notification.dom.iconPath.attributes['d'].value).toEqual(NotificationMgt._default.svgPath.info);
    /* Iconless */
    notification = {
      iconless: true,
      dom: document.createElement('DIV'),
    };
    notification.dom.iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    NotificationMgt._buildNotificationType(notification);
    expect(notification.dom.classList.value).toEqual('info');
    expect(notification.dom.iconPath.attributes['fill']).toEqual(undefined);
    expect(notification.dom.iconPath.attributes['d']).toEqual(undefined);
    done();
  });


  it('Private method _start', done => {
    /* Queued notification */
    let notification = {
      duration: 100,
      id: 42
    };
    NotificationMgt._maxActive = 1;
    NotificationMgt._active = { id: '', di: '' };
    NotificationMgt._start(notification);
    expect(NotificationMgt._queue['42'].duration).toEqual(100);
    expect(NotificationMgt._queue['42'].id).toEqual(42);
    /* Standard start */
    notification = {
      duration: 100,
      id: 42
    };
    spyOn(NotificationMgt, '_events').and.callFake(() => {});
    spyOn(NotificationMgt, '_open').and.callFake(() => {});
    spyOn(NotificationMgt, '_checkCounter').and.callFake(() => {});
    NotificationMgt._maxActive = 1000;
    NotificationMgt._start(notification);
    expect(NotificationMgt._events).toHaveBeenCalled();
    expect(NotificationMgt._open).toHaveBeenCalled();
    expect(NotificationMgt._active['42'].duration).toEqual(100);
    expect(NotificationMgt._active['42'].id).toEqual(42);
    setTimeout(() => {
      expect(NotificationMgt._checkCounter).toHaveBeenCalled();
      done();
    }, 100);
  });


  it('Private method _open', done => {
    /* Basic notification with no sticky or closable */
    let notification = {
      renderTo: document.body,
      dom: document.createElement('DIV')
    };
    NotificationMgt._open(notification);
    setTimeout(() => {
      expect(document.body.lastElementChild).toEqual(notification.dom);
      expect(notification.dom.style.opacity).toEqual('1');
      expect(notification.opened).not.toEqual(undefined);
      /* Basic notification with no sticky or closable */
      notification = {
        renderTo: document.body,
        dom: document.createElement('DIV')
      };
      NotificationMgt._position = 'bottom-right';
      NotificationMgt._open(notification);
      setTimeout(() => {
        expect(document.body.firstElementChild).toEqual(notification.dom);
        done();
      }, 100);
    }, 100);
  });


  it('Private method _close', done => {
    /* Already closing notification */
    let notification = {
      isClosing: true
    };
    spyOn(window, 'setTimeout').and.callThrough();
    NotificationMgt._close(notification);
    expect(window.setTimeout).not.toHaveBeenCalled();
    /* Close with no queue */
    notification = {
      dom: document.createElement('DIV'),
      renderTo: document.body,
      opened: Date.now(),
      id: 42
    };
    document.body.appendChild(notification.dom);
    NotificationMgt._active['42'] = {};
    NotificationMgt._close(notification);
    expect(notification.isClosing).toEqual(true);
    expect(notification.closed).not.toEqual(undefined);
    expect(notification.effectiveDuration).toEqual(0);
    expect(notification.dom.style.opacity).toEqual('0');
    spyOn(NotificationMgt, '_start').and.callThrough();
    setTimeout(() => {
      expect(NotificationMgt._active).toEqual({});
      expect(NotificationMgt._dismissAllLock).toEqual(false);
      expect(NotificationMgt._start).not.toHaveBeenCalled();
      done();
    }, 2000);
  });


  it('Private method _close with existing queue', done => {
    /* Close with queue */
    let notification = {
      dom: document.createElement('DIV'),
      renderTo: document.body,
      opened: Date.now(),
      id: 42
    };
    document.body.appendChild(notification.dom);
    NotificationMgt._active['42'] = {};
    NotificationMgt._queue['43'] = {};
    NotificationMgt._close(notification);
    expect(notification.isClosing).toEqual(true);
    expect(notification.closed).not.toEqual(undefined);
    expect(notification.effectiveDuration).toEqual(0);
    expect(notification.dom.style.opacity).toEqual('0');
    spyOn(NotificationMgt, '_start').and.callFake(() => {});
    setTimeout(() => {
      expect(NotificationMgt._active['42']).toEqual(undefined);
      expect(NotificationMgt._queue).toEqual({});
      expect(NotificationMgt._dismissAllLock).toEqual(false);
      expect(NotificationMgt._start).toHaveBeenCalled();
      done();
    }, 2000);
  });


  it('Private method _incrementRequestCounter', done => {
    /* Standard incrementation */
    let notification = NotificationMgt._active[NotificationMgt.info({ message: 'Test' })];
    NotificationMgt._incrementRequestCounter(notification);
    expect(notification.requestCount).toEqual(2);
    expect(notification.totalRequestCount).toEqual(2);
    expect(notification.dom.counter.innerHTML).toEqual('2');
    /* Overflow > 99 */
    notification.requestCount = 99;
    NotificationMgt._incrementRequestCounter(notification);
    expect(notification.requestCount).toEqual(100);
    expect(notification.totalRequestCount).toEqual(100);
    expect(notification.dom.counter.innerHTML).toEqual('∞');
    /* Test call for _unDim */
    notification.sticky = true;
    notification.isDimmed = true;
    spyOn(NotificationMgt, '_unDim').and.callFake(() => {});
    NotificationMgt._incrementRequestCounter(notification);
    expect(NotificationMgt._unDim).toHaveBeenCalled();
    done();
  });


  it('Private method _decrementRequestCounter', done => {
    /* Standard incrementation */
    spyOn(NotificationMgt, '_resetTimeout').and.callFake(() => {});
    let notification = NotificationMgt._active[NotificationMgt.info({ message: 'Test' })];
    NotificationMgt._incrementRequestCounter(notification); // To append the counter div
    notification.requestCount = 3;
    NotificationMgt._decrementRequestCounter(notification);
    expect(notification.requestCount).toEqual(2);
    expect(notification.dom.counter.innerHTML).toEqual('2');
    expect(NotificationMgt._resetTimeout).toHaveBeenCalled();
    /* Overflow > 99 */
    notification.requestCount = 101;
    NotificationMgt._decrementRequestCounter(notification);
    expect(notification.requestCount).toEqual(100);
    expect(notification.dom.counter.innerHTML).toEqual('∞');
    /* Test call for _dim */
    notification.sticky = true;
    notification.isDimmed = false;
    spyOn(NotificationMgt, '_dim').and.callFake(() => {});
    NotificationMgt._decrementRequestCounter(notification);
    expect(NotificationMgt._dim).toHaveBeenCalled();
    done();
  });


  it('Private method _checkCounter', done => {
    /* Several requestd count */
    spyOn(NotificationMgt, '_decrementRequestCounter').and.callFake(() => {});
    let notification = NotificationMgt._active[NotificationMgt.info({ message: 'Test' })];
    notification.requestCount = 13;
    NotificationMgt._checkCounter(notification);
    expect(NotificationMgt._decrementRequestCounter).toHaveBeenCalled();
    /* Close notification */
    spyOn(window, 'clearTimeout').and.callFake(() => {});
    spyOn(NotificationMgt, '_close').and.callFake(() => {});
    notification.requestCount = 1;
    NotificationMgt._checkCounter(notification);
    expect(window.clearTimeout).toHaveBeenCalled();
    expect(NotificationMgt._close).toHaveBeenCalled();
    /* Dim notification */
    spyOn(NotificationMgt, '_dim').and.callFake(() => {});
    notification = NotificationMgt._active[NotificationMgt.info({ message: 'Test' })];
    notification.requestCount = 1;
    notification.sticky = true;
    NotificationMgt._checkCounter(notification);
    expect(NotificationMgt._dim).toHaveBeenCalled();
    done();
  });


  it('Private method _clearRequestCount', done => {
    /* Properly clear the requestCount */
    let notification = NotificationMgt._active[NotificationMgt.info({ message: 'Test' })];
    NotificationMgt._incrementRequestCounter(notification); // Required to append the counter
    NotificationMgt._clearRequestCount(notification);
    expect(notification.requestCount).toEqual(1);
    expect(notification.dom.counter).toEqual(undefined);
    done();
  });


  it('Private method _resetTimeout', done => {
    /* Basic notification with no sticky or closable */
    let notification = NotificationMgt._active[NotificationMgt.info({ message: 'Test' })];
    notification.duration = 100;
    spyOn(window, 'clearTimeout').and.callFake(() => {});
    spyOn(NotificationMgt, '_checkCounter').and.callFake(() => {});
    NotificationMgt._resetTimeout(notification);
    expect(window.clearTimeout).toHaveBeenCalled();
    setTimeout(() => {
      expect(NotificationMgt._checkCounter).toHaveBeenCalled();
      done();
    }, 500);
  });


  it('Private method _dim', done => {
    /* Standard dim scenario */
    let notification = NotificationMgt._active[NotificationMgt.info({ message: 'Test' })];
    notification.sticky = true;
    NotificationMgt._transition = 100;
    NotificationMgt._dim(notification);
    setTimeout(() => {
      expect(notification.isDimmed).toEqual(true);
      expect(notification.dom.style.opacity).toEqual('0.5');
      done();
    }, 2000);
  });


  it('Private method _unDim', done => {
    /* Standard undim scenario */
    let notification = NotificationMgt._active[NotificationMgt.info({ message: 'Test' })];
    notification.sticky = true;
    NotificationMgt._transition = 100;
    NotificationMgt._dim(notification);
    setTimeout(() => {
      NotificationMgt._unDim(notification);
      setTimeout(() => {
        expect(notification.isDimmed).toEqual(false);
        expect(notification.dom.style.opacity).toEqual('1');
        done();
      }, 1000);
    }, 1000);
  });


  it('Private method _checkNotificationOptionsValidity', done => {
    /* Empty object */
    expect(NotificationMgt._checkNotificationOptionsValidity()).toEqual(false);
    /* Missing mandatory argument */
    expect(NotificationMgt._checkNotificationOptionsValidity({
      type: 'error'
    })).toEqual(false);
    expect(NotificationMgt._checkNotificationOptionsValidity({
      message: 'Error'
    })).toEqual(false);
    expect(NotificationMgt._checkNotificationOptionsValidity({
      type: 'error',
      message: ''
    })).toEqual(false);
    /* Unclosable notification */
    expect(NotificationMgt._checkNotificationOptionsValidity({
      type: 'error',
      message: 'Error',
      sticky: true,
      closable: false
    })).toEqual(false);
    NotificationMgt._dismissAllLock = true;
    /* Valid arguments */
    expect(NotificationMgt._checkNotificationOptionsValidity({
      type: 'error',
      message: 'Error'
    })).toEqual(true);
    expect(NotificationMgt._dismissAllLock).toEqual(false);
    /* Default options */
    let options = {
      type: 'middle',
      message: 'Test'
    };
    NotificationMgt._checkNotificationOptionsValidity(options);
    expect(options.type).toEqual('info');
    done();
  });


  it('Private method _setOptionsFallback', done => {
    /* Proper fill with default values */
    let options = {};
    NotificationMgt._setOptionsFallback(options);
    expect(options.title).toEqual('');
    expect(options.duration).toEqual(5000);
    expect(options.iconless).toEqual(false);
    expect(options.thickBorder).toEqual('top');
    expect(options.closable).toEqual(true);
    expect(options.sticky).toEqual(false);
    expect(options.renderTo).toEqual(NotificationMgt._default.notification.renderTo);
    expect(options.CBtitle).toEqual('');
    expect(options.callback).toEqual(null);
    expect(options.isDimmed).toEqual(false);
    done();
  });


  it('Private method _idGenerator', done => {
    /* Proper seed homogeneity */
    expect(NotificationMgt._idGenerator('42', 5)).toEqual('1A63N');
    expect(NotificationMgt._idGenerator('42', 5)).toEqual('1A63N');
    done();
  });


  it('Public method new with wrong arguments', done => {
    spyOn(console, 'error').and.callThrough();
    expect(NotificationMgt.new()).toEqual(-1);
    expect(NotificationMgt.new('')).toEqual(-1);
    expect(NotificationMgt.new({
      type: 'orrer'
    })).toEqual(-1);
    expect(NotificationMgt.new({
      type: 'error',
      message: () => {}
    })).toEqual(-1);
    expect(console.error).toHaveBeenCalledTimes(4);
    expect(console.error).toHaveBeenCalledWith('Notification.js : new() options argument object is invalid.');
    done();
  });


  it('Public method new', done => {
    spyOn(console, 'error').and.callThrough();
    expect(NotificationMgt.new({
      type: 'error',
      message: 'Error message'
    })).not.toEqual(-1);
    let notification = NotificationMgt.new({
      type: 'error',
      message: 'Error message'
    });
    expect(typeof notification).toEqual('string');
    expect(console.error).not.toHaveBeenCalled();
    NotificationMgt.dismissAll();
    done();
  });


  it('Public method info with wrong arguments', done => {
    spyOn(console, 'error').and.callThrough();
    NotificationMgt.info();
    expect(console.error).toHaveBeenCalledWith('Notification.js : No arguments provided for info() method.');
    done();
  });


  it('Public method info', done => {
    spyOn(NotificationMgt, 'new').and.callFake(() => {});
    NotificationMgt.info({});
    expect(NotificationMgt.new).toHaveBeenCalled();
    done();
  });


  it('Public method success with wrong arguments', done => {
    spyOn(console, 'error').and.callThrough();
    NotificationMgt.success();
    expect(console.error).toHaveBeenCalledWith('Notification.js : No arguments provided for success() method.');
    done();
  });


  it('Public method success', done => {
    spyOn(NotificationMgt, 'new').and.callFake(() => {});
    NotificationMgt.success({});
    expect(NotificationMgt.new).toHaveBeenCalled();
    done();
  });


  it('Public method warning with wrong arguments', done => {
    spyOn(console, 'error').and.callThrough();
    NotificationMgt.warning();
    expect(console.error).toHaveBeenCalledWith('Notification.js : No arguments provided for warning() method.');
    done();
  });


  it('Public method warning', done => {
    spyOn(NotificationMgt, 'new').and.callFake(() => {});
    NotificationMgt.warning({});
    expect(NotificationMgt.new).toHaveBeenCalled();
    done();
  });


  it('Public method error with wrong arguments', done => {
    spyOn(console, 'error').and.callThrough();
    NotificationMgt.error();
    expect(console.error).toHaveBeenCalledWith('Notification.js : No arguments provided for error() method.');
    done();
  });


  it('Public method error', done => {
    spyOn(NotificationMgt, 'new').and.callFake(() => {});
    NotificationMgt.error({});
    expect(NotificationMgt.new).toHaveBeenCalled();
    done();
  });


  it('Public method dismiss', done => {
    let id = NotificationMgt.new({
      type: 'success',
      message: 'Sample text'
    });
    expect(NotificationMgt._active[id]).not.toEqual(undefined);
    spyOn(window, 'clearTimeout').and.callFake(() => {});
    spyOn(NotificationMgt, '_clearRequestCount').and.callFake(() => {});
    spyOn(NotificationMgt, '_close').and.callFake(() => {});
    NotificationMgt.dismiss(id);
    expect(window.clearTimeout).toHaveBeenCalled();
    expect(NotificationMgt._clearRequestCount).not.toHaveBeenCalled();
    expect(NotificationMgt._close).toHaveBeenCalled();
    id = NotificationMgt.new({
      type: 'success',
      message: 'Sample text'
    });
    NotificationMgt.new({
      type: 'success',
      message: 'Sample text'
    });
    NotificationMgt.dismiss(id);
    expect(window.clearTimeout).toHaveBeenCalled();
    expect(NotificationMgt._clearRequestCount).toHaveBeenCalled();
    expect(NotificationMgt._close).toHaveBeenCalled();
    done();
  });


  it('Public method dismissAll', done => {
    NotificationMgt.success({ message: 'Success' });
    NotificationMgt.warning({ message: 'Warning' });
    NotificationMgt.error({ message: 'Error' });
    NotificationMgt.info({ message: 'Info' });
    expect(Object.keys(NotificationMgt._active).length).toEqual(4);
    let counter = 0;
    spyOn(NotificationMgt, 'dismiss').and.callFake(() => {
      ++counter;
    })
    NotificationMgt.dismissAll();
    expect(NotificationMgt._dismissAllLock).toEqual(true);
    expect(counter).toEqual(4);
    done();
  });


  it('Public method dismissType', done => {
    NotificationMgt.success({ message: 'Success' });
    NotificationMgt.success({ message: 'Warning' });
    NotificationMgt.success({ message: 'Error' });
    NotificationMgt.info({ message: 'Info' });
    expect(Object.keys(NotificationMgt._active).length).toEqual(4);
    let counter = 0;
    spyOn(NotificationMgt, 'dismiss').and.callFake(() => {
      ++counter;
    })
    NotificationMgt.dismissType('success');
    expect(NotificationMgt._dismissAllLock).toEqual(false);
    expect(counter).toEqual(3);
    done();
  });


});
