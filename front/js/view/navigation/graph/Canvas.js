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
        this._createCanvas(); // Create DOM element
    }


    /**
     * @method createCanvas
     * @private
     * @description Build Canvas DOM object and Canvas internal attributes
     **/
    _createCanvas() {
        this.canvas = document.createElement('CANVAS'); // Canvas DOM element creation
        this.ctx    = this.canvas.getContext('2d');     // Extract context from canvas
        this.container.appendChild(this.canvas);

        this.canvas.id           = 'CanvasGraph';      // CSS ID
        this.canvas.style.width  = this.width  + 'px'; // Style canvas width
        this.canvas.style.height = this.height + 'px'; // Style canvas height
        this.canvas.width        = this.width;         // Scale canvas inner width
        this.canvas.height       = this.height;        // Scale canvas inner height
        this.pointer.x           = this.width  / 2;    // Init pointer X position
        this.pointer.y           = this.height / 2;    // Init pointer Y position
        this.scaleFactor         = 1.05;               // Zoom intensity

        this._trackTransforms(this.ctx); // Track canvas transformations (translate, scale)
        this._eventListeners();          // Trigger canvas transformations (translate, scale)
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
        this.isDragged = false;                                                     // Update lock
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
            let pt = this.ctx.transformedPoint(this.pointer.x, this.pointer.y);   // Convert pointer in canvas' coordinates
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

        if (!this.isDragged) { // Handle click event (zoom) - To disable, only comment the following line
            //this._zoom(event.shiftKey ? -1 : 1 ); // Zoom +/- depending on Shift/!Shift key pressed with left click
        }
    }


    /**
     * @method mouseWheel
     * @private
     * @description Handle mouse wheel event over the Canvas to zoom in the context
     * @param {event} event : Mouse event
     **/
    _mouseWheel(event) {
    	let delta = event.wheelDelta ? (event.wheelDelta / 40) : event.detail ? -event.detail : 0; // Convert scroll to variation

        if (delta) { this._zoom(delta); } // Apply if needed

        return (event.preventDefault() && false); // Keep propagation
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
    	let pt = this.ctx.transformedPoint(this.pointer.x, this.pointer.y), // Convert pointer in canvas' coordinates
            sf = Math.pow(this.scaleFactor, value);                        // Compute local scale factor

        this.ctx.translate(pt.x, pt.y);   // Positive offset accordingly
    	this.ctx.scale(sf, sf);           // Scale context
    	this.ctx.translate(-pt.x, -pt.y); // Negative offset to align
    }


    /**
     * @method trackTransforms
     * @private
     * @description Track and store all context transformations (scale, rotate, translate)
     * @param {object} ctx : Canvas context
     **/
    _trackTransforms(ctx) {
        let svg             = document.createElementNS("http://www.w3.org/2000/svg", 'svg'), // {object} Create svg element
            xform           = svg.createSVGMatrix(),                                         // {object} Create SVG matrix
            savedTransforms = [];                                                            // {array}  Saved transformations

        ctx.getTransform = () => { return xform; }; // Get transform function

        let save             = ctx.save,             // {function} save ctx
            restore          = ctx.restore,          // {function} restore ctx
            scale            = ctx.scale,            // {function} scale ctx
            rotate           = ctx.rotate,           // {function} rotate ctx
            translate        = ctx.translate,        // {function} translate ctx
            transform        = ctx.transform,        // {function} add transformation
            setTransform     = ctx.setTransform,     // {function} set transformation
            transformedPoint = svg.createSVGPoint(); // {object}   (x, y) coordinates

        ctx.save = () => { // Save state
            savedTransforms.push(xform.translate(0, 0));

            return save.call(ctx);
        };

        ctx.restore = () => { // Restore state
            xform = savedTransforms.pop();

            return restore.call(ctx);
        };

        ctx.scale = (sx, sy) => { // Scale context
            xform = xform.scaleNonUniform(sx, sy);

            return scale.call(ctx, sx, sy);
        };

        ctx.rotate = (radians) => { // Rotate context
            xform = xform.rotate((radians * 180) / Math.PI);

            return rotate.call(ctx, radians);
        };

        ctx.translate = (dx, dy) => { // Translate context
            xform = xform.translate(dx, dy);

            return translate.call(ctx, dx, dy);
        };

        ctx.transform = (a, b, c, d, e, f) => { // Add transformation to context
            let matrix = svg.createSVGMatrix();

            matrix.a = a;
            matrix.b = b;
            matrix.c = c;
            matrix.d = d;
            matrix.e = e;
            matrix.f = f;

            xform = xform.multiply(matrix);

            return transform.call(ctx, a, b, c, d, e, f);
        };

        ctx.setTransform = (a, b, c, d, e, f) => { // Set context transformation
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;

            return setTransform.call(ctx, a, b, c, d, e, f);
        };

        ctx.transformedPoint = (x, y) => { // Get true coordinates in context
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
        let orientation    = this.style.tree.orientation; // Graph orientation
        let direction      = 1;                                   // Connector direction -> 0: left, 1: center, 2: right - default is straight line
        let horizontalFlag = false;                               // Horizontal layout (root on left/right)
        let path           = new Path2D();                        // Draw path
    
        if (orientation === 1 || orientation === 3) { horizontalFlag = true; } // Set horizontalFlag depending on graph orientation
    
        if (horizontalFlag) { // Left and right
            if      (startPoint.end.y < endPoint.start.y) { direction = 2; }
            else if (startPoint.end.y > endPoint.start.y) { direction = 0; }
    
            if (orientation === 1) { // Right
                switch (direction) {
                    case 0: // endPoint is over startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.bezierCurveTo(
                            startPoint.end.x - (this.style.tree.airspaceH / 2),
                            startPoint.end.y,
                            endPoint.start.x + (this.style.tree.airspaceH / 2),
                            endPoint.start.y,
                            endPoint.start.x,
                            endPoint.start.y
                        );
                        break;
                    case 1: // endPoint is in the same row as startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.lineTo(endPoint.start.x, endPoint.start.y);
                        break;
                    case 2: // endPoint is under startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.bezierCurveTo(
                            startPoint.end.x - (this.style.tree.airspaceH / 2),
                            startPoint.end.y,
                            endPoint.start.x + (this.style.tree.airspaceH / 2),
                            endPoint.start.y,
                            endPoint.start.x,
                            endPoint.start.y
                        );
                        break;
                    default:
                        console.log("Something went wrong with connector direction...");
                        break;
                }
            }
    
            else { // Left
                switch (direction) {
                    case 0: // endPoint is over startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.bezierCurveTo(
                            startPoint.end.x + (this.style.tree.airspaceH / 2),
                            startPoint.end.y,
                            endPoint.start.x - (this.style.tree.airspaceH / 2),
                            endPoint.start.y,
                            endPoint.start.x,
                            endPoint.start.y
                        );
                        break;
                    case 1: // endPoint is in the same row as startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.lineTo(endPoint.start.x, endPoint.start.y);
                        break;
                    case 2: // endPoint is under startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.bezierCurveTo(
                            startPoint.end.x + (this.style.tree.airspaceH / 2),
                            startPoint.end.y,
                            endPoint.start.x - (this.style.tree.airspaceH / 2),
                            endPoint.start.y,
                            endPoint.start.x,
                            endPoint.start.y
                        );
                        break;
                    default:
                        console.log("Something went wrong with connector direction...");
                        break;
                }
            }
        }
    
        else { // Top and bottom
            if      (startPoint.end.x < endPoint.start.x) { direction = 2; }
            else if (startPoint.end.x > endPoint.start.x) { direction = 0; }
    
            if (orientation === 0) { // Top
                switch (direction) {
                    case 0: // endPoint is at the left of startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.bezierCurveTo(
                            startPoint.end.x,
                            startPoint.end.y + (this.style.tree.airspaceV / 2),
                            endPoint.start.x,
                            endPoint.start.y - (this.style.tree.airspaceV / 2),
                            endPoint.start.x,
                            endPoint.start.y
                        );
                        break;
                    case 1: // endPoint is in the same col as startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.lineTo(endPoint.start.x, endPoint.start.y);
                        break;
                    case 2: // endPoint is at the right of startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.bezierCurveTo(
                            startPoint.end.x,
                            startPoint.end.y + (this.style.tree.airspaceV / 2),
                            endPoint.start.x,
                            endPoint.start.y - (this.style.tree.airspaceV / 2),
                            endPoint.start.x,
                            endPoint.start.y
                        );
                        break;
                    default:
                        console.log("Something went wrong with connector direction...");
                        break;
                }
            }
    
            else { // Bottom
                switch (direction) {
                    case 0: // endPoint is at the left of startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.bezierCurveTo(
                            startPoint.end.x,
                            startPoint.end.y - (this.style.tree.airspaceV / 2),
                            endPoint.start.x,
                            endPoint.start.y + (this.style.tree.airspaceV / 2),
                            endPoint.start.x,
                            endPoint.start.y
                        );
                        break;
                    case 1: // endPoint is in the same col as startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.lineTo(endPoint.start.x, endPoint.start.y);
                        break;
                    case 2: // endPoint is at the right of startPoint
                        path.moveTo(startPoint.end.x, startPoint.end.y);
                        path.bezierCurveTo(
                            startPoint.end.x,
                            startPoint.end.y - (this.style.tree.airspaceV / 2),
                            endPoint.start.x,
                            endPoint.start.y + (this.style.tree.airspaceV / 2),
                            endPoint.start.x,
                            endPoint.start.y
                        );
                        break;
                    default:
                        console.log("Something went wrong with connector direction...");
                        break;
                }
            }
        }
    
        return path;
    }


    /**
     * @method eventListeners
     * @private
     * @description Canvas object event listeners
     **/
    _eventListeners() {
        this.canvas.addEventListener('mousedown',      this._mouseDown.bind(this),    false); // Pointer click
        this.canvas.addEventListener('mousemove',      this._mouseMove.bind(this),    false); // Pointer movement
        this.canvas.addEventListener('mouseup',        this._mouseUp.bind(this),      false); // Pointer click released
        this.canvas.addEventListener('mouseout',       this._mouseOut.bind(this),     false); // Pointer out of bounds
        this.canvas.addEventListener('DOMMouseScroll', this._mouseWheel.bind(this),   false); // Scroll (firefox)
		this.canvas.addEventListener('mousewheel',     this._mouseWheel.bind(this),   false); // Scroll (others)
    }

    /*  ----  GETTERS  ----  */
    getCanvas() { return this.canvas; }
    getCtx()    { return this.ctx;    }
}


export default Canvas;
