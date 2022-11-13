class Modal {


  /** @summary <h1>Mzk Modal base component</h1>
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This modal component is meant to be extended. It provides a base to build a modal, using
   * an HTML template from an existing backend url. It handles the loading and building of the HTML template. It also
   * exposes an open and a close method. Finally, it allows the user to click on the modal overlay, or on the close icon
   * to close the modal. The developer must override <code>destroy()</code> and <code>_fillAttributes()</code> methods
   * to fully cover the modal lifecycle (see each of these methods documentation).</blockquote>
   * @param {string} type - The modal type to load (must match html template filename, no extension) **/
  constructor(type) {
    /** @private
     * @member {string} - The modal type */
     this._type = type;
    /** @private
     * @member {string} - The HTML template url to fetch */
    this._url = `/fragment/modal/${this._type}`;
    /** @private
     * @member {object} - The template root DOM element */
    this._rootElement = null;
    /** @private
     * @member {object} - The overlay that contains the modal, full viewport size and close modal on click */
    this._modalOverlay = null;
    /** @private
     * @member {number} - The event ID for the overlay clicked */
    this._overlayClickedEvtId = -1;
    /** @private
     * @member {object} - The close button, in the modal header */
    this._closeButton = null;
    /** @private
     * @member {number} - The event ID for the close button clicked */
    this._closeClickedEvtId = -1;
    // Modal building sequence:
    // - get HTML template from server;
    // - parse template response to become DOM object;
    // - append DOM element to global overlay;
    // - open modal by adding overlay to the body;
    // - let child class fill attributes and register its events.
    this._loadTemplate();
  }


  /** @method
   * @name destroy
   * @public
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method must be overridden in child class. It only destroys the <code>Modal.js</code>
   * properties and close event subscription. The developer must remove its abstracted properties and events after
   * calling this method, to make the destruction process complete.</blockquote> **/
  destroy() {
    // Must be overridden in child class to clean extension properties and events
    Evts.removeEvent(this._overlayClickedEvtId); // Might do nothing, as event is removed in close method
    Evts.removeEvent(this._closeClickedEvtId); // Same for this event
    delete this._url;
    delete this._rootElement;
    delete this._modalOverlay;
    delete this._overlayClickedEvtId;
    delete this._closeButton;
    delete this._closeClickedEvtId;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _loadTemplate
   * @private
   * @async
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method creates the modal overlay, fetch the HTML template using the <code>Kom.js
   * </code> component, it then build the modal DOM, append it to the overlay, open the modal and call <code>
   * _fillAttributes()</code> that must be overridden in the child class. It is asynchronous because of the fetch call,
   * so the child class constructor can be fully executed.</blockquote> **/
  _loadTemplate() {
    mzk.kom.getText(this._url).then(response => {
      // Create DOM from fragment and tweak url to only keep modal type as css class
      this._rootElement = Utils.parseHTMLFragment(response);
      this._rootElement.classList.add(`${this._type}-modal`);
      // Create overlay modal container
      this._modalOverlay = document.createElement('DIV');
      this._modalOverlay.className = 'loading-overlay';
      this._modalOverlay.appendChild(this._rootElement);
      // Get close button from template
      this._closeButton = this._rootElement.querySelector('#modal-close');
      this.open();
      this._fillAttributes();
    }).catch(error => {
      console.error(error);
    });
  }


  /** @method
   * @name _fillAttributes
   * @private
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method doesn't implement anything. It must be overridden in child class, to use the
   * template DOM elements to build its interactions. It is called once the template is successfully fetched from the
   * server.</blockquote> **/
  _fillAttributes() {
    // Must be overridden in child class to build modal with HTML template attributes
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL VISIBILITY MANIPULATION  -----------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name open
   * @public
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will open the modal, by adding the modal overlay to the document body. It will
   * also register a subscription for a user click event on the modal overlay or on the close icon.</blockquote> **/
  open() {
    document.body.appendChild(this._modalOverlay);
    this._overlayClickedEvtId = Evts.addEvent('click', this._modalOverlay, this.close, this);
    this._closeClickedEvtId = Evts.addEvent('click', this._closeButton, this.close, this);
  }


  /** @method
   * @name close
   * @public
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will close the modal by removing the modal overlay from the document body.
   * When closed, a modal must be destroyed, and the child class must implement its own <code>destroy()</code> method,
   * to unsubscribe to any events it has and to remove its internal properties.</blockquote>
   * @param {object} [event] - The click event, not mandatory to allow the closing of the modal outside of any event **/
  close(event) {
    // Must be overridden in child class to properly clean extension properties and events
    if (!event || (event && (event.target === this._modalOverlay || event.target === this._closeButton)) || event.target.id.indexOf('close') !== -1) {
      // Clear close events int eh Events component
      Evts.removeEvent(this._overlayClickedEvtId);
      Evts.removeEvent(this._closeClickedEvtId);
      this._overlayClickedEvtId = -1;
      this._closeClickedEvtId = -1;
      // Remove the overlay from the body
      document.body.removeChild(this._modalOverlay);
      // Use the child class destroy
      this.destroy();
    }
  }


}


export default Modal;
