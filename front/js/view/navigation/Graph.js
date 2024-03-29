import Canvas from './graph/Canvas';
import Tree from './graph/Tree';


class Graph {


  /**
   * @class AppController
   * @constructor
   * @description Build tree and picklists as local models,
   *              Draw in Canvas the graph
   *              Handle mouse events
   * @param {object} options : Contains the Canvas object, the Picklists object and the Tree object
   **/
  constructor(options) {
    this.data = options.data;
    this.style = options.style;
    this.cellClickedCB = options.cellClicked;
    this.canvas = new Canvas(options);
    this.tree = new Tree({
      data: this.data,
      style: this.style
    });

    this._rafId = -1;
    this._evtIds = [];

    this._init();
    this._eventListeners(); // Listen to App events
  }


  destroy() {
    window.cancelAnimationFrame(this._rafId);
    Utils.clearAllEvents(this._evtIds);
    this.tree.destroy();
    this.canvas.destroy();
    Utils.removeAllObjectKeys(this);
  }


  /**
   * @method start
   * @description App is ready to use
   **/
   _init(size) {
      this.canvas.graphSize = this.tree.layoutSize();
      this._rafId = window.requestAnimationFrame(this._draw.bind(this)); // Start draw animation
      // Center canvas on root node depending on orientation
      this.centerOnRootNode();
  }


  /**
   * @method eventListeners
   * @description Listen to App mouse event (node dragging)
   **/
  _eventListeners() {
    this._evtIds.push(Evts.addEvent('mousemove', this.canvas.canvas, this._canvasHovered, this)); // Cursor on hover
    this._evtIds.push(Evts.addEvent('touchmove', this.canvas.canvas, this._canvasHovered, this));
    this._evtIds.push(Evts.addEvent('click', this.canvas.canvas, this._click, this)); // Select node
    this._evtIds.push(Evts.addEvent('touchstart', this.canvas.canvas, this._click, this));
  }


  /**
   * @method mouseMove
   * @description Handle mouse move event in the app
   * @param {event} event : Mouse event
   **/
  _canvasHovered(event, newNode) {
    const hoverPosition = this.canvas.ctx.transformedPoint( // Get clicked position relatively to all canvas transformations
      event.offsetX || (event.pageX - this.canvas.offsetLeft), // X coordinate
      event.offsetY || (event.pageY - this.canvas.offsetTop) // Y coordinate
    );
    // Coming from touch event
    if (hoverPosition.x === 0 && hoverPosition.y === 0) {
      hoverPosition.x = event.targetTouches[0].pageX;
      hoverPosition.y = event.targetTouches[0].pageY;
    }

    for (let i = 0; i < this.tree.nodes.length; ++i) { // Iterate over nodes
      if (this.tree.nodes[i].isInNode(hoverPosition) && this.canvas.getCanvas().style.cursor === 'inherit') {
        this.canvas.getCanvas().style.cursor = 'pointer';
        this.tree.nodes[i].isHovered = true;
        return;
      }
      this.tree.nodes[i].isHovered = false;
      this.canvas.getCanvas().style.cursor = 'inherit';
    }
  }


  /**
   * @method click
   * @private
   * @description Handle click event in the app
   * @param {event} event : Mouse event
   **/
  _click(event) {
    const clickPosition = this.canvas.ctx.transformedPoint( // Get clicked position relatively to all canvas transformations
      event.offsetX || (event.pageX - this.canvas.offsetLeft), // X coordinate
      event.offsetY || (event.pageY - this.canvas.offsetTop) // Y coordinate
    );
    // Coming from touch event
    if (clickPosition.x === 0 && clickPosition.y === 0) {
      clickPosition.x = event.targetTouches[0].pageX;
      clickPosition.y = event.targetTouches[0].pageY;
    }

    for (let i = 0; i < this.tree.nodes.length; ++i) { // Iterate over nodes
      if (this.tree.nodes[i].isInNode(clickPosition)) { // Collision detection
        this.tree.unselectAll(); // Unselect all nodes
        this.tree.nodes[i].select(); // Select target node
        this.cellClickedCB({
          name: this.tree.nodes[i].label,
          info: this.tree.nodes[i].info,
          parent: this.tree.nodes[i].parent ? this.tree.nodes[i].parent.label : '',
          children: this.tree.nodes[i].getChildrenLabels()
        });
        return; // Exit loop
      }
    }

    this.cellClickedCB();
    this.tree.unselectAll(); // If no nodes have been clicked, we unselect all nodes
  }


  /**
   * @method draw
   * @private
   * @description Draw the tree in Canvas. Use RequestAnimationFram for more fluidity
   **/
  _draw() {
    this.canvas.ctx.save(); // Save previous translation / scale state
    this.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation temporary
    this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height); // Clearing viewport
    this.canvas.ctx.restore(); // Restoring translation / scale state

    for (let i = 0; i < this.tree.nodes.length; ++i) { // Iterate over tree
      if (this.tree.nodes[i].isVisible) { // Node visibility test
        this.tree.nodes[i].draw(this.canvas.ctx, this.tree.nodes[i].origin, this.tree.nodes[i].label); // Draw node

        if (this.tree.nodes[i].parent) { // Node parent test
          this.canvas.ctx.strokeStyle = this.style.tree.connectorColor; // Connector color
          // Draw connector
          this.canvas.ctx.stroke(this.canvas.connectorPath(
            this.tree.nodes[i].parent.getConnectorCoordinates(),
            this.tree.nodes[i].getConnectorCoordinates()
          ));
        }
      }
    }

    this._rafId = window.requestAnimationFrame(this._draw.bind(this)); // Request next frame
  }


  centerOnRootNode() {
    let pt = {};
    
    if (this.style.tree.orientation === 0) { // Top to Bottom
      pt = this.canvas.ctx.transformedPoint(
        -this.tree.nodes[0].origin.x + (this.canvas.width / 2) - (this.style.node.width / 2),
        -this.tree.nodes[0].origin.y + 100
      );
    } else if (this.style.tree.orientation === 1) { // Right to Left
      pt = this.canvas.ctx.transformedPoint(
        -this.tree.nodes[0].origin.x + this.canvas.width - this.style.node.width - 100,
        -this.tree.nodes[0].origin.y + (this.canvas.height / 2) - (this.style.node.height / 2)
      );
    } else if (this.style.tree.orientation === 2) { // Bottom to Top
      pt = this.canvas.ctx.transformedPoint(
        -this.tree.nodes[0].origin.x + (this.canvas.width / 2) - (this.style.node.width / 2),
        -this.tree.nodes[0].origin.y + (this.canvas.height) - this.style.node.height - 100
      );
    } else if (this.style.tree.orientation === 3) { // Left to Right
      pt = this.canvas.ctx.transformedPoint(
        -this.tree.nodes[0].origin.x + 100,
        -this.tree.nodes[0].origin.y + (this.canvas.height / 2) - (this.style.node.height / 2)
      );
    }
    // Translate accordingly
    this.canvas.ctx.translate(pt.x, pt.y);
  }


}


export default Graph;
