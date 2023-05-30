class Notification {


  /** @summary Create an instance of a notification handler
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build the notification singleton handler that will handle all incoming Notifications
   * @param {object} [options] - The notification handler global options
   * @param {string} [options.position=top-right] - <i>top-left; top-right; bottom-left; bottom-right;</i>
   * @param {string} [options.thickBorder=top] - <i>top; bottom; left; right; none;</i>
   * @param {number} [options.duration=3000] - Notification life cycle duration (in ms) in range N*
   * @param {number} [options.transition=100] - Notification fade animation transition timing (in ms) in range N*
   * @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N* */
  constructor(options) {
    if (Notification.instance) { // GoF Singleton
      return Notification.instance;
    }
    Notification.instance = this;
    // Attributes declaration
    /** @private
     * @member {boolean} - Dismiss all operation in progress flag */
    this._dismissAllLock = false;
    /** @private
     * @member {object} - Notification handler container node */
    this._dom = {};
    /** @private
     * @member {object} - Active notifications object : retrieve a notification using its ID (this._active[ID]) */
    this._active = {};
    /** @private
     * @member {object} - Queue notifications when max active has been reached */
    this._queue = {};
    /** @private
     * @member {object} - Notification handler default values */
    this._default = {};
    /** @private
     * @member {string} - The handler position in viewport - <i>top-left; top-right; bottom-left; bottom-right;</i> */
    this._position = '';
    /** @private
     * @member {string} - The thick border position in the Notification - <i>top; bottom; left; right; none;</i> */
    this._thickBorder = '';
    /** @private
     * @member {number} - The Notification on screen duration in ms */
    this._duration = 0;
    /** @private
     * @member {number} - The fade transition time in ms */
    this._transition = 0;
    /** @private
     * @member {number} - The maximum amount of active Notification */
    this._maxActive = 0;
    /** @public
     * @member {number} - The component version */
    this.version = '1.1.0';
    // Build singleton and attach
    this._init(options);
    // Return singleton
    return this;
  }


  /** @method
   * @name destroy
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Destroy the singleton and detach it from the DOM */
  destroy() {
    document.body.removeChild(this._dom);
    // Delete object attributes
    Object.keys(this).forEach(key => {
      delete this[key];
    });
    // Clear singleton instance
    Notification.instance = null;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------  NOTIFICATION JS HANDLER CONSTRUCTION METHODS  --------------------------------  */
  /*                                                                                                                  */
  /*  The following methods only concerns the singleton creation. It handle all arguments and will fallback on        */
  /*  default values if any argument doesn't meet its expected value or type.                                         */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
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
   * @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N* */
  _init(options) {
    // Declare options as object if empty
    if (options === undefined) {
      options = {};
    }
    // Create notification main container
    this._dom = document.createElement('DIV'); // Notification handler DOM container
    this._dom.classList.add('notification-container'); // Set proper CSS class
    // Notification.js default values
    this._default = {
      handler: {
        position: 'top-right',
        thickBorder: 'top',
        duration: 4000,
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
        callback: null,
        isDimmed: false
      },
      color: {
        success: 'rgb(76, 175, 80)',
        info: 'rgb(3, 169, 244)',
        warning: 'rgb(255, 152, 0)',
        error: 'rgb(244, 67, 54)'
      },
      svgPath: {
        success: 'M12.5 0C5.602 0 0 5.602 0 12.5S5.602 25 12.5 25 25 19.398 25 12.5 19.398 0 12.5 0zm-2.3 18.898l-5.5-5.5 1.8-1.796 3.7 3.699L18.5 7l1.8 1.8zm0 0',
        info: 'M12.504.035a12.468 12.468 0 100 24.937 12.468 12.468 0 000-24.937zM15.1 19.359c-.643.25-1.153.445-1.537.576-.384.134-.825.199-1.333.199-.775 0-1.381-.192-1.813-.57a1.832 1.832 0 01-.642-1.442c0-.227.015-.459.047-.693.03-.24.083-.504.154-.806l.802-2.835c.069-.272.132-.527.182-.77.048-.244.069-.467.069-.668 0-.36-.075-.615-.223-.756-.153-.144-.437-.213-.857-.213-.207 0-.422.036-.639.095a9.914 9.914 0 00-.56.184l.213-.874a19.777 19.777 0 011.51-.549 4.48 4.48 0 011.361-.23c.77 0 1.368.19 1.784.56a1.857 1.857 0 01.626 1.452c0 .122-.012.341-.04.652a4.44 4.44 0 01-.162.856l-.798 2.831a8.133 8.133 0 00-.176.775c-.05.288-.075.51-.075.66 0 .374.082.633.251.771.165.134.458.202.875.202.192 0 .412-.037.66-.1.243-.073.42-.127.531-.18zm-.144-11.483a1.901 1.901 0 01-1.343.518 1.93 1.93 0 01-1.352-.518 1.65 1.65 0 01-.562-1.258 1.688 1.688 0 01.562-1.266 1.914 1.914 0 011.35-.522c.524 0 .975.173 1.345.523a1.673 1.673 0 01.56 1.266 1.65 1.65 0 01-.56 1.257z',
        warning: 'M24.585 21.17L13.774 3.24a1.51 1.51 0 00-2.586 0L.376 21.17a1.51 1.51 0 001.293 2.29h21.623a1.51 1.51 0 001.292-2.29zM12.49 8.714c.621 0 1.146.35 1.146.97 0 1.895-.223 4.618-.223 6.513 0 .494-.541.7-.923.7-.51 0-.94-.208-.94-.701 0-1.894-.223-4.617-.223-6.511 0-.62.51-.971 1.163-.971zm.015 11.734a1.225 1.225 0 01-1.225-1.226c0-.669.525-1.227 1.225-1.227.652 0 1.21.558 1.21 1.227 0 .652-.557 1.225-1.21 1.225z',
        error: 'M12.469.027c-3.332 0-6.465 1.301-8.824 3.653-4.86 4.86-4.86 12.777 0 17.636a12.392 12.392 0 008.824 3.653c3.336 0 6.465-1.301 8.824-3.653 4.863-4.859 4.863-12.777 0-17.636A12.417 12.417 0 0012.469.027zm5.61 18.086a1.137 1.137 0 01-.802.332c-.285 0-.582-.113-.8-.332l-4.008-4.008-4.008 4.008a1.137 1.137 0 01-.8.332c-.286 0-.583-.113-.802-.332a1.132 1.132 0 010-1.605l4.008-4.004L6.86 8.496a1.132 1.132 0 010-1.605 1.127 1.127 0 011.602 0l4.008 4.007 4.008-4.007a1.127 1.127 0 011.601 0c.45.449.45 1.164 0 1.605l-4.004 4.008 4.004 4.004c.45.449.45 1.164 0 1.605zm0 0'
      }
    };
    // Build singleton from options and sanitize them
    this._setOptionsDefault(options);
    this._position = options.position;
    this._thickBorder = options.thickBorder;
    this._duration = options.duration;
    this._transition = options.transition;
    this._maxActive = options.maxActive;
    this._setAttributesDefault();
    // Add position CSS class only after this._position is sure to be a valid value
    this._dom.classList.add(this._position);
    this._attach();
  }


  /** @method
   * @name _setOptionsDefault
   * @private
   * @memberof Notification
   * @summary Set singleton options
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Build the notification singleton according to the user options
   * @param {object} options - The singleton options to set */
  _setOptionsDefault(options) {
    if (options.position === undefined) {
      options.position = this._default.handler.position;
    }

    if (options.thickBorder === undefined) {
      options.thickBorder = this._default.handler.thickBorder;
    }

    if (options.duration === undefined) {
      options.duration = this._default.handler.duration;
    }

    if (options.transition === undefined) {
      options.transition = this._default.handler.transition;
    }

    if (options.maxActive === undefined) {
      options.maxActive = this._default.handler.maxActive;
    }
  }


  /** @method
   * @name _setAttributesDefault
   * @private
   * @memberof Notification
   * @summary Check the notification singleton options validity
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Fallback on default attributes value if the notification singleton options are invalid */
  _setAttributesDefault() {
    if (this._position !== 'top-left' && /* Illegal value for position */
      this._position !== 'top-right' &&
      this._position !== 'bottom-left' &&
      this._position !== 'bottom-right') {
      this._position = this._default.handler.position; // Default value
    }

    if (this._thickBorder !== 'top' && /* Illegal value for thick border */
      this._thickBorder !== 'bottom' &&
      this._thickBorder !== 'left' &&
      this._thickBorder !== 'right' &&
      this._thickBorder !== 'none') {
      this._thickBorder = this._default.handler.thickBorder; // Default value
    }

    if (typeof this._duration !== 'number' || this._duration <= 0) { // Illegal value for duration
      this._duration = this._default.handler.duration; // Default value
    }

    if (typeof this._transition !== 'number' || this._duration < (this._transition * 2) || this._transition <= 0) { // Transition over (duration / 2)
      this._transition = this._default.handler.transition; // Default value for _maxActive
    }

    if (typeof this._maxActive !== 'number' || this._maxActive <= 0) { // Illegal value for maxActive
      this._maxActive = this._default.handler.maxActive; // Default value for _maxActive
    }
  }


  /** @method
   * @name _attach
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Attach the notification handler to the dom using a fragment */
  _attach() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom);
    document.body.appendChild(fragment);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------  NOTIFICATION SPECIFIC METHODS  ----------------------------------------  */
  /*                                                                                                                  */
  /*  The following methods implements notification features. It handle its events, lifecycle depending on its        */
  /*  parameters, its DOM structure, and its animations. The Notification singleton will handle the notification      */
  /*  stacking the in user interface.                                                                                 */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _events
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Handle mouse events for the given notification
   * @param {{id: number}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.closable - Make notification closable flag */
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


  /** @method
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
   * @returns {object} Enhanced and ready notification object */
  _buildUI(notification) {
    notification.requestCount = 1;
    notification.totalRequestCount = 1;
    this._buildUIDom(notification);
    this._buildNotificationType(notification);

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


  /** @method
   * @name _buildUIDom
   * @private
   * @memberof Notification
   * @summary Create the Notification DOM tree
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Build all the Notification internal structure
   * @param {object} notification - The notification to create */
  _buildUIDom(notification) {
    // Create notification DOM elements
    notification.dom = document.createElement('DIV');
    notification.dom.icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    notification.dom.iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    notification.dom.text = document.createElement('DIV');
    notification.dom.close = document.createElement('DIV');
    notification.dom.maintitle = document.createElement('H6');
    notification.dom.message = document.createElement('P');
    // Class assignation
    notification.dom.classList.add('notification');
    notification.dom.icon.classList.add('vector-container');
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
    notification.dom.maintitle.innerHTML = notification.title || '';
    notification.dom.message.innerHTML = notification.message || '';
    notification.dom.close.innerHTML = '&#x2716;';
    // Image vector
    notification.dom.icon.setAttribute('viewBox', '0 0 25 25');
    notification.dom.icon.setAttribute('width', '25');
    notification.dom.icon.setAttribute('height', '25');
    notification.dom.icon.appendChild(notification.dom.iconPath);
  }


  /** @method
   * @name _buildNotificationType
   * @private
   * @memberof Notification
   * @summary Attach proper assets and css
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Fills the Notification icon and class according to its inner type
   * @param {object} notification - The notification to fill */
  _buildNotificationType(notification) {
    // Type specification (title, icon, color)
    if (['success', 'warning', 'error', 'info'].indexOf(notification.type) !== -1){
      notification.dom.classList.add(notification.type);

      if (!notification.iconless) {
        notification.dom.iconPath.setAttribute('fill', this._default.color[notification.type]);
        notification.dom.iconPath.setAttribute('d', this._default.svgPath[notification.type]);
      }
    } else {
      notification.dom.classList.add('info');

      if (!notification.iconless) {
        notification.dom.iconPath.setAttribute('fill', this._default.color.info);
        notification.dom.iconPath.setAttribute('d', this._default.svgPath.info);
      }
    }
  }


  /** @method
   * @name _start
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Call this method to add the new notification to the DOM container, and launch its life cycle
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification own ID */
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


  /** @method
   * @name _open
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Open and add the notification to the container
   * @param {{id: number}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element */
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


  /** @method
   * @name _close
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Close and remove the notification from the container
   * @param {{id: number}|{id: number, dom: Object, requestCount: number, timeoutID: number, sticky: boolean, closable: boolean}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {boolean} notification.isClosing - Already closing flag
   * @param {object} notification.dom - Notifiction DOM element
   * @param {object} notification.renderTo - DOM object to render the notification in */
  _close(notification) {
    if (notification.isClosing) { // Avoid double close on a notification (in case dismiss/dismissAll is triggerred when notification is already closing)
      return;
    }

    notification.isClosing = true; // Lock notification to one fadeOut animation
    notification.closed = Date.now();
    notification.effectiveDuration = notification.closed - notification.opened;
    notification.dom.style.opacity = 0;
    window.setTimeout(() => {
      notification.renderTo.removeChild(notification.dom); // Remove this notification from the DOM tree
      delete this._active[notification.id];

      if (Object.keys(this._queue).length > 0) { // Notification queue is not empty
        this._start(this._queue[Object.keys(this._queue)[0]]); // Start first queued notification
        delete this._queue[Object.keys(this._queue)[0]]; // Shift queue object
      } else if (Object.keys(this._active).length === 0) { // Check this._active emptyness
        this._dismissAllLock = false; // Unlock dismissAllLock
      }
    }, 1000); // Transition value set in _notification.scss
  }


  /** @method
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
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true) */
  _incrementRequestCounter(notification) {
    ++notification.requestCount; // Increment notification.requestCount

    if (notification.totalRequestCount < notification.requestCount) {
      notification.totalRequestCount = notification.requestCount;
    }

    // Update counter DOM element
    if (notification.requestCount > 1) {
      let valueToDisplay = '∞';
      if (notification.requestCount < 100) {
        valueToDisplay = notification.requestCount;
      }

      if (notification.dom.counter) { // Update existing counter
        notification.dom.counter.innerHTML = valueToDisplay;
      } else { // Create counter DOM element
        notification.dom.counter = document.createElement('DIV');
        notification.dom.counter.classList.add('counter');
        notification.dom.counter.innerHTML = valueToDisplay;
        notification.dom.appendChild(notification.dom.counter);
      }
    }

    // Undim notification if it is a sticky/dimmed one
    if (notification.sticky && notification.isDimmed) {
      this._unDim(notification);
    }
  }


  /** @method
   * @name _decrementRequestCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method is called each notification cycle end to update its inner counter
   * @param {{id: number, dom: Object, requestCount: number, timeoutID: number, sticky: boolean, closable: boolean}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notification DOM element
   * @param {boolean} force - To force the notification.requestCount decrementation */
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
      let valueToDisplay = '∞';
      if (notification.requestCount < 100) {
        valueToDisplay = notification.requestCount;
      }

      notification.dom.counter.innerHTML = valueToDisplay;
    } else { // Remove counter element from the DOM tree
      notification.dom.removeChild(notification.dom.counter);
      delete notification.dom.counter;
    }
  }


  /** @method
   * @name _checkCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method will reset the fadeout/dim timeout or close/dim the notification depending on its requestCount
   * @param {{id: number}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notifiction DOM element
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   * @param {boolean} notification.sticky - Notification sticky behvaior */
  _checkCounter(notification) {
    // This notification as still more than one cycle to live
    if (notification.requestCount > 1) {
      this._decrementRequestCounter(notification);
    } else { // This notification reached the end of its life cycle
      if (notification.renderTo.contains(notification.dom)) {
        window.clearTimeout(notification.timeoutID);
        if (notification.sticky) { // FadeOut/Dim depending on sticky behavior
          this._dim(notification);
        } else {
          this._close(notification);
        }
      }
    }
  }


  /** @method
   * @name _clearRequestCount
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Method that clear every pending request
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element */
  _clearRequestCount(notification) {
    notification.requestCount = 1;
    notification.dom.removeChild(notification.dom.counter);
    delete notification.dom.counter;
  }


  /** @method
   * @name _resetTimeout
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Use this to reset a notification life cycle, and delay its close event
   * @param {{id: number}|{id: number, dom: Object, requestCount: number, timeoutID: number, sticky: boolean, closable: boolean}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.timeoutID - Notification own setTimeout ID */
  _resetTimeout(notification) {
    window.clearTimeout(notification.timeoutID); // Clear previous life cycle
    notification.timeoutID = window.setTimeout(() => {
      this._checkCounter(notification); // Check notification request count to act accordingly
    }, notification.duration); // Use Notification master duration
  }


  /** @method
   * @name _dim
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Only useful for sticky notification that dim instead of close at the end of its life cycle
   * @param {{id: number, requestCount: number, dom: Object, timeoutID: number, sticky: boolean}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true) */
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


  /** @method
   * @name _unDim
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Call this method when a notification is not inactive anymore
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true) */
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


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------  SINGLE NOTIFICATION CONSTRUCTION UTILS METHODS  -------------------------------  */
  /*                                                                                                                  */
  /*  The following methods only concerns a new notification request. It will test the options validity, default to   */
  /*  fallback value if necessary and give the notification a pseudo unique identifier.                               */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _checkNotificationOptionsValidity
   * @private
   * @memberof Notification
   * @summary Check the Notification options validity
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Check a Notification options object against the required parameters.
   * @param {object} options - The notification options to check validity */
  _checkNotificationOptionsValidity(options) {
    // Check for mandatory arguments existence
    if (options === undefined || (options.type === undefined || options.message === undefined)) {
      return false;
    }
    // Check existing message
    if (typeof options.message !== 'string' || options.message.length === 0) {
      return false;
    }
    // Check for unclosable at all notification
    if (options.sticky && options.closable === false) {
      return false;
    }
    // Test Notification inner variables validity
    if (options.type !== 'info' && options.type !== 'success' && options.type !== 'warning' && options.type !== 'error') {
      options.type = this._default.notification.type;
    }
    // Unlock dismissAllLock
    if (this._dismissAllLock) {
      this._dismissAllLock = false;
    }

    return true;
  }


  /** @method
   * @name _setOptionsFallback
   * @private
   * @memberof Notification
   * @summary Set Notification fallback options
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Check a Notification options object and fill it with default value in case they are empty.
   * @param {object} options - The notification options to fill with default value if empty */
  _setOptionsFallback(options) {
    if (options.title === undefined) {
      options.title = this._default.notification.title;
    }

    if (options.duration === undefined) {
      options.duration = this._duration;
    }

    if (options.iconless === undefined) {
      options.iconless = this._default.notification.iconless;
    }

    if (options.thickBorder === undefined) {
      options.thickBorder = this._thickBorder;
    }

    if (options.closable === undefined) {
      options.closable = this._default.notification.closable;
    }

    if (options.sticky === undefined) {
      options.sticky= this._default.notification.sticky;
    }

    if (options.renderTo === undefined) {
      options.renderTo = this._default.notification.renderTo;
    }

    if (options.CBtitle === undefined) {
      options.CBtitle = this._default.notification.CBtitle;
    }

    if (options.callback === undefined) {
      options.callback = this._default.notification.callback;
    }

    if (options.isDimmed === undefined) {
      options.isDimmed = this._default.notification.isDimmed;
    }
  }


  /** @method
   * @name _idGenerator
   * @private
   * @memberof Notification
   * @summary Generate an ID
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Hash the seed to generate an ID
   * @param {string} seed - The seed string to hash
   * @param {number} length - The length of the returned ID */
  _idGenerator(seed, length) {
    /* Original code from:
     * http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
     * Tweaked to fit Notification class needs
     */
    let hash = 0;
    let character = '';

    if (seed.length === 0 || length > 12) {
      return undefined;
    }

    for (let i = 0; i < seed.length; ++i) {
      character = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + character;
      hash |= 0; // Convert to 32bit integer
    }

    return (Math.abs(hash).toString(36) + '' + Math.abs(hash / 2).toString(36).split('').reverse().join('')).substring(0, length).toUpperCase(); // Here is the twekead line
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------  NOTIFICATION PUBLIC METHODS  -----------------------------------------  */
  /*                                                                                                                  */
  /*  The following methods are the exposed API of the Notification component. It allow to raise standard or custom   */
  /*  notification without bothering their lifecycle, position or other JavaScript expensive implementation.          */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
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
   * @returns {number} The newly created notification ID */
  new(options) {
    if (this._checkNotificationOptionsValidity(options) === false) {
      console.error('Notification.js : new() options argument object is invalid.');
      return -1;
    }

    this._setOptionsFallback(options);
    // Build notification DOM element according to the given options
    let notification = this._buildUI({
      id: this._idGenerator(`${options.type}${options.message}`, 5), // Generating an ID of 5 characters long from notification mandatory fields
      type: options.type,
      message: options.message,
      title: options.title,
      duration: options.duration,
      iconless: options.iconless,
      thickBorder: options.thickBorder,
      closable: options.closable,
      sticky: options.sticky,
      renderTo: options.renderTo,
      CBtitle: options.CBtitle,
      callback: options.callback,
      isDimmed: options.isDimmed // Only useful if sticky is set to true
    });
    // Create a new notification in the container: No notification with the same ID is already open
    if (!this._active[notification.id]) {
      this._start(notification);
    } else { // Use existing notification: increment request count and reset timeout
      this._resetTimeout(this._active[notification.id]);
      this._incrementRequestCounter(this._active[notification.id]);
      notification = this._active[notification.id]; // Clear local new notification since it already exists in this._active
    }

    return notification.id;
  }


  /** @method
   * @name info
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build an info notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID */
  info(options) {
    if (options) {
      options.type = 'info';
      return this.new(options);
    } else {
      console.error('Notification.js : No arguments provided for info() method.');
      return null;
    }
  }


  /** @method
   * @name success
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a success notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID */
  success(options) {
    if (options) {
      options.type = 'success';
      return this.new(options);
    } else {
      console.error('Notification.js : No arguments provided for success() method.');
      return null;
    }
  }


  /** @method
   * @name warning
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a warning notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID */
  warning(options) {
    if (options) {
      options.type = 'warning';
      return this.new(options);
    } else {
      console.error('Notification.js : No arguments provided for warning() method.');
      return null;
    }
  }


  /** @method
   * @name error
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build an error notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID */
  error(options) {
    if (options) {
      options.type = 'error';
      return this.new(options);
    } else {
      console.error('Notification.js : No arguments provided for error() method.');
      return null;
    }
  }


  /** @method
   * @name dismiss
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Dismiss a specific notification via its ID
   * @param {string} id - The notification ID to dismiss */
  dismiss(id) {
    window.clearTimeout(this._active[id].timeoutID); // Clear notification timeout

    if (this._active[id].requestCount > 1) { // Several request are pending
      this._clearRequestCount(this._active[id]); // Clear all pending request
    }

    this._close(this._active[id]); // Close notification
  }


  /** @method
   * @name dismissAll
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Clear the notification handler from all its active notifications */
  dismissAll() {
    if (!this._dismissAllLock && Object.keys(this._active).length !== 0) { // Check that _dimissAllLock is disable and that there is still notification displayed
      this._dismissAllLock = true; // dismissAllLock will be unlocked at the last _close() method call
      this._queue = {}; // Clear queue object

      for (const id in this._active) { // Iterate over notifications
        this.dismiss(id);
      }
    }
  }


  /** @method
   * @name dismissType
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Dismiss all notifications from a given type
   * @param {string} type - <i>succes; info; warning; error;</i> */
  dismissType(type) {
    if (Object.keys(this._active).length !== 0) { // Check that _dismissAllLock is disable and that there is still notification displayed
      for (const id in this._active) { // Iterate over notifications
        if (this._active[id].type === type) {
          this.dismiss(id);
        }
      }
    }
  }


}


export default Notification;
