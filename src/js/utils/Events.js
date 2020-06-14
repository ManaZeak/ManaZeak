/**  Arthur Beaulieu - https://github.com/ArthurBeaulieu/CustomEvents.js  **/


class CustomEvents {


  /** CustomEvents constructor. Can be app wide or component wide.
  * @param {object} options - The CustomEvent parameters
  * @param {boolean} [options.debug] - Debug flag (default to false) ; when true, logs will be outputed in JavaScript console **/
  constructor(options = {}) {
    /* Internal debug flag for logging */
    this._debug = options.debug || false;
    /* Start the ID incrementor at pseudo random value, used for both regular and custom events */
    this._idIncrementor = (Math.floor(Math.random() * Math.floor(256)) * 5678);
    /* We store classical event listeners in array of objects containing all their informations */
    this._regularEvents = [];
    /* We store custom events by name as key, each key stores an Array of subscribed events */
    this._customEvents = {};
    /* Component version */
    this._version = '0.5';
  }


  /** CustomEvents destructor. Will remove all event listeners and keys in instance **/
  destroy() {
    // Remove all existing eventListener
    this.removeAllListeners();
    // Delete object attributes
    Object.keys(this).forEach(key => { delete this[key]; });
  }


  /**  ----------  Classic EventListener override  ----------  **/
  /**  The following methods are made to abstract the event    **/
  /**  listeners from the JavaScript layer, so you can easily  **/
  /**  remove them when done using, without bothering with     **/
  /**  binding usual business for 'em. 'addEvent/removeEvent'  **/
  /**  method replace the initial ones. 'removeAllListeners'   **/
  /**  clears all instance event listeners ; nice for destroy  **/


  /** addEvent method abstracts the addEventListener method to easily remove it when needed
  * @param {string} eventName - The event name to fire (mousemove, click, context etc.)
  * @param {object} element - The DOM element to attach the listener to
  * @param {function} callback - The callback function to execute when event is realised
  * @param {object} [scope] - The event scope to apply to the callback (optional, default to DOM element)
  * @param {object} [options] - The event options (useCapture and else)
  * @returns {number} - The event ID to use if manually removing event listener **/
  addEvent(eventName, element, callback, scope = element, options = false) {
    // Save scope to callback function, default scope is DOM target object
    callback = callback.bind(scope);
    // Add event to internal array and keep all its data
    this._regularEvents.push({
      id: this._idIncrementor,
      element: element,
      eventName: eventName,
      scope: scope,
      callback: callback,
      options: options
    });
    // Add event listener with options
    element.addEventListener(eventName, callback, options);
    // Post increment to return the true event entry id, then update the incrementor
    return this._idIncrementor++;
  }


  /** removeEvent method abstracts the removeEventListener method to really remove event listeners
  * @param {number} eventId - The event ID to remove listener from. Returned when addEvent is called
  * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  removeEvent(eventId) {
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Iterate over saved listeners, reverse order for proper splicing
    for (let i = (this._regularEvents.length - 1); i >=0 ; --i) {
      // If an event ID match in saved ones, we remove it and update saved listeners
      if (this._regularEvents[i].id === eventId) {
        // Update status code
        statusCode = true; // Found and removed event listener status code (true)
        this._clearRegularEvent(i);
      }
    }
    // Return with status code
    return statusCode;
  }


  /** removeEvent method abstracts the removeEventListener method to really remove event listeners
  * @returns {boolean} - The method status ; true for success, false for not removed any event **/
  removeAllListeners() {
    // Returned value
    let statusCode = false; // Didn't removed any status code by default (false)
    // Flag to know if there was any previously stored event listeners
    let hadEvents = (this._regularEvents.length > 0);
    // Iterate over saved listeners, reverse order for proper splicing
    for (let i = (this._regularEvents.length - 1); i >=0 ; --i) {
      this._clearRegularEvent(i);
    }
    // If all events where removed, update statusCode to success
    if (this._regularEvents.length === 0 && hadEvents) {
      // Update status code
      statusCode = true; // Found and removed all events listener status code (true)
    }
    // Return with status code
    return statusCode;
  }


  /** _clearRegularEvent method remove the saved event listener for a given index in regularEvents array range
  * @param {number} index - The regular event index to remove from class attributes **/
  _clearRegularEvent(index) {
    // Check if index match an existing event in attributes
    if (this._regularEvents[index]) {
      // Remove its event listenet and update regularEvents array
      let evt = this._regularEvents[index];
      evt.element.removeEventListener(evt.eventName, evt.callback, evt.options);
      this._regularEvents.splice(index, 1);
    }
  }


  /**  ----------  Custom events with multiple subscriptions  ----------  **/
  /**  The three following methods (subscribe, unsubscribe, publish) are  **/
  /**  designed to reference an event by its name and handle as many      **/
  /**  subscriptions as you want. When subscribin, you get an ID you can  **/
  /**  use to unsubscribe your event later. Just publish with the event   **/
  /**  name to callback all its registered subscriptions.                 **/


