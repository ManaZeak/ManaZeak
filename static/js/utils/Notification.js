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
		this.DEBUG = false;
		if (this.DEBUG) { console.log('[ Notification ] constructor()', this); }

		this._dismissAllLock = false; // Dismiss all operation in progress flag
		this._dom = {}; // Notification handler container
		this._active = {}; // Active notifications object : retrieve a notification using its ID (this._active[ID])
		this._queue = {}; // Queue notifications when max active has been reached
		this._history = []; // Notification history

		this._position = '';
		this._thickBorder = '';
		this._duration = 0;
		this._transition = 0;
		this._maxActive = 0;
		this._default = {};

		this._init(options);
		this._attach();
	}

	//  --------------------------------  PRIVATE METHODS  --------------------------------  //

	/**
	* @method
	* @name _init
	* @private
	* @memberof Notification
	* @summary Init the notification handler
	* @author Arthur Beaulieu
	* @since July 2018
	* @description Create the handler DOM element, set default values, test given options and properly add CSS class to the handler
	* @param {object} [options] - The notification handler global options
	* @param {string} [options.position=top-right] - <i>top-left; top-right; bottom-left; bottom-right;</i>
	* @param {string} [options.thickBorder=top] - <i>top; bottom; left; right; none;</i>
	* @param {number} [options.duration=3000] - Notification life cycle duration (in ms) in range N*
	* @param {number} [options.transition=100]  - Notification fade animation transition timing (in ms) in range N*
	* @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N*	**/
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

		this._position = options === undefined ? this._default.handler.position : options.position  === undefined ? this._default.handler.position : options.position;
		this._thickBorder = options === undefined ? this._default.handler.thickBorder : options.thickBorder === undefined ? this._default.handler.thickBorder : options.thickBorder;
		this._duration = options === undefined ? this._default.handler.duration : options.duration === undefined ? this._default.handler.duration : options.duration;
		this._transition = options === undefined ? this._default.handler.transition : options.transition  === undefined ? this._default.handler.transition : options.transition;
		this._maxActive = options === undefined ? this._default.handler.maxActive : options.maxActive === undefined ? this._default.handler.maxActive : options.maxActive;

		if (this.DEBUG && this._position !== 'top-left' && this._position !== 'top-right' && this._position !== 'bottom-left' && this._position !== 'bottom-right') { // Illegal value for position
			console.warn('[ Notification ] constructor() | Invalid value for position' +
			'\nGiven position value of ' + this._position + ' has been replaced with ' + this._default.handler.position);
			this._position = this._default.handler.position; // Default value
		}

		if (this.DEBUG && this._thickBorder !== 'top' && this._thickBorder !== 'bottom' && this._thickBorder !== 'left' && this._thickBorder !== 'right' && this._thickBorder !== 'none') { // Illegal value for thick border
			console.warn('[ Notification ] constructor() | Invalid value for thickBorder' +
			'\nGiven position value of ' + this._thickBorder + ' has been replaced with ' + this._default.handler.position);
			this._thickBorder = this._default.handler.thickBorder; // Default value
		}

		if (this.DEBUG && typeof this._duration !== 'number' || this._duration <= 0) { // Illegal value for duration
			console.warn('[ Notification ] constructor() | Invalid value for duration' +
			'\nGiven duration value of ' + this._duration + 'ms has been replaced with ' + this._default.handler.duration + 'ms');
			this._duration = this._default.handler.duration; // Default value
		}

		if (this.DEBUG && this._duration < (this._transition * 2)) { // Transition over (duration / 2)
			console.warn('[ Notification ] constructor() | Invalid value for transition' +
			'\nGiven transition value of ' + this._transition + 'ms has been replaced with ' + this._default.handler.transition + 'ms');
			this._transition = this._default.handler.transition; // Default value for _maxActive
		}

		if (this.DEBUG && typeof this._maxActive !== 'number' || this._maxActive <= 0) { // Illegal value for maxActive
			console.warn('[ Notification ] constructor() | Invalid value for maxActive' +
			'\nGiven maxActive value of ' + this._maxActive + ' has been replaced with ' + this._default.handler.maxActive);
			this._maxActive = this._default.handler.maxActive; // Default value for _maxActive
		}

		this._dom.classList.add(this._position); // Add position CSS class only after this._position is sure to be a valid value
	}

	/**
	* @method
	* @name _attach
	* @private
	* @memberof Notification
	* @summary Attach the notification handler
	* @author Arthur Beaulieu
	* @since July 2018
	* @description Attach the notification handler to the dom using a fragment
	**/
	_attach() {
		let fragment = document.createDocumentFragment();
		fragment.appendChild(this._dom);
		document.body.appendChild(fragment);
	}

	/**
	* @method
	* @name _events
	* @private
	* @memberof Notification
	* @summary Listen to user interaction on a notification
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
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._events()'); }

		let that 	   = this,
		closeFired = false, // Close fired flag

		// Inner callback functions
		_unDim = () => { // Undim notification
			if (notification.isDimmed) {
				this._unDim(notification);
			}
		},

		_close = () => { // Close notification
			if (that._active[notification.id] === undefined) {
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
		},


		_resetTimeout = () => { // Reset life cycle timeout
			if (that._active[notification.id] === undefined) {
				return;
			}

			if (!closeFired && !notification.isDimmed) { // Only reset timeout if no close event has been fired
				that._resetTimeout(notification);
			}
		};

		// Mouse event listeners
		if (notification.sticky) {
			notification.dom.addEventListener('mouseenter', _unDim.bind(this));
			notification.dom.addEventListener('mouseout',   _unDim.bind(this));
		}

		if (notification.closable) {
			notification.dom.addEventListener('click', 		 _close.bind(this));
			notification.dom.close.addEventListener('click', _close.bind(this));
		}

		notification.dom.addEventListener('mouseover', _resetTimeout.bind(this));
	}

	/**
	* @method
	* @name _buildUI
	* @private
	* @memberof Notification
	* @summary Build a notification UI
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
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._buildUI() '); }

		notification.requestCount      = 1;
		notification.totalRequestCount = 1;

		// Create notification DOM elements
		notification.dom           = document.createElement('DIV');
		notification.dom.vector    = document.createElement('DIV');
		notification.dom.text      = document.createElement('DIV');
		notification.dom.icon      = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		notification.dom.close     = document.createElement('DIV');
		notification.dom.maintitle = document.createElement('H6');
		notification.dom.message   = document.createElement('P');

		let svgPath = document.createElementNS(notification.dom.icon.namespaceURI, 'path');

		// Class assignation
		notification.dom.classList.add('notification');
		notification.dom.vector.classList.add('vector-container');
		notification.dom.text.classList.add('text-container');
		notification.dom.close.classList.add('close');

		// Changing border side
		switch(notification.thickBorder) {
			case 'top':
			notification.dom.classList.add('top-border');
			break;
			case 'bottom':
			notification.dom.classList.add('bottom-border');
			break;
			case 'left':
			notification.dom.classList.add('left-border');
			break;
			case 'right':
			notification.dom.classList.add('right-border');
			break;
			case 'none':
			break;
		}

		// Text modification
		notification.dom.maintitle.innerHTML = notification.title;
		notification.dom.message.innerHTML   = notification.message;
		notification.dom.close.innerHTML 	   = '&#x2716;';

		// Type specification (title, icon, color)
		switch(notification.type) {
			case 'info':
			if (!notification.iconless) {
				svgPath.setAttributeNS(null, 'd', 'M 13,1.1875 C 6.476563,1.1875 1.1875,6.476563 1.1875,13 1.1875,19.523438 6.476563,24.8125 13,24.8125 19.523438,24.8125 24.8125,19.523438 24.8125,13 24.8125,6.476563 19.523438,1.1875 13,1.1875 z m 2.460938,18.308594 c -0.609375,0.238281 -1.09375,0.421875 -1.457032,0.546875 -0.363281,0.125 -0.78125,0.1875 -1.261718,0.1875 -0.734375,0 -1.308594,-0.179688 -1.71875,-0.539063 -0.40625,-0.355468 -0.609375,-0.8125 -0.609375,-1.367187 0,-0.214844 0.01563,-0.433594 0.04687,-0.65625 0.02734,-0.226563 0.07813,-0.476563 0.144531,-0.761719 l 0.761719,-2.6875 c 0.06641,-0.257812 0.125,-0.5 0.171875,-0.730469 0.04687,-0.230468 0.06641,-0.441406 0.06641,-0.632812 0,-0.339844 -0.07031,-0.582031 -0.210938,-0.714844 C 11.25,12.003906 10.980469,11.9375 10.582031,11.9375 c -0.195312,0 -0.398437,0.03125 -0.605468,0.08984 -0.207032,0.0625 -0.382813,0.121094 -0.53125,0.175781 L 9.648438,11.375 c 0.496093,-0.203125 0.972656,-0.375 1.429687,-0.519531 0.453125,-0.144531 0.886719,-0.21875 1.289063,-0.21875 0.730468,0 1.296875,0.179687 1.691406,0.53125 0.394531,0.351562 0.59375,0.8125 0.59375,1.375 0,0.117187 -0.01172,0.324219 -0.03906,0.617187 -0.02734,0.292969 -0.07813,0.5625 -0.152343,0.8125 l -0.757813,2.679688 c -0.0625,0.214844 -0.117187,0.460937 -0.167969,0.734375 -0.04687,0.273437 -0.07031,0.484375 -0.07031,0.625 0,0.355469 0.07813,0.601562 0.238281,0.730469 0.15625,0.128906 0.433594,0.191406 0.828125,0.191406 0.183594,0 0.390625,-0.03125 0.625,-0.09375 0.230469,-0.06641 0.398438,-0.121094 0.503906,-0.171875 z M 15.324219,8.617188 c -0.351563,0.328125 -0.777344,0.492187 -1.273438,0.492187 -0.496093,0 -0.925781,-0.164062 -1.28125,-0.492187 -0.355468,-0.328125 -0.53125,-0.726563 -0.53125,-1.191407 0,-0.464843 0.179688,-0.867187 0.53125,-1.199218 0.355469,-0.332032 0.785157,-0.496094 1.28125,-0.496094 0.496094,0 0.921875,0.164062 1.273438,0.496094 0.355469,0.332031 0.53125,0.734375 0.53125,1.199218 0,0.464844 -0.175781,0.863282 -0.53125,1.191407 z');
				svgPath.setAttribute('fill', this._default.color.info);
			}
			notification.dom.classList.add('info');
			break;
			case 'success':
			if (!notification.iconless) {
				svgPath.setAttributeNS(null, 'd', 'M 12.499783,0 C 5.5966693,0 0,5.596435 0,12.499784 c 0,6.903347 5.5966693,12.499782 12.499783,12.499782 6.903875,0 12.499783,-5.596435 12.499783,-12.499782 C 24.999566,5.596435 19.403424,0 12.499783,0 z m -2.292972,18.920678 -5.5039166,-5.503683 1.8344827,-1.834483 3.6694339,3.669201 8.255378,-8.2556122 1.834483,1.834483 -10.089861,10.0900942 z');
				svgPath.setAttribute('fill', this._default.color.success);
			}
			notification.dom.classList.add('success');
			break;
			case 'warning':
			if (!notification.iconless) {
				svgPath.setAttributeNS(null, 'd', 'M 24.729868,20.761932 13.783787,2.6088248 C 13.507151,2.1500377 13.010452,1.8695027 12.474673,1.8695027 c -0.53578,0 -1.032479,0.2804863 -1.309115,0.7393221 L 0.21957459,20.761932 c -0.28467704,0.472139 -0.29310722,1.061034 -0.0219769,1.541067 0.27113027,0.480082 0.77971881,0.776941 1.33104306,0.776941 H 23.420753 c 0.551324,0 1.059913,-0.296908 1.331043,-0.776941 0.27113,-0.480082 0.262749,-1.068928 -0.02193,-1.541067 z M 12.482859,8.148868 c 0.628658,0 1.160588,0.3546525 1.160588,0.9832615 0,1.9181345 -0.225666,4.6745605 -0.225666,6.5926955 0,0.49972 -0.548059,0.709207 -0.934922,0.709207 -0.515752,0 -0.951002,-0.209536 -0.951002,-0.709207 0,-1.918135 -0.225618,-4.674561 -0.225618,-6.5926955 0,-0.628609 0.515752,-0.9832615 1.17662,-0.9832615 z m 0.01613,11.879784 c -0.709208,0 -1.241187,-0.580269 -1.241187,-1.241137 0,-0.676997 0.53193,-1.241137 1.241187,-1.241137 0.660867,0 1.225056,0.56414 1.225056,1.241137 0,0.660868 -0.564189,1.241137 -1.225056,1.241137 z');
				svgPath.setAttribute('fill', this._default.color.warning);
			}
			notification.dom.classList.add('warning');
			break;
			case 'error':
			if (!notification.iconless) {
				svgPath.setAttributeNS(null, 'd', 'M 12.52501,0 C 9.198467,0 6.0711819,1.2953998 3.7190383,3.6475434 -1.1366543,8.5031605 -1.1366543,16.403869 3.7188874,21.259562 c 2.3521435,2.352219 5.4795796,3.647619 8.8061226,3.647619 3.326392,0 6.453828,-1.2954 8.805971,-3.647619 4.855693,-4.855693 4.855693,-12.7564015 0,-17.6120186 C 18.978838,1.2953998 15.851402,0 12.52501,0 z m 5.603813,18.057329 c -0.221145,0.22107 -0.510823,0.331642 -0.800577,0.331642 -0.289678,0 -0.579507,-0.110572 -0.800426,-0.331642 l -4.00281,-4.00266 -4.0027352,4.002735 c -0.2211455,0.22107 -0.5108236,0.331643 -0.8005771,0.331643 -0.2896781,0 -0.5795071,-0.110573 -0.8004262,-0.331643 -0.4422157,-0.442065 -0.4422157,-1.158939 0,-1.601079 L 10.923931,12.45359 6.921196,8.4508554 c -0.4422157,-0.4420647 -0.4422157,-1.1589386 0,-1.6010788 0.4420647,-0.4420648 1.1589386,-0.4420648 1.6010788,0 L 12.52501,10.852512 16.527593,6.8497766 c 0.442065,-0.4420648 1.158939,-0.4420648 1.60108,0 0.442215,0.4420647 0.442215,1.1589386 0,1.6010788 l -4.002585,4.0027346 4.002735,4.002659 c 0.442141,0.442141 0.442141,1.159015 0,1.60108 z');
				svgPath.setAttribute('fill', this._default.color.error);
			}
			notification.dom.classList.add('error');
			break;
			default:
			if (!notification.iconless) {
				svgPath.setAttributeNS(null, 'd', 'M 13,1.1875 C 6.476563,1.1875 1.1875,6.476563 1.1875,13 1.1875,19.523438 6.476563,24.8125 13,24.8125 19.523438,24.8125 24.8125,19.523438 24.8125,13 24.8125,6.476563 19.523438,1.1875 13,1.1875 z m 2.460938,18.308594 c -0.609375,0.238281 -1.09375,0.421875 -1.457032,0.546875 -0.363281,0.125 -0.78125,0.1875 -1.261718,0.1875 -0.734375,0 -1.308594,-0.179688 -1.71875,-0.539063 -0.40625,-0.355468 -0.609375,-0.8125 -0.609375,-1.367187 0,-0.214844 0.01563,-0.433594 0.04687,-0.65625 0.02734,-0.226563 0.07813,-0.476563 0.144531,-0.761719 l 0.761719,-2.6875 c 0.06641,-0.257812 0.125,-0.5 0.171875,-0.730469 0.04687,-0.230468 0.06641,-0.441406 0.06641,-0.632812 0,-0.339844 -0.07031,-0.582031 -0.210938,-0.714844 C 11.25,12.003906 10.980469,11.9375 10.582031,11.9375 c -0.195312,0 -0.398437,0.03125 -0.605468,0.08984 -0.207032,0.0625 -0.382813,0.121094 -0.53125,0.175781 L 9.648438,11.375 c 0.496093,-0.203125 0.972656,-0.375 1.429687,-0.519531 0.453125,-0.144531 0.886719,-0.21875 1.289063,-0.21875 0.730468,0 1.296875,0.179687 1.691406,0.53125 0.394531,0.351562 0.59375,0.8125 0.59375,1.375 0,0.117187 -0.01172,0.324219 -0.03906,0.617187 -0.02734,0.292969 -0.07813,0.5625 -0.152343,0.8125 l -0.757813,2.679688 c -0.0625,0.214844 -0.117187,0.460937 -0.167969,0.734375 -0.04687,0.273437 -0.07031,0.484375 -0.07031,0.625 0,0.355469 0.07813,0.601562 0.238281,0.730469 0.15625,0.128906 0.433594,0.191406 0.828125,0.191406 0.183594,0 0.390625,-0.03125 0.625,-0.09375 0.230469,-0.06641 0.398438,-0.121094 0.503906,-0.171875 z M 15.324219,8.617188 c -0.351563,0.328125 -0.777344,0.492187 -1.273438,0.492187 -0.496093,0 -0.925781,-0.164062 -1.28125,-0.492187 -0.355468,-0.328125 -0.53125,-0.726563 -0.53125,-1.191407 0,-0.464843 0.179688,-0.867187 0.53125,-1.199218 0.355469,-0.332032 0.785157,-0.496094 1.28125,-0.496094 0.496094,0 0.921875,0.164062 1.273438,0.496094 0.355469,0.332031 0.53125,0.734375 0.53125,1.199218 0,0.464844 -0.175781,0.863282 -0.53125,1.191407 z');
				svgPath.setAttribute('fill', this._default.color.info);
			}
			notification.dom.classList.add('info');
			console.warn('[ Notification ] ' + notification.id + '._buildUI() | Invalid value for type' +
			'\nGiven type value of ' + notification.type + ' has been replaced with info');
			break;
		}

		if (notification.iconless) {
			notification.dom.message.classList.add('iconless-width');
		}

		// Fill intermediate DOM elements
		if (!notification.iconless) {
			notification.dom.icon.appendChild(svgPath);
			notification.dom.vector.appendChild(notification.dom.icon);
		}

		notification.dom.text.appendChild(notification.dom.maintitle);
		notification.dom.text.appendChild(notification.dom.message);

		// Add callback button and listener if needed
		if (notification.callback) {
			let callbackButton 		 = document.createElement('BUTTON');
			callbackButton.innerHTML = notification.CBtitle;
			notification.dom.text.appendChild(callbackButton);

			let that = this;
			callbackButton.addEventListener('click', () => {
				that._close(notification);
				notification.callback();
			});
		}

		// Fill notification DOM element
		if (!notification.iconless) {
			notification.dom.appendChild(notification.dom.vector);
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
	* @summary Start a notification life cycle
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Call this method to add the new notification to the DOM container, and launch its life cycle
	* @param {object} notification - The notification object
	* @param {number} notification.id - Notification personnal ID
	**/
	_start(notification) {
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._start()'); }

		if (Object.keys(this._active).length >= this._maxActive) {
			this._queue[notification.id] = notification;
		}

		else {
			this._active[notification.id] = notification; // Append the new notification to the _active object

			this._events(notification); // Listen to mouse events on the newly created notification
			this._open(notification); // Open the new notification

			let that = this;
			notification.timeoutID = window.setTimeout(() => {
				that._checkCounter(notification); // Check notification request count to act accordingly
			}, notification.duration); // Use Notification master duration
		}
	}

	/**
	* @method
	* @name _open
	* @private
	* @memberof Notification
	* @summary Open the notification with a fade in animation
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Open and add the notification to the container
	* @param {object} notification - The notification object
	* @param {number} notification.id - Notification personnal ID
	* @param {object} notification.dom - Notifiction DOM element
	**/
	_open(notification) {
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._open()'); }

		// Reverse insertion when notifications are on bottom
		if (this._position === 'bottom-right' || this._position === 'bottom-left') {
			notification.renderTo.insertBefore(notification.dom, notification.renderTo.firstChild);
		}

		else {
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
	* @summary Close the notification with a fade out animation
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
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._close() '); }

		if (notification.isClosing) { // Avoid double close on a notification (in case dismiss/dismissAll is triggerred when notification is already closing)
			return;
		}

		notification.isClosing         = true; // Lock notification to one fadeOut animation
		notification.closed    		   = Date.now();
		notification.effectiveDuration = notification.closed - notification.opened;

		let that = this;
		let i    = 100;

		notification.dom.style.opacity = 0;

		window.setTimeout(() => {
			this._updateHistory(notification);
			notification.renderTo.removeChild(notification.dom); // Remove this notification from the DOM tree

			if (Object.keys(this._queue).length > 0) { // Notification queue is not empty
				that._start(this._queue[Object.keys(this._queue)[0]]); // Start first queued notification
				delete this._queue[Object.keys(this._queue)[0]]; // Shift queue object
			}

			else if (Object.keys(this._active).length === 0) { // Check this._active emptyness
				this._dismissAllLock = false; // Unlock dismissAllLock
			}
		}, 1000); // Transition value set in _notification.scss
	}

	/**
	* @method
	* @name _incrementRequestCounter
	* @private
	* @memberof Notification
	* @summary Increment notification requestCount
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
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._incrementRequestCounter()'); }

		++notification.requestCount; // Increment notification.requestCount

		if (notification.totalRequestCount < notification.requestCount) { notification.totalRequestCount = notification.requestCount; }

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
	* @summary Decrement notification requestCount
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
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._decrementRequestCounter()'); }

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
	* @summary Check a notification counter and act accordingly
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
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._checkCounter()'); }

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
	* @summary Reset request count to one
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Method that clear every pending request
	* @param {object} notification - The notification object
	* @param {number} notification.id - Notification personnal ID
	* @param {object} notification.dom - Notifiction DOM element
	**/
	_clearRequestCount(notification) {
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._clearRequestCount()'); }

		notification.requestCount = 1;
		notification.dom.removeChild(notification.dom.counter);
		delete notification.dom.counter;
	}

	/**
	* @method
	* @name _resetTimeout
	* @private
	* @memberof Notification
	* @summary Reset a notification life cycle
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Use this to reset a notification life cycle, and delay its close event
	* @param {object} notification - The notification object
	* @param {number} notification.id - Notification personnal ID
	* @param {number} notification.timeoutID - Notification own setTimeout ID
	**/
	_resetTimeout(notification) {
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._resetTimeout()'); }

		window.clearTimeout(notification.timeoutID); // Clear previpous life cycle

		let that = this;
		notification.timeoutID = window.setTimeout(() => {
			that._checkCounter(notification); // Check notification request count to act accordingly
		}, notification.duration); // Use Notification master duration
	}

	/**
	* @method
	* @name _updateHistory
	* @private
	* @memberof Notification
	* @summary Update the handler history
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Add a notification to the history. Might be executed when a notification is being closed
	* @param {object} notification - The notification object
	* @param {number} notification.id - Notification personnal ID
	**/
	_updateHistory(notification) {
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._updateHistory()'); }

		// Remove this notification from the active object
		delete this._active[notification.id];

		// Work notification copy
		let cleanEntry = JSON.parse(JSON.stringify(notification));

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
	* @summary Dim the notification with a half fade out animation
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
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._dim()'); }

		let that = this,
		i    = 100;

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
	* @summary Restore notification opacity
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Call this method when a notification is not inactive anymore
	* @param {object} notification - The notification object
	* @param {number} notification.id - Notification personnal ID
	* @param {object} notification.dom - Notifiction DOM element
	* @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
	**/
	_unDim(notification) {
		if (this.DEBUG) { console.log('[ Notification ] ' + notification.id + '._unDim()'); }

		let that = this,
		i    = 50;

		(function halfFadeIn() {
			if (i < 100) {
				notification.dom.style.opacity = i / 100;
				++i;
			}

			else if (i === 100) {
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
	* @summary Call a new notification
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
		if (this.DEBUG) { console.log('[ Notification ] new()'); }

		// Check for mandatory arguments existence
		if (options === undefined || options.type === undefined || (options.message === undefined || options.message === '')) {
			console.error('[ Notification ] new() | Notification type or message is undefined\n' +
			'Those two fields are required to build a notification, check your .new() call');
			return;
		}

		// Check for unclosable at all notification
		if (options.sticky && options.closable === false && options.callback === undefined) {
			console.error('[ Notification ] new() | Given options are that notification can not be closed and is a sticky one\n' +
			'You must provide a valid callback so there is a way to close the notification');
			return;
		}

		// Test Notification inner variables validity
		if (this.DEBUG && options.type !== 'info' && options.type !== 'success' && options.type !== 'warning' && options.type !== 'error') {
			console.warn('[ Notification ] new() | Invalid value for type' +
			'\nGiven type value of ' + options.type + ' has been replaced with ' + this._default.notification.type);
			options.type = this._default.notification.type;
		}

		if (this._dismissAllLock) {
			this._dismissAllLock = false; // Unlock dismissAllLock
		}

		// Build notification DOM element according to the given options
		let notification = this._buildUI({
			id: 	       Utils.idGenerator(options.type + '' + options.message, 5), // Generating an ID of 5 characters long from notification mandatory fields
			type:        options.type,
			message:     options.message,
			title:       options.title       === undefined ? this._default.notification.title    : options.title,
			duration:    options.duration    === undefined ? this._duration           	          : options.duration,
			iconless:    options.iconless    === undefined ? this._default.notification.iconless : options.iconless,
			thickBorder: options.thickBorder === undefined ? this._thickBorder    				  		  : options.thickBorder,
			closable:    options.closable    === undefined ? this._default.notification.closable : options.closable,
			sticky:      options.sticky      === undefined ? this._default.notification.sticky   : options.sticky,
			renderTo:    options.renderTo    === undefined ? this._default.notification.renderTo : options.renderTo,
			CBtitle:     options.CBtitle     === undefined ? this._default.notification.CBtitle  : options.CBtitle,
			callback:    options.callback    === undefined ? this._default.notification.callback : options.callback,
			isDimmed:    false, // Only usefull if sticky is set to true
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
	* @summary Call a new info notification
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Build an info notification
	* @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
	* @returns {number} The newly created notification ID
	**/
	info(options) {
		if (this.DEBUG) { console.log('[ Notification ] info()'); }

		options.type = 'info';
		return this.new(options);
	}

	/**
	* @method
	* @name success
	* @public
	* @memberof Notification
	* @summary Call a new success notification
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Build a success notification
	* @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
	* @returns {number} The newly created notification ID
	**/
	success(options) {
		if (this.DEBUG) { console.log('[ Notification ] success()'); }

		options.type = 'success';
		return this.new(options);
	}

	/**
	* @method
	* @name warning
	* @public
	* @memberof Notification
	* @summary Call a new warning notification
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Build a warning notification
	* @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
	* @returns {number} The newly created notification ID
	**/
	warning(options) {
		if (this.DEBUG) { console.log('[ Notification ] warning()'); }

		options.type = 'warning';
		return this.new(options);
	}

	/**
	* @method
	* @name error
	* @public
	* @memberof Notification
	* @summary Call a new error notification
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Build an error notification
	* @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
	* @returns {number} The newly created notification ID
	**/
	error(options) {
		if (this.DEBUG) { console.log('[ Notification ] error()'); }

		options.type = 'error';
		return this.new(options);
	}

	/**
	* @method
	* @name dismiss
	* @public
	* @memberof Notification
	* @summary Dismiss a notification
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Dismiss a specific notification via its ID
	* @param {number} id - The notification ID to dismiss
	**/
	dismiss(id) {
		if (this.DEBUG) { console.log('[ Notification ] ' + id + '.dismis()'); }

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
	* @summary Dismiss all visible notifications
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Clear the notification handler from all its active notifications
	**/
	dismissAll() {
		if (this.DEBUG) { console.log('[ Notification ] dismisAll()'); }

		// Check that _dimissAllLock is disable and that there is still notification displayed
		if (!this._dismissAllLock && Object.keys(this._active).length !== 0) {
			this._dismissAllLock = true; // dismissAllLock will be unlocked at the last _close() method call
			this._queue = {}; // Clear queue object

			for (let id in this._active) { // Iterate over notifications
				this.dismiss(id);
			}
		}
	}

	/**
	* @method
	* @name dismissType
	* @public
	* @memberof Notification
	* @summary Dismiss typed notifications
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Dismiss all notifications from a given type
	* @param {string} type - <i>succes; info; warning; error;</i>
	**/
	dismissType(type) {
		if (this.DEBUG) { console.log('[ Notification ] dismisType()'); }

		// Check that _dimissAllLock is disable and that there is still notification displayed
		if (Object.keys(this._active).length !== 0) {
			for (let id in this._active) { // Iterate over notifications
				if (this._active[id].type === type) {
					this.dismiss(id);
				}
			}
		}
	}

	//  --------------------------------  GETTER METHODS   --------------------------------  //

	getHistoryLength() { return this._history.length; }
	getHistory() { return this._history; }

}

export default Notification;
