class Canvas {

  
  /**
   * @class Canvas
   * @constructor
   * @description Canvas plug and play object
   *              Contains tools and functions to manipulate and draw in it
   * @param {object} options : Canvas width and height
   **/
  constructor(options) {
    this.style = options.style;
    this.container = options.container;
    this.height = this.container.getBoundingClientRect().height; // Canvas height
    this.width = this.container.getBoundingClientRect().width; // Canvas width
    this.canvas = null; // DOM element
    this.ctx = null; // Canvas context
    this.dragStart = null; // Drag starting relative coordinates lock
    this.isDragged = false; // Dragging lock
    this.pointer = {}; // Pointer position
    this.scaleFactor = 0; // Zooming scale factor intensity
    this._graphSize = {}; // Graph size in pixels
    this._evtIds = [];
    this._createCanvas(); // Create DOM element
  }


  destroy() {
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  /**
   * @method createCanvas
   * @private
   * @description Build Canvas DOM object and Canvas internal attributes
   **/
  _createCanvas() {
    this.canvas = document.createElement('CANVAS'); // Canvas DOM element creation
    this.ctx = this.canvas.getContext('2d'); // Extract context from canvas
    this.container.appendChild(this.canvas);

    this.canvas.id = 'CanvasGraph'; // CSS ID
    this.canvas.width = this.width; // Scale canvas inner width
    this.canvas.height = this.height; // Scale canvas inner height
    this.pointer.x = this.width  / 2; // Init pointer X position
    this.pointer.y = this.height / 2; // Init pointer Y position
    this.scaleFactor = 1.05; // Zoom intensity

    this.canvas.style.height = `${this.height}px`; // Style canvas height
    this.canvas.style.width  = `${this.width}px`; // Style canvas width

    this._trackTransforms(this.ctx); // Track canvas transformations (translate, scale)
    this._eventListeners(); // Trigger canvas transformations (translate, scale)
  }


  /**
   * @method mouseDown
   * @private
   * @description Handle mouse down event on the canvas. Drag context entry point
   * @param {event} event : Mouse event
   **/
  _mouseDown(event) {
    this.pointer.x = event.offsetX || (event.pageX - this.canvas.offsetLeft); // Update pointer X position
    this.pointer.y = event.offsetY || (event.pageY - this.canvas.offsetTop);  // Update pointer Y position
    this.dragStart = this.ctx.transformedPoint(this.pointer.x, this.pointer.y); // Lock drag starting relative coordinates
    this.isDragged = false; // Update lock
  }


  /**
   * @method mouseMove
   * @private
   * @description Handle mouse move event over the canvas to drag context according to mouse coordinates
   * @param {event} event : Mouse event
   **/
  _mouseMove(event) {
    this.pointer.x = event.offsetX || (event.pageX - this.canvas.offsetLeft); // Update pointer X position
    this.pointer.y = event.offsetY || (event.pageY - this.canvas.offsetTop);  // Update pointer Y position
    this.isDragged = true; // Update lock

    if (this.dragStart) { // Move context
      const pt = this.ctx.transformedPoint(this.pointer.x, this.pointer.y);   // Convert pointer in canvas' coordinates
      this.ctx.translate(pt.x - this.dragStart.x, pt.y - this.dragStart.y); // Translate accordingly
    }
  }


  /**
   * @method mouseUp
   * @private
   * @description Handle mouse up event on the canvas to endcontext translation
   * @param {event} event : Mouse event
   **/
  _mouseUp(event) {
    this._pointerX = event.offsetX || (event.pageX - this.elements.canvas.offsetLeft); // Update pointer X position
    this._pointerY = event.offsetY || (event.pageY - this.elements.canvas.offsetTop);  // Update pointer Y position
    this.dragStart = null; // Release drag starting relative coordinates
  }


  /**
   * @method mouseWheel
   * @private
   * @description Handle mouse wheel event over the Canvas to zoom in the context
   * @param {event} event : Mouse event
   **/
  _mouseWheel(event) {
    event.preventDefault();
    // Convert scroll to variation
    let delta = 0;
    if (event.wheelDelta) {
      delta = (event.wheelDelta / 40);
    } else if (event.detail) {
      delta = -event.detail;
    }

    if (delta) {
      this._zoom(delta);
    }
  };


  /**
   * @method mouseOut
   * @private
   * @description Handle mouse out event when mouse get out of Canvas DOM object
   * @param {event} event : Mouse event
   **/
  _mouseOut() {
    this.dragStart = null; // Release drag starting relative coordinates
  }


  /**
   * @method zoom
   * @private
   * @description Handle mouse move event over the canvas to drag context according to mouse coordinates
   * @param {int} value : Zoom value (-1 or 1 to zoom/unzoom)
   **/
  _zoom(value) {
    if (value < -4) {
      value = -4;
    } else if (value > 4) {
      value = 4;
    }

    const pt = this.ctx.transformedPoint(this.pointer.x, this.pointer.y); // Convert pointer in canvas' coordinates
    const sf = Math.pow(this.scaleFactor, value); // Compute local scale factor
    const ptMin = this.ctx.transformedPoint(0, 0);
    const ptMax = this.ctx.transformedPoint(this.width, this.height);
    // Dezooming only, Graph is horizontal
    if (value < 0) {
      let canvasAR = this._graphSize.height / this._graphSize.width;
      let elementAR = this.height / this.width;

      if (this._graphSize.width > this._graphSize.height) {
        // Getting graph and canvas aspect ratio
        canvasAR = this._graphSize.width / this._graphSize.height;
        elementAR = this.width / this.height;
      }

      const xPadding = ((this._graphSize.width / (elementAR * canvasAR)));
      const yPadding = ((this._graphSize.height / (elementAR * canvasAR)));
      const border = {
        l: (ptMin.x < -xPadding),
        t: (ptMin.y < -yPadding),
        r: (ptMax.x - this._graphSize.width > xPadding), // 100 padding times 2
        b: (ptMax.y - this._graphSize.height > yPadding) // 100 padding times 2
      };

      if (!this._dezoomingHandleBorders(border, sf)) {
        return;
      }
    }
    // Zoom from pointer position
    this.ctx.translate(pt.x, pt.y); // Positive offset accordingly
    this.ctx.scale(sf, sf); // Scale context
    this.ctx.translate(-pt.x, -pt.y); // Negative offset to align
  }


  _dezoomingHandleBorders(border, sf) {
    // Double side bounds
    if (border.l) {
      this.__dezoomingBorderLeft(border, sf);
      return false;
    }

    if (border.t) {
      this.__dezoomingBorderTop(border, sf);
      return false;
    }

    if (border.r) {
      this.__dezoomingBorderRight(border, sf);
      return false;
    }

    if (border.b) {
      this.__dezoomingBorderBottom(border, sf);
      return false;
    }

    return true;
  }


  __dezoomingBorderLeft(border, sf) {
    if (border.r) {
      return;
    }

    if (border.t) {
      if (border.r || border.b) {
        return;
      }

      const ptMid = this.ctx.transformedPoint(0, 0);
      this.ctx.translate(ptMid.x, ptMid.y);
      this.ctx.scale(sf, sf); // Scale context
      this.ctx.translate(-ptMid.x, -ptMid.y);
      return;
    }

    if (border.b) {
      if (border.r || border.t) {
        return;
      }

      const ptMid = this.ctx.transformedPoint(0, this.height);
      this.ctx.translate(ptMid.x, ptMid.y);
      this.ctx.scale(sf, sf); // Scale context
      this.ctx.translate(-ptMid.x, -ptMid.y);
      return;
    }

    const ptMid = this.ctx.transformedPoint(0, this.height / 2);
    this.ctx.translate(ptMid.x, ptMid.y);
    this.ctx.scale(sf, sf); // Scale context
    this.ctx.translate(-ptMid.x, -ptMid.y);
  }


  __dezoomingBorderTop(border, sf) {
    if (border.b) {
      return;
    }

    if (border.l) {
      if (border.r || border.b) {
        return;
      }

      const ptMid = this.ctx.transformedPoint(0, 0);
      this.ctx.translate(ptMid.x, ptMid.y);
      this.ctx.scale(sf, sf); // Scale context
      this.ctx.translate(-ptMid.x, -ptMid.y);
      return;
    }

    if (border.r) {
      if (border.b || border.l) {
        return;
      }

      const ptMid = this.ctx.transformedPoint(this.width, 0);
      this.ctx.translate(ptMid.x, ptMid.y);
      this.ctx.scale(sf, sf); // Scale context
      this.ctx.translate(-ptMid.x, -ptMid.y);
      return;
    }
    
    const ptMid = this.ctx.transformedPoint(this.width / 2, 0);
    this.ctx.translate(ptMid.x, ptMid.y);
    this.ctx.scale(sf, sf); // Scale context
    this.ctx.translate(-ptMid.x, -ptMid.y);
  }


  __dezoomingBorderRight(border, sf) {
    if (border.l) {
      return;
    }

    if (border.t) {
      if (border.b || border.l) {
        return;
      }

      const ptMid = this.ctx.transformedPoint(this.width, 0);
      this.ctx.translate(ptMid.x, ptMid.y);
      this.ctx.scale(sf, sf); // Scale context
      this.ctx.translate(-ptMid.x, -ptMid.y);
      return;
    }

    if (border.b) {
      if (border.l || border.t) {
        return;
      }

      const ptMid = this.ctx.transformedPoint(this.width, this.height);
      this.ctx.translate(ptMid.x, ptMid.y);
      this.ctx.scale(sf, sf); // Scale context
      this.ctx.translate(-ptMid.x, -ptMid.y);
      return;
    }

    const ptMid = this.ctx.transformedPoint(this.width, this.height / 2);
    this.ctx.translate(ptMid.x, ptMid.y);
    this.ctx.scale(sf, sf); // Scale context
    this.ctx.translate(-ptMid.x, -ptMid.y);
  }


  __dezoomingBorderBottom(border, sf) {
    if (border.t) {
      return;
    }

    if (border.l) {
      if (border.r || border.t) {
        return;
      }

      const ptMid = this.ctx.transformedPoint(0, this.height);
      this.ctx.translate(ptMid.x, ptMid.y);
      this.ctx.scale(sf, sf); // Scale context
      this.ctx.translate(-ptMid.x, -ptMid.y);
      return;
    }

    if (border.r) {
      if (border.t || border.l) {
        return;
      }

      const ptMid = this.ctx.transformedPoint(this.width, this.height);
      this.ctx.translate(ptMid.x, ptMid.y);
      this.ctx.scale(sf, sf); // Scale context
      this.ctx.translate(-ptMid.x, -ptMid.y);
      return;
    }
    
    const ptMid = this.ctx.transformedPoint(this.width / 2, this.height);
    this.ctx.translate(ptMid.x, ptMid.y);
    this.ctx.scale(sf, sf); // Scale context
    this.ctx.translate(-ptMid.x, -ptMid.y);
  }


  /**
   * @method trackTransforms
   * @private
   * @description Track and store all context transformations (scale, rotate, translate)
   * @param {object} ctx : Canvas context
   **/
  _trackTransforms(ctx) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg'); // {object} Create svg element
    let xform = svg.createSVGMatrix(); // {object} Create SVG matrix
    const transformedPoint = svg.createSVGPoint(); // {object}   (x, y) coordinates
    const savedTransforms = []; // {array}  Saved transformations
    // Closure required to avoid inifinte call stack
    const save = ctx.save; // {function} save ctx
    const restore = ctx.restore; // {function} restore ctx
    const scale = ctx.scale; // {function} scale ctx
    const rotate = ctx.rotate; // {function} rotate ctx
    const translate = ctx.translate; // {function} translate ctx
    const transform = ctx.transform; // {function} add transformation
    const setTransform = ctx.setTransform; // {function} set transformation

    ctx.getTransform = () => {
      return xform;
    };
    // Save state
    ctx.save = () => {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };
    // Restore state
    ctx.restore = () => {
      xform = savedTransforms.pop();
      return restore.call(ctx);
    };
    // Scale context
    ctx.scale = (sx, sy) => {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(ctx, sx, sy);
    };
    // Rotate context
    ctx.rotate = (radians) => {
      xform = xform.rotate((radians * 180) / Math.PI);
      return rotate.call(ctx, radians);
    };
    // Translate context
    ctx.translate = (dx, dy) => {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };
    // Add transformation to context
    ctx.transform = (a, b, c, d, e, f) => {
      const matrix = svg.createSVGMatrix();
      matrix.a = a;
      matrix.b = b;
      matrix.c = c;
      matrix.d = d;
      matrix.e = e;
      matrix.f = f;
      xform = xform.multiply(matrix);
      return transform.call(ctx, a, b, c, d, e, f);
    };
    // Set context transformation
    ctx.setTransform = (a, b, c, d, e, f) => {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };
    // Get true coordinates in context
    ctx.transformedPoint = (x, y) => {
      transformedPoint.x = x;
      transformedPoint.y = y;
      return transformedPoint.matrixTransform(xform.inverse());
    };
  }


