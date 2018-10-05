'use_strict';

class Events {
	/**
	* @summary Basic custom events system
	* @author Arthur Beaulieu
	* @since September 2018
	* @description Exposes an API to register/unregister events and fire them
	**/
	constructor() {
		this._eventUid = 0;
		this._events = {};
	}

	//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

	/**
	* @method
	* @name register
	* @public
	* @memberof Events
	* @author Arthur Beaulieu
	* @since September 2018
	* @description Register a custom event using a name and a callback
	* @param {object} options - The event options
	* @param {string} options.name - The event string identifier (use specific names)
	* @param {boolean} [options.oneShot=false] - Only register the event for one call. Automatically unregister after
	* @returns {number} The event id (useful to unregister the registered event)
	**/
	register(options, callback) {
		if (typeof options !== 'object') { return; }
		if (typeof options.name !== 'string') { return; }
		if (typeof callback !== 'function') { return; }

		if (!this._events[options.name]) { this._events[options.name] = []; } // Create event entry if not already existing

		this._events[options.name].push({
			id: this._eventUid,
			name: options.name,
			oneShot: options.oneShot ? options.oneShot : false,
			callback: callback
		});

		return this._eventUid++; // Post increment to return the true event entry id, then increment
	}

	/**
	* @method
	* @name unregister
	* @public
	* @memberof Events
	* @author Arthur Beaulieu
	* @since September 2018
	* @description UnRegister a custom event using its id
	* @param {number} uid - The event unique id
	**/
	unregister(uid) {
		if (typeof uuid !== 'number') { return; }

		for (let key in this._events) {
			let i = this._events[key].length;
			while (i--) { // Reverse parsing, post decrement is mandatory bc of splice()
				if (this._events[key][i].id === uid) { this._events[key].splice(i, 1); }
			}

			if (this._events[key].length === 0) { delete this._events[key]; } // Remove event entry if nothing is listening to it
		}
	}

	/**
	* @method
	* @name unregisterAll
	* @public
	* @memberof Events
	* @author Arthur Beaulieu
	* @since September 2018
	* @description UnRegister all custom event registered
	**/
	unregisterAll() {
		this._events = {}; // Remove all entry
	}

	/**
	* @method
	* @name fire
	* @public
	* @memberof Events
	* @author Arthur Beaulieu
	* @since September 2018
	* @description Fire a custom event from its string identifier
	* @param {string} eventName - The event string identifier
	**/
	fire(eventName) {
		if (typeof eventName !== 'string') { return; }

		for (let key in this._events) {
			let i = this._events[key].length;
			while (i--) { // Reverse parsing, post decrement is mandatory bc of splice()
				if (this._events[key][i].name === eventName) {
					this._events[key][i].callback();
					if (this._events[key][i].oneShot) { this._events[key].splice(i, 1); } // Remove oneShot listener from event entry
				}
			}
		}
	}
}

export default Events;
