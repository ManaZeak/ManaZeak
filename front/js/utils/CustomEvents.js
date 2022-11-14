class CustomEvents {


  /** @summary <h1>JavaScript regular and custom events abstraction</h1>
   * @author Arthur Beaulieu
   * @since June 2020
   * @description <blockquote>The CustomEvents class provides an abstraction of JavaScript event listener, to allow
   * easy binding and removing those events. It also provides an interface to register custom events. This class is
   * meant to be used on all scopes you need ; module or global. Refer to each public method for detailed features.
   * For source code, please go to <a href="https://github.com/ArthurBeaulieu/CustomEvents.js" alt="custom-events-js">
   * https://github.com/ArthurBeaulieu/CustomEvents.js</a></blockquote>
   * @param {boolean} [debug=false] - Debug flag ; when true, logs will be output in JavaScript console at each event */
  constructor(debug = false) {
    // Prevent wrong type for debug
    if (typeof debug !== 'boolean') {
      debug = false;
    }
    /** @private
     * @member {boolean} - Internal logging flag from constructor options, allow to output each event action */
    this._debug = debug;
    /** @private
     * @member {number} - Start the ID incrementer at pseudo random value, used for both regular and custom events */
    this._idIncrementor = (Math.floor(Math.random() * Math.floor(256)) * 5678);
    /** @private
     * @member {any[]} - We store classical event listeners in array of objects containing all their information */
    this._regularEvents = [];
    /** @private
     * @member {object} - We store custom events by name as key, each key stores an Array of subscribed events */
    this._customEvents = {};
    /** @public
     * @member {string} - Component version */
    this.version = '1.1.0';
  }


  /** @method
   * @name destroy
   * @public
   * @memberof CustomEvents
   * @description <blockquote>CustomEvents destructor. Will remove all event listeners and keys in instance.</blockquote> */
  destroy() {
    // Debug logging
    this._raise('log', 'CustomEvents.destroy');
    // Remove all existing eventListener
    this.removeAllEvents();
    // Delete object attributes
    Object.keys(this).forEach(key => {
      delete this[key];
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------  CLASSIC JS EVENTS OVERRIDE  ------------------------------------------  */
  /*                                                                                                                  */
  /*  The following methods are made to abstract the event listeners from the JavaScript layer, so you can easily     */
  /*  remove them when done using, without bothering with binding usual business for them. 'addEvent/removeEvent'     */
  /*  method replace the initial ones. 'removeAllEvents' clears all instance event listeners ; nice for destroy       */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name addEvent
   * @public
   * @memberof CustomEvents
   * @description <blockquote><code>addEvent</code> method abstracts the <code>addEventListener</code> method to easily
   * remove it when needed, also to set a custom scope on callback.</blockquote>
   * @param {string} eventName - The event name to fire (mousemove, click, context etc.)
   * @param {object} element - The DOM element to attach the listener to
   * @param {function} callback - The callback function to execute when event is realised
   * @param {object} [scope=element] - The event scope to apply to the callback (optional, default to DOM element)
   * @param {object|boolean} [options=false] - The event options (useCapture and else)
   * @returns {number|boolean} - The event ID to use to manually remove an event, false if arguments are invalid */
  addEvent(eventName, element, callback, scope = element, options = false) {
    // Debug logging
    this._raise('log', `CustomEvents.addEvent: ${eventName} ${element} ${callback} ${scope} ${options}`);
    // Missing mandatory arguments
    if (eventName === null || eventName === undefined ||
      element === null || element === undefined ||
      callback === null || callback === undefined) {
      this._raise('error', 'CustomEvents.addEvent: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory and optional)
    const err = () => {
      this._raise('error', 'CustomEvents.addEvent: Wrong type for argument');
    };
    // Test argument validity for further process
    if (typeof eventName !== 'string' || typeof element !== 'object' || typeof callback !== 'function') {
      err();
      return false;
    }
    if ((scope !== null && scope !== undefined) && typeof scope !== 'object') {
      err();
      return false;
    }
    if ((options !== null && options !== undefined) && (typeof options !== 'object' && typeof options !== 'boolean')) {
      err();
      return false;
    }
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
    // Post increment to return the true event entry id, then update the incrementer
    return this._idIncrementor++;
  }


  /** @method
   * @name removeEvent
   * @public
   * @memberof CustomEvents
   * @description <blockquote><code>removeEvent</code> method abstracts the <code>removeEventListener</code> method to
   * really remove event listeners.</blockquote>
   * @param {number} eventId - The event ID to remove listener from. Returned when addEvent is called
   * @returns {boolean} - The method status ; true for success, false for non-existing event */
  removeEvent(eventId) {
    // Debug logging
    this._raise('log', `Events.removeEvent: ${eventId}`);
    // Missing mandatory arguments
    if (eventId === null || eventId === undefined) {
      this._raise('error', 'CustomEvents.removeEvent: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory)
    if (typeof eventId !== 'number') {
      this._raise('error', 'CustomEvents.removeEvent: Wrong type for argument');
      return false;
    }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Iterate over saved listeners, reverse order for proper splicing
    for (let i = (this._regularEvents.length - 1); i >= 0 ; --i) {
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


  /** @method
   * @name removeAllEvents
   * @public
   * @memberof CustomEvents
   * @description <blockquote>Clear all event listener registered through this class object.</blockquote>
   * @returns {boolean} - The method status ; true for success, false for not removed any event */
  removeAllEvents() {
    // Debug logging
    this._raise('log', 'CustomEvents.removeAllEvents');
    // Returned value
    let statusCode = false; // Didn't removed any status code by default (false)
    // Flag to know if there was any previously stored event listeners
    const hadEvents = (this._regularEvents.length > 0);
    // Iterate over saved listeners, reverse order for proper splicing
    for (let i = (this._regularEvents.length - 1); i >= 0; --i) {
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


  /** @method
   * @name _clearRegularEvent
   * @private
   * @memberof CustomEvents
   * @description <blockquote><code>_clearRegularEvent</code> method remove the saved event listener for a
   * given index in regularEvents array range.</blockquote>
   * @param {number} index - The regular event index to remove from class attributes
   * @return {boolean} - The method status ; true for success, false for not cleared any event */
  _clearRegularEvent(index) {
    // Debug logging
    this._raise('log', `CustomEvents._clearRegularEvent: ${index}`);
    // Missing mandatory arguments
    if (index === null || index === undefined) {
      this._raise('error', 'CustomEvents._clearRegularEvent: Missing mandatory argument');
      return false;
    }
    // Prevent wrong type for arguments (mandatory)
    if (typeof index !== 'number') {
      this._raise('error', 'CustomEvents._clearRegularEvent: Wrong type for argument');
      return false;
    }
    // Check if index match an existing event in attributes
    if (this._regularEvents[index]) {
      // Remove its event listener and update regularEvents array
      const evt = this._regularEvents[index];
      evt.element.removeEventListener(evt.eventName, evt.callback, evt.options);
      this._regularEvents.splice(index, 1);
      return true;
    }

    return false;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  CUSTOM JS EVENTS  -----------------------------------------------  */
  /*                                                                                                                  */
  /*  The three following methods (subscribe, unsubscribe, publish) are designed to reference an event by its name    */
  /*  and handle as many subscriptions as you want. When subscribing, you get an ID you can use to unsubscribe your   */
  /*  event later. Just publish with the event name to callback all its registered subscriptions.                     */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name subscribe
   * @public
   * @memberof CustomEvents
   * @description <blockquote>Subscribe method allow you to listen to an event and react when it occurs.</blockquote>
   * @param {string} eventName - Event name (the one to use to publish)
   * @param {function} callback - The callback to execute when event is published
   * @param {boolean} [oneShot=false] - One shot : to remove subscription the first time callback is fired
   * @returns {number|boolean} - The event id, to be used when manually unsubscribing */
  subscribe(eventName, callback, oneShot = false) {
    // Debug logging
    this._raise('log', `CustomEvents.subscribe: ${eventName} ${callback} ${oneShot}`);
    // Missing mandatory arguments
    if (eventName === null || eventName === undefined ||
      callback === null || callback === undefined) {
      this._raise('error', 'CustomEvents.subscribe', 'Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory and optional)
    const err = () => {
      this._raise('error', 'CustomEvents.subscribe: Wrong type for argument');
    };
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      err();
      return false;
    }
    if ((oneShot !== null && oneShot !== undefined) && typeof oneShot !== 'boolean') {
      err();
      return false;
    }
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
    // Post increment to return the true event entry id, then update the incrementer
    return this._idIncrementor++;
  }


  /** @method
   * @name unsubscribe
   * @public
   * @memberof CustomEvents
   * @description <blockquote>Unsubscribe method allow you to revoke an event subscription from its string name.</blockquote>
   * @param {number} eventId - The subscription id returned when subscribing to an event name
   * @returns {boolean} - The method status ; true for success, false for non-existing subscription **/
  unsubscribe(eventId) {
    // Debug logging
    this._raise('log', `CustomEvents.unsubscribe: ${eventId}`);
    // Missing mandatory arguments
    if (eventId === null || eventId === undefined) {
      this._raise('error', 'CustomEvents.unsubscribe: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory)
    if (typeof eventId !== 'number') {
      this._raise('error', 'CustomEvents.unsubscribe: Wrong type for argument');
      return false;
    }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    const keys = Object.keys(this._customEvents);
    // Reverse events iteration to properly splice without messing with iteration order
    for (let i = (keys.length - 1); i >= 0; --i) {
      // Get event subscriptions
      const subs = this._customEvents[keys[i]];
      // Iterate over events subscriptions to find the one with given id
      for (let j = 0; j < subs.length; ++j) {
        // In case we got a subscription for this events
        if (subs[j].id === eventId) {
          // Debug logging
          this._raise('log', `CustomEvents.unsubscribe: subscription found\n`, subs[j], `\nSubscription n°${eventId} for ${subs.name} has been removed`);
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


  /** @method
   * @name unsubscribeAllFor
   * @public
   * @memberof CustomEvents
   * @description <blockquote><code>unsubscribeAllFor</code> method clear all subscriptions registered for given event name.</blockquote>
   * @param {string} eventName - The event to clear subscription from
   * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  unsubscribeAllFor(eventName) {
    // Debug logging
    this._raise('log', `CustomEvents.unsubscribeAllFor: ${eventName}`);
    // Missing mandatory arguments
    if (eventName === null || eventName === undefined) {
      this._raise('error', 'CustomEvents.unsubscribeAllFor: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory and optional)
    if (typeof eventName !== 'string') {
      this._raise('error', 'CustomEvents.unsubscribeAllFor: Wrong type for argument');
      return false;
    }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    const keys = Object.keys(this._customEvents);
    // Iterate through custom event keys to find matching event to remove
    for (let i = 0; i < keys.length; ++i) {
      if (keys[i] === eventName) {
        // Get event subscriptions
        const subs = this._customEvents[keys[i]];
        // Iterate over events subscriptions to find the one with given id, reverse iteration to properly splice without messing with iteration order
        for (let j = (subs.length - 1); j >= 0; --j) {
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


  /** @method
   * @name publish
   * @public
   * @memberof CustomEvents
   * @description <blockquote><code>Publish</code> method allow you to fire an event by name and trigger all its subscription by callbacks./blockquote>
   * @param {string} eventName - Event name (the one to use to publish)
   * @param {object} [data=undefined] - The data object to sent through the custom event
   * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  publish(eventName, data = null) {
    // Debug logging
    this._raise('log', `CustomEvents.publish: ${eventName} ${data}`);
    // Missing mandatory arguments
    if (eventName === null || eventName === undefined) {
      this._raise('error', 'CustomEvents.publish: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory and optional)
    if (typeof eventName !== 'string' || (data !== undefined && typeof data !== 'object')) {
      this._raise('error', 'CustomEvents.publish: Wrong type for argument');
      return false;
    }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    const keys = Object.keys(this._customEvents);
    // Iterate over saved custom events
    for (let i = 0; i < keys.length; ++i) {
      // If published name match an existing events, we iterate its subscriptions. First subscribed, first served
      if (keys[i] === eventName) {
        // Update status code
        statusCode = true; // Found and published status code (true)
        // Get event subscriptions
        const subs = this._customEvents[keys[i]];
        // Iterate over events subscriptions to find the one with given id
        // Reverse subscriptions iteration to properly splice without messing with iteration order
        for (let j = (subs.length - 1); j >= 0; --j) {
          // Debug logging
          this._raise('log', `CustomEvents.publish: fire callback for ${eventName}, subscription n°${subs[j].id}`, subs[j]);
          // Fire saved callback
          subs[j].callback(data);
          // Remove oneShot listener from event entry
          if (subs[j].os) {
            // Debug logging
            this._raise('log', 'CustomEvents.publish: remove subscription because one shot usage is done');
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


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  COMPONENT UTILS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _raise
   * @private
   * @memberof CustomEvents
   * @description <blockquote>Internal method to abstract console wrapped in debug flag./blockquote>
   * @param {string} level - The console method to call
   * @param {string} errorValue - The error value to display in console method **/
  _raise(level, errorValue) {
    if (this._debug) {
      console[level](errorValue);
    }
  }


}


export default CustomEvents;