  /**
   * @method abortDrag
   * @description Block translation in canvas. To use when a drag event occurs over canvas
   **/
  abortDrag() {
    this.dragStart = false; // Unlock dragStart boolean
  }


  connectorPath(startPoint, endPoint) {
    let horizontalFlag = false; // Horizontal layout (root on left/right)
    const orientation = this.style.tree.orientation; // Graph orientation
    const path = new Path2D(); // Draw path
    // Set horizontalFlag depending on graph orientation
    if (orientation === 1 || orientation === 3) {
      horizontalFlag = true;
    }

    if (horizontalFlag) { // Left and right
      this.__leftRightConnector(startPoint, endPoint, orientation, path);
    } else { // Top and bottom
      this.__bottomTopConnector(startPoint, endPoint, orientation, path);
    }

    return path;
  }


  __leftRightConnector(startPoint, endPoint, orientation, path) {
    let direction = 1;
    if (startPoint.end.x < endPoint.start.x) {
      direction = 2;
    } else if (startPoint.end.x > endPoint.start.x) {
      direction = 0;
    }

    const _curvedLineLeft = () => {
      path.moveTo(startPoint.end.x, startPoint.end.y);
      path.bezierCurveTo(
        startPoint.end.x + (this.style.tree.airspaceH / 2),
        startPoint.end.y,
        endPoint.start.x - (this.style.tree.airspaceH / 2),
        endPoint.start.y,
        endPoint.start.x,
        endPoint.start.y
      );
    };

    const _curvedLineRight = () => {
      path.moveTo(startPoint.end.x, startPoint.end.y);
      path.bezierCurveTo(
        startPoint.end.x - (this.style.tree.airspaceH / 2),
        startPoint.end.y,
        endPoint.start.x + (this.style.tree.airspaceH / 2),
        endPoint.start.y,
        endPoint.start.x,
        endPoint.start.y
      );
    };

    if (orientation === 1) { // Right
      switch (direction) {
        case 0: // endPoint is over startPoint
          _curvedLineRight();
          break;
        case 1: // endPoint is in the same row as startPoint
          path.moveTo(startPoint.end.x, startPoint.end.y);
          path.lineTo(endPoint.start.x, endPoint.start.y);
          break;
        case 2: // endPoint is under startPoint
          _curvedLineRight();
          break;
        default:
          console.log("Something went wrong with connector direction...");
          break;
      }
    } else { // Left
      switch (direction) {
          case 0: // endPoint is over startPoint
            _curvedLineLeft();
            break;
          case 1: // endPoint is in the same row as startPoint
            path.moveTo(startPoint.end.x, startPoint.end.y);
            path.lineTo(endPoint.start.x, endPoint.start.y);
            break;
          case 2: // endPoint is under startPoint
            _curvedLineLeft();
            break;
          default:
            console.log("Something went wrong with connector direction...");
            break;
      }
    }
  }