  /** Subscribe method allow you to listen to an event and react when it occurs.
  * @param {object} options - Event parameters
  * @param {string} eventName - Event name (the one to use to publish)
  * @param {function} callback - The callback to execute when event is published
  * @param {boolean} [oneShot] - One shot (optional, default to false) : to remove subscription the first time callback is fired
  * @returns {number} - The event id, to be used when manually unsubscribing **/
  subscribe(eventName, callback, oneShot = false) {
    // Debug logging
    if (this._debug) { console.log('Events.subscribe', eventName, callback, oneShot); }
    // Create event entry if not already existing in the registered events
    if (!this._customEvents[eventName]) {
      this._customEvents[eventName] = []; // Set empty array for new event subscriptions
    }
    // Push new subscription for event name
    this._customEvents[eventName].push({
      id: this._idIncrementor,
      name: eventName,
      os: oneShot,
      callback: callback
    });
    // Post increment to return the true event entry id, then update the incrementor
    return this._idIncrementor++;
  }


  /** Unsubscribe method allow you to revoke an event subscription.
  * @param {number} eventId - The subscription id returned when subscribing to an event name
  * @returns {boolean} - The method status ; true for success, false for non-existing subscription **/
  unsubscribe(eventId) {
    // Debug logging
    if (this._debug) { console.log('Events.unsubscribe : eventId', eventId); }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    let keys = Object.keys(this._customEvents);
    // Reverse events iteration to properly splice without messing with iteration order
    for (let i = (keys.length - 1); i >= 0; --i) {
      // Get event subscriptions
      let subs = this._customEvents[keys[i]];
      // Iterate over events subscriptions to find the one with given id
      for (let j = 0; j < subs.length; ++j) {
        // In case we got a subscription for this events
        if (subs[j].id === eventId) {
          // Debug logging
          if (this._debug) { console.log(`Events.unsubscribe : subscription found\n`, subs[j], `\nSubscription n°${eventId} for ${subs.name} has been removed`); }
          // Update status code
          statusCode = true; // Found and unsubscribed status code (true)
          // Remove subscription from event Array
          subs.splice(j, 1);
          // Remove event name if no remaining subscriptions
          if (subs.length === 0) {
            delete this._customEvents[keys[i]];
          }
          // Break since id are unique and no other subscription can be found after
          break;
        }
      }
    }
    // Return with status code
    return statusCode;
  }


  /** unsubscribeAllFor method clear all subscriptions registered for given event name
  * @param {string} eventName - The event to clear subscription from
  * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  unsubscribeAllFor(eventName) {
    // Debug logging
    if (this._debug) { console.log('Events.unsubscribeAllFor : eventName', eventName); }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    let keys = Object.keys(this._customEvents);
    // Reverse events iteration to properly splice without messing with iteration order
    for (let i = (keys.length - 1); i >= 0; --i) {
      if (keys[i] === eventName) {
        // Get event subscriptions
        let subs = this._customEvents[keys[i]];
        // Iterate over events subscriptions to find the one with given id
        for (let j = 0; j < subs.length; ++j) {
          // Update status code
          statusCode = true; // Found and unsubscribed all status code (true)
          // Remove subscription from event Array
          subs.splice(j, 1);
          // Remove event name if no remaining subscriptions
          if (subs.length === 0) {
            delete this._customEvents[keys[i]];
          }
        }
      }
    }
    // Return with status code
    return statusCode;
  }


  /** Publish method allow you to fire an event by name and trigger all its subscription by callbacks
  * @param {object} options - Event parameters
  * @param {string} eventName - Event name (the one to use to publish)
  * @param {boolean} [data] - One shot (optional, default to false) : to remove subscription the first time callback is fired
  * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  publish(eventName, data = undefined) {
    // Debug logging
    if (this._debug) { console.log('Events.publish : options', eventName, data); }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    let keys = Object.keys(this._customEvents);
    // Iterate over saved custom events
    for (let i = 0; i < keys.length; ++i) {
      // If published name match an existing events, we iterate its subscriptions. First subscribed, first served
      if (keys[i] === eventName) {
        // Update status code
        statusCode = true; // Found and published status code (true)
        // Get event subscriptions
        let subs = this._customEvents[keys[i]];
        // Iterate over events subscriptions to find the one with given id
        // Reverse subscriptions iteration to properly splice without messing with iteration order
        for (let j = (subs.length - 1); j >= 0; --j) {
          // Debug logging
          if (this._debug) { console.log(`Events.publish : fire callback for ${eventName}, subscription n°${subs[j].id}`, subs[j]); }
          // Fire saved callback
          subs[j].callback(data);
          // Remove oneShot listener from event entry
          if (subs[j].os) {
            // Debug logging
            if (this._debug) { console.log(`Events.publish : remove subscription because one shot usage is done`); }
            subs.splice(j, 1);
            // Remove event name if no remaining subscriptions
            if (subs.length === 0) {
              delete this._customEvents[keys[i]];
            }
          }
        }
      }
    }
    // Return with status code
    return statusCode;
  }


  /** Version getter
  * @returns {string} - The component version **/
  get version() {
    return this._version;
  }


}


export default CustomEvents;
