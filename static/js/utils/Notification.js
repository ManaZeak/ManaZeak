'use_strict';

class Notification {
  /**
   * @summary Create an instance of a notification handler
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Notification Class to automatically handle one or several notification of different types at the same time.
   * @param {object} [options] - The notification handler global options
   * @param {string} [options.position=top-right] - <i>top-left; top-right; bottom-left; bottom-right;</i>
   * @param {string} [options.thickBorder=top] - <i>top; bottom; left; right; none;</i>
   * @param {number} [options.duration=3000] - Notification life cycle duration (in ms) in range N*
   * @param {number} [options.transition=100] - Notification fade animation transition timing (in ms) in range N*
   * @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N*
   **/
  constructor(options) {
    this._dismissAllLock = false; // Dismiss all operation in progress flag
    this._dom = {}; // Notification handler container
    this._active = {}; // Active notifications object : retrieve a notification using its ID (this._active[ID])
    this._queue = {}; // Queue notifications when max active has been reached
    this._history = []; // Notification history
    this._default = {}; // Will contain all default value for Notification

    this._position = '';
    this._thickBorder = '';
    this._duration = 0;
    this._transition = 0;
    this._maxActive = 0;

    this._init(options);
    this._attach();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Create the handler DOM element, set default values, test given options and properly add CSS class to the handler
   * @param {object} [options] - The notification handler global options
   * @param {string} [options.position=top-right] - <i>top-left; top-right; bottom-left; bottom-right;</i>
   * @param {string} [options.thickBorder=top] - <i>top; bottom; left; right; none;</i>
   * @param {number} [options.duration=3000] - Notification life cycle duration (in ms) in range N*
   * @param {number} [options.transition=100]  - Notification fade animation transition timing (in ms) in range N*
   * @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N*
   **/
  _init(options) {
    this._dom = document.createElement('DIV'); // Notification handler DOM container
    this._dom.classList.add('notification-container'); // Set proper CSS class

    this._default = {
      handler: {
        position: 'top-right',
        thickBorder: 'top',
        duration: 5000,
        transition: 200,
        maxActive: 10
      },
      notification: {
        type: 'info',
        message: '',
        title: '',
        iconless: false,
        closable: true,
        sticky: false,
        renderTo: this._dom,
        CBtitle: '',
        callback: null
      },
      color: {
        success: 'rgb(76, 175, 80)',
        info: 'rgb(3, 169, 244)',
        warning: 'rgb(255, 152, 0)',
        error: 'rgb(244, 67, 54)'
      }
    };

    this._position = options === undefined ? this._default.handler.position : options.position === undefined ? this._default.handler.position : options.position;
    this._thickBorder = options === undefined ? this._default.handler.thickBorder : options.thickBorder === undefined ? this._default.handler.thickBorder : options.thickBorder;
    this._duration = options === undefined ? this._default.handler.duration : options.duration === undefined ? this._default.handler.duration : options.duration;
    this._transition = options === undefined ? this._default.handler.transition : options.transition === undefined ? this._default.handler.transition : options.transition;
    this._maxActive = options === undefined ? this._default.handler.maxActive : options.maxActive === undefined ? this._default.handler.maxActive : options.maxActive;

    if (this._position !== 'top-left' && this._position !== 'top-right' && this._position !== 'bottom-left' && this._position !== 'bottom-right') { // Illegal value for position
      this._position = this._default.handler.position; // Default value
    }

    if (this._thickBorder !== 'top' && this._thickBorder !== 'bottom' && this._thickBorder !== 'left' && this._thickBorder !== 'right' && this._thickBorder !== 'none') { // Illegal value for thick border
      this._thickBorder = this._default.handler.thickBorder; // Default value
    }

    if (typeof this._duration !== 'number' || this._duration <= 0) { // Illegal value for duration
      this._duration = this._default.handler.duration; // Default value
    }

    if (this._duration < (this._transition * 2)) { // Transition over (duration / 2)
      this._transition = this._default.handler.transition; // Default value for _maxActive
    }

    if (typeof this._maxActive !== 'number' || this._maxActive <= 0) { // Illegal value for maxActive
      this._maxActive = this._default.handler.maxActive; // Default value for _maxActive
    }

    this._dom.classList.add(this._position); // Add position CSS class only after this._position is sure to be a valid value
  }

  /**
   * @method
   * @name _attach
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Attach the notification handler to the dom using a fragment
   **/
  _attach() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom);
    document.body.appendChild(fragment);
  }

  /**
   * @method
   * @name _events
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Handle mouse events for the given notification
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.closable - Make notification closable flag
   **/
  _events(notification) {
    let closeFired = false; // Close fired flag

    // Inner callback functions
    const _unDim = () => { // Undim notification
      if (notification.isDimmed) {
        this._unDim(notification);
      }
    };

    const _close = () => { // Close notification
      if (this._active[notification.id] === undefined) {
        return;
      }

      // Update counter DOM element
      if (notification.requestCount > 1) {
        this._decrementRequestCounter(notification, true);
      }

      // Remove notification element from the DOM tree
      else if (!closeFired) {
        closeFired = true;
        window.clearTimeout(notification.timeoutID); // Clear life cycle timeout
        notification.dom.close.removeEventListener('click', _close); // Avoid error when spam clicking the close button
        this._close(notification);
      }
    };

    const _resetTimeout = () => { // Reset life cycle timeout
      if (this._active[notification.id] === undefined) {
        return;
      }

      if (!closeFired && !notification.isDimmed) { // Only reset timeout if no close event has been fired
        this._resetTimeout(notification);
      }
    };

    // Mouse event listeners
    if (notification.sticky) {
      notification.dom.addEventListener('mouseenter', _unDim.bind(this));
      notification.dom.addEventListener('mouseout', _unDim.bind(this));
    }

    if (notification.closable) {
      notification.dom.addEventListener('click', _close.bind(this));
      notification.dom.close.addEventListener('click', _close.bind(this));
    }

    notification.dom.addEventListener('mouseover', _resetTimeout.bind(this));
  }

  /**
   * @method
   * @name _buildUI
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Builds the DOM element that contains and that adapts to all given options
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {string} notification.type - Error, Warning, Info, Success
   * @param {string} notification.title - Notification title
   * @param {string} notification.message - Notification message
   * @param {boolean} notification.iconless - No icon flag
   * @param {string} notification.thickBorder - Notification border side (override handler side value)
   * @param {boolean} notification.closable - Make notification closable flag
   * @param {boolean} notification.sticky - Make notification sticky flag
   * @param {string} notification.CBtitle - Notification callback title
   * @param {function} notification.callback - Notification callback button
   * @returns {object} Enhanced and ready notification object
   **/
  _buildUI(notification) {
    notification.requestCount = 1;
    notification.totalRequestCount = 1;

    // Create notification DOM elements
    notification.dom = document.createElement('DIV');
    notification.dom.icon = document.createElement('IMG');
    notification.dom.text = document.createElement('DIV');
    notification.dom.close = document.createElement('DIV');
    notification.dom.maintitle = document.createElement('H6');
    notification.dom.message = document.createElement('P');

    // Class assignation
    notification.dom.classList.add('notification');
    notification.dom.icon.classList.add('icon-container');
    notification.dom.text.classList.add('text-container');
    notification.dom.close.classList.add('close');

    // Changing border side
    if (notification.thickBorder === 'top') {
      notification.dom.classList.add('top-border');
    } else if (notification.thickBorder === 'bottom') {
      notification.dom.classList.add('bottom-border');
    } else if (notification.thickBorder === 'left') {
      notification.dom.classList.add('left-border');
    } else if (notification.thickBorder === 'right') {
      notification.dom.classList.add('right-border');
    }

    // Text modification
    notification.dom.maintitle.innerHTML = notification.title;
    notification.dom.message.innerHTML = notification.message;
    notification.dom.close.innerHTML = '&#x2716;';

    // Type specification (title, icon, color)
    if (notification.type === 'success') {
      notification.dom.classList.add('success');
      if (!notification.iconless) {
        notification.dom.icon.src = '/static/img/utils/Notification.js/success.svg';
      }
    } else if (notification.type === 'warning') {
      notification.dom.classList.add('warning');
      if (!notification.iconless) {
        notification.dom.icon.src = '/static/img/utils/Notification.js/warning.svg';
      }
    } else if (notification.type === 'error') {
      notification.dom.classList.add('error');
      if (!notification.iconless) {
        notification.dom.icon.src = '/static/img/utils/Notification.js/error.svg';
      }
    } else if (notification.type === 'info') {
      notification.dom.classList.add('info');
      if (!notification.iconless) {
        notification.dom.icon.src = '/static/img/utils/Notification.js/info.svg';
      }
    }

    if (notification.iconless) {
      notification.dom.message.classList.add('iconless-width');
    }

    notification.dom.text.appendChild(notification.dom.maintitle);
    notification.dom.text.appendChild(notification.dom.message);

    // Add callback button and listener if needed
    if (notification.callback) {
      const callbackButton = document.createElement('BUTTON');
      callbackButton.innerHTML = notification.CBtitle;
      notification.dom.text.appendChild(callbackButton);

      callbackButton.addEventListener('click', () => {
        this._close(notification);
        notification.callback();
      });
    }

    // Fill notification DOM element
    if (!notification.iconless) {
      notification.dom.appendChild(notification.dom.icon);
    }

    notification.dom.appendChild(notification.dom.text);

    // Append close button if needed
    if (notification.closable) {
      notification.dom.appendChild(notification.dom.close);
    }

    // Return final notification
    return notification;
  }

  /**
   * @method
   * @name _start
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Call this method to add the new notification to the DOM container, and launch its life cycle
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   **/
  _start(notification) {
    if (Object.keys(this._active).length >= this._maxActive) {
      this._queue[notification.id] = notification;
    } else {
      this._active[notification.id] = notification; // Append the new notification to the _active object

      this._events(notification); // Listen to mouse events on the newly created notification
      this._open(notification); // Open the new notification

      notification.timeoutID = window.setTimeout(() => {
        this._checkCounter(notification); // Check notification request count to act accordingly
      }, notification.duration); // Use Notification master duration
    }
  }

  /**
   * @method
   * @name _open
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Open and add the notification to the container
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   **/
  _open(notification) {
    // Reverse insertion when notifications are on bottom
    if (this._position === 'bottom-right' || this._position === 'bottom-left') {
      notification.renderTo.insertBefore(notification.dom, notification.renderTo.firstChild);
    } else {
      notification.renderTo.appendChild(notification.dom);
    }

    notification.opened = Date.now();

    window.setTimeout(() => {
      notification.dom.style.opacity = 1;
    }, 10);
  }

  /**
   * @method
   * @name _close
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Close and remove the notification from the container
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {boolean} notification.isClosing - Already closing flag
   * @param {object} notification.dom - Notifiction DOM element
   * @param {object} notification.renderTo - DOM object to render the notification in
   **/
  _close(notification) {
    if (notification.isClosing) { // Avoid double close on a notification (in case dismiss/dismissAll is triggerred when notification is already closing)
      return;
    }

    notification.isClosing = true; // Lock notification to one fadeOut animation
    notification.closed = Date.now();
    notification.effectiveDuration = notification.closed - notification.opened;
    notification.dom.style.opacity = 0;
    // TODO hadle this._transition instead of hard code in css

    window.setTimeout(() => {
      this._updateHistory(notification);
      notification.renderTo.removeChild(notification.dom); // Remove this notification from the DOM tree

      if (Object.keys(this._queue).length > 0) { // Notification queue is not empty
        this._start(this._queue[Object.keys(this._queue)[0]]); // Start first queued notification
        delete this._queue[Object.keys(this._queue)[0]]; // Shift queue object
      } else if (Object.keys(this._active).length === 0) { // Check this._active emptyness
        this._dismissAllLock = false; // Unlock dismissAllLock
      }
    }, 1000); // Transition value set in _notification.scss TODO same as few lines up
  }

  /**
   * @method
   * @name _incrementRequestCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method is called when a notification is requested another time
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   **/
  _incrementRequestCounter(notification) {
    ++notification.requestCount; // Increment notification.requestCount

    if (notification.totalRequestCount < notification.requestCount) {
      notification.totalRequestCount = notification.requestCount;
    }

    // Update counter DOM element
    if (notification.requestCount > 1) {
      // Update existing counter
      if (notification.dom.counter) {
        notification.dom.counter.innerHTML = notification.requestCount;
      }

      // Create counter DOm element
      else {
        notification.dom.counter = document.createElement('DIV');
        notification.dom.counter.classList.add('counter');
        notification.dom.counter.innerHTML = notification.requestCount;
        notification.dom.appendChild(notification.dom.counter);
      }
    }

    // Undim notification if it is a sticky/dimmed one
    if (notification.sticky && notification.isDimmed) {
      this._unDim(notification);
    }
  }

  /**
   * @method
   * @name _decrementRequestCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method is called each notification cycle end to update its inner counter
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notification DOM element
   * @param {boolean} force - To force the notification.requestCount decrementation
   **/
  _decrementRequestCounter(notification, force) {
    if (notification.sticky && !force) {
      if (!notification.isDimmed) {
        this._dim(notification);
      }

      return;
    }

    this._resetTimeout(notification);
    --notification.requestCount; // Decrement notification.requestCount

    // Update counter DOM element
    if (notification.requestCount > 1) {
      notification.dom.counter.innerHTML = notification.requestCount;
    }

    // Remove counter element from the DOM tree
    else {
      notification.dom.removeChild(notification.dom.counter);
      delete notification.dom.counter;
    }
  }

  /**
   * @method
   * @name _checkCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method will reset the fadeout/dim timeout or close/dim the notification depending on its requestCount
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notifiction DOM element
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   **/
  _checkCounter(notification) {
    // This notification as still more than one cycle to live
    if (notification.requestCount > 1) {
      this._decrementRequestCounter(notification);
    }

    // This notification reached the end of its life cycle
    else {
      if (notification.renderTo.contains(notification.dom)) {
        window.clearTimeout(notification.timeoutID);
        notification.sticky ? this._dim(notification) : this._close(notification); // FadeOut/Dim depending on sticky behavior
      }
    }
  }

  /**
   * @method
   * @name _clearRequestCount
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Method that clear every pending request
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   **/
  _clearRequestCount(notification) {
    notification.requestCount = 1;
    notification.dom.removeChild(notification.dom.counter);
    delete notification.dom.counter;
  }

  /**
   * @method
   * @name _resetTimeout
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Use this to reset a notification life cycle, and delay its close event
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   **/
  _resetTimeout(notification) {
    window.clearTimeout(notification.timeoutID); // Clear previpous life cycle

    notification.timeoutID = window.setTimeout(() => {
      this._checkCounter(notification); // Check notification request count to act accordingly
    }, notification.duration); // Use Notification master duration
  }

  /**
   * @method
   * @name _updateHistory
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Add a notification to the history. Might be executed when a notification is being closed
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   **/
  _updateHistory(notification) {
    // Remove this notification from the active object
    delete this._active[notification.id];

    // Work notification copy
    const cleanEntry = JSON.parse(JSON.stringify(notification));

    // Clear notification object from working attributes
    delete cleanEntry.isClosing;
    delete cleanEntry.isDimmed;
    delete cleanEntry.requestCount;
    delete cleanEntry.timeoutID;
    delete cleanEntry.renderTo;
    delete cleanEntry.dom;

    // Save notification to the history
    this._history.push(cleanEntry);
  }

  /**
   * @method
   * @name _dim
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Only useful for sticky notification that dim instead of close at the end of its life cycle
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   **/
  _dim(notification) {
    const that = this;
    let i = 100;
    (function halfFadeOut() { // Start animation immediatly
      if (i >= 0) {
        notification.dom.style.opacity = i / 100;
        --i;

        if (i === 50 && notification.sticky) { // Opacity has reached 0.51
          notification.dom.style.opacity = 0.5; // Set half transparency on notification
          notification.isDimmed = true; // Update notification dim status
          return; // End function
        }
      }

      window.setTimeout(halfFadeOut, that._transition / 100); // Split animation transition into 100 iterations (50 for real here)
    })();
  }

  /**
   * @method
   * @name _unDim
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Call this method when a notification is not inactive anymore
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   **/
  _unDim(notification) {
    const that = this;
    let i = 50;
    (function halfFadeIn() {
      if (i < 100) {
        notification.dom.style.opacity = i / 100;
        ++i;
      } else if (i === 100) {
        notification.dom.style.opacity = 1; // Set full visibility on notification
        notification.isDimmed = false; // Update notification dim status
        that._resetTimeout(notification); // Reset life cycle timeout
        return; // End function
      }

      window.setTimeout(halfFadeIn, that._transition / 100); // Split animation transition into 100 iterations (50 for real here)
    })();
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name new
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a notification according to the given options, then append it to notification container.
   * @param {object} options - The notification options object
   * @param {string} options.type - <i>Error; Warning; Info; Success;</i>
   * @param {string} [options.title=options.type] - Notification title
   * @param {string} options.message - Notification message
   * @param {number} [options.duration=handler] - Notification duration (override handler duration value)
   * @param {boolean} [options.iconless=false] - No icon flag
   * @param {string} [options.thickBorder=handler] - Notification border side (override handler side value)
   * @param {boolean} [options.closable=true] - Make notification closable flag
   * @param {boolean} [options.sticky=false] - Make notification sticky flag
   * @param {object} [options.renderTo=handler] - Dom object to render the notification in
   * @param {string} [options.CBtitle=Callback] - Notification callback title
   * @param {function} [options.callback=undefined] - Notification callback button
   * @returns {number} The newly created notification ID
   **/
  new(options) {
    // Check for mandatory arguments existence
    if (options === undefined || options.type === undefined || (options.message === undefined || options.message === '')) {
      return -1;
    }

    // Check for unclosable at all notification
    if (options.sticky && options.closable === false && options.callback === undefined) {
      return -1;
    }

    // Test Notification inner variables validity
    if (options.type !== 'info' && options.type !== 'success' && options.type !== 'warning' && options.type !== 'error') {
      options.type = this._default.notification.type;
    }

    if (this._dismissAllLock) {
      this._dismissAllLock = false; // Unlock dismissAllLock
    }

    // Build notification DOM element according to the given options
    let notification = this._buildUI({
      id: Utils.idGenerator(options.type + '' + options.message, 5), // Generating an ID of 5 characters long from notification mandatory fields
      type: options.type,
      message: options.message,
      title: options.title === undefined ? this._default.notification.title : options.title,
      duration: options.duration === undefined ? this._duration : options.duration,
      iconless: options.iconless === undefined ? this._default.notification.iconless : options.iconless,
      thickBorder: options.thickBorder === undefined ? this._thickBorder : options.thickBorder,
      closable: options.closable === undefined ? this._default.notification.closable : options.closable,
      sticky: options.sticky === undefined ? this._default.notification.sticky : options.sticky,
      renderTo: options.renderTo === undefined ? this._default.notification.renderTo : options.renderTo,
      CBtitle: options.CBtitle === undefined ? this._default.notification.CBtitle : options.CBtitle,
      callback: options.callback === undefined ? this._default.notification.callback : options.callback,
      isDimmed: false // Only usefull if sticky is set to true
    });

    // Create a new notification in the container: No notification with the same ID is already open
    if (!this._active[notification.id]) {
      this._start(notification);
    }

    // Use existing notification: increment request count and reset timeout
    else {
      this._resetTimeout(this._active[notification.id]);
      this._incrementRequestCounter(this._active[notification.id]);
      notification = {}; // Clear local new notification since it already exists in this._active
    }

    return notification.id;
  }

  /**
   * @method
   * @name info
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build an info notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID
   **/
  info(options) {
    options.type = 'info';
    return this.new(options);
  }

  /**
   * @method
   * @name success
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a success notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID
   **/
  success(options) {
    options.type = 'success';
    return this.new(options);
  }

  /**
   * @method
   * @name warning
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a warning notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID
   **/
  warning(options) {
    options.type = 'warning';
    return this.new(options);
  }

  /**
   * @method
   * @name error
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build an error notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID
   **/
  error(options) {
    options.type = 'error';
    return this.new(options);
  }

  /**
   * @method
   * @name dismiss
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Dismiss a specific notification via its ID
   * @param {number} id - The notification ID to dismiss
   **/
  dismiss(id) {
    window.clearTimeout(this._active[id].timeoutID); // Clear notification timeout

    if (this._active[id].requestCount > 1) { // Several request are pending
      this._clearRequestCount(this._active[id]); // Clear all pending request
    }

    this._close(this._active[id]); // Close notification
  }

  /**
   * @method
   * @name dismissAll
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Clear the notification handler from all its active notifications
   **/
  dismissAll() {
    if (!this._dismissAllLock && Object.keys(this._active).length !== 0) { // Check that _dimissAllLock is disable and that there is still notification displayed
      this._dismissAllLock = true; // dismissAllLock will be unlocked at the last _close() method call
      this._queue = {}; // Clear queue object

      for (const id in this._active) { // Iterate over notifications
        this.dismiss(id);
      }
    }
  }

  /**
   * @method
   * @name dismissType
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Dismiss all notifications from a given type
   * @param {string} type - <i>succes; info; warning; error;</i>
   **/
  dismissType(type) {
    if (Object.keys(this._active).length !== 0) { // Check that _dimissAllLock is disable and that there is still notification displayed
      for (const id in this._active) { // Iterate over notifications
        if (this._active[id].type === type) {
          this.dismiss(id);
        }
      }
    }
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getHistoryLength() {
    return this._history.length;
  }
  getHistory() {
    return this._history;
  }

}

export default Notification;