  __bottomTopConnector(startPoint, endPoint, orientation, path) {
    let direction = 1;
    if (startPoint.end.x < endPoint.start.x) {
      direction = 2;
    } else if (startPoint.end.x > endPoint.start.x) {
      direction = 0;
    }

    const _curvedLineBottom = () => {
      path.moveTo(startPoint.end.x, startPoint.end.y);
      path.bezierCurveTo(
        startPoint.end.x,
        startPoint.end.y - (this.style.tree.airspaceV / 2),
        endPoint.start.x,
        endPoint.start.y + (this.style.tree.airspaceV / 2),
        endPoint.start.x,
        endPoint.start.y
      );
    };

    const _curvedLineTop = () => {
      path.moveTo(startPoint.end.x, startPoint.end.y);
      path.bezierCurveTo(
        startPoint.end.x,
        startPoint.end.y + (this.style.tree.airspaceV / 2),
        endPoint.start.x,
        endPoint.start.y - (this.style.tree.airspaceV / 2),
        endPoint.start.x,
        endPoint.start.y
      );
    };

    if (orientation === 0) { // Top
      switch (direction) {
        case 0: // endPoint is at the left of startPoint
          _curvedLineTop();
          break;
        case 1: // endPoint is in the same col as startPoint
          path.moveTo(startPoint.end.x, startPoint.end.y);
          path.lineTo(endPoint.start.x, endPoint.start.y);
          break;
        case 2: // endPoint is at the right of startPoint
          _curvedLineTop();
          break;
        default:
          console.log("Something went wrong with connector direction...");
          break;
      }
    } else { // Bottom
      switch (direction) {
        case 0: // endPoint is at the left of startPoint
          _curvedLineBottom();
          break;
        case 1: // endPoint is in the same col as startPoint
          path.moveTo(startPoint.end.x, startPoint.end.y);
          path.lineTo(endPoint.start.x, endPoint.start.y);
          break;
        case 2: // endPoint is at the right of startPoint
          _curvedLineBottom();
          break;
        default:
          console.log("Something went wrong with connector direction...");
          break;
      }
    }
  }


  /**
   * @method eventListeners
   * @private
   * @description Canvas object event listeners
   **/
  _eventListeners() {
    this._evtIds.push(Evts.addEvent('mousedown', this.canvas, this._mouseDown, this));
    this._evtIds.push(Evts.addEvent('mousemove', this.canvas, this._mouseMove, this));
    this._evtIds.push(Evts.addEvent('mouseup', this.canvas, this._mouseUp, this));
    this._evtIds.push(Evts.addEvent('mouseout', this.canvas, this._mouseOut, this));
    this._evtIds.push(Evts.addEvent('DOMMouseScroll', this.canvas, this._mouseWheel, this));
    this._evtIds.push(Evts.addEvent('mousewheel', this.canvas, this._mouseWheel, this));
  }


  getCanvas() { 
    return this.canvas;
  }


  getCtx() {
    return this.ctx;
  }


  set graphSize(size) {
    this._graphSize = size;
  }


}


export default Canvas;
