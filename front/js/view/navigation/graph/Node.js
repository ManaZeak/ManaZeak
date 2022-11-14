class Node {


  /**
   * @class Node
   * @constructor
   * @description Node object to store in a Tree object
   *              Contains all methods to manipulate the node in the tree
   *              Can be built with a raw node from JSON or from an existing node (JSON formatting of the options argument)
   * @param {object} options : Node specifications (node ID, node position compare to siblings, node type)
   * @param {object} parent  : Parent node, has to be null for root node **/
  constructor(opts, parent, style) {
    this.style = style;
    this.info = opts.info; // Node type
    this.label = opts.name; // Node label text
    this.children = []; // Children nodes, array
    this.parent = parent; // Parent node
    this.col = 0; // Node column number in grid
    this.row = 0; // Node row number in grid
    this.origin = { x: 0, y: 0 }; // Node coordinates
    this.isSelected = false; // Node selection boolean
    this.isHovered = false; // Node selection boolean
    this.isVisible = true; // Node visibility boolean
    this.isCandidate = false; // Node closest candidate (drag)
    this.context = null; // Node context info (picklist)
    // Add current node to its parent as children
    if (this.parent) {
      this.parent.children.push(this);
    }
  }


  destroy() {
    Utils.removeAllObjectKeys(this);
  }


  /**
   * @method drawNode
   * @description Draw tree nodes in canvas
   * @param {object} ctx    : Canvas context to draw node in
   * @param {object} origin : X and Y origin coordinates
   * @param {string} text   : Node label
   **/
  draw(ctx, origin, text) {
    // Local variables initialization
    const x = origin.x; // Path starting X coordinate
    const y = origin.y; // Path starting Y coordinate
    const height = this.style.node.height; // Node height
    const width = this.style.node.width; // Node width
    const radius = { // Border radius
      tl: this.style.node.radius, tr: this.style.node.radius, // Top
      br: this.style.node.radius, bl: this.style.node.radius  // Bottom
    };
    // Node drawing path
    ctx.beginPath(); // Canvas edit start
    ctx.moveTo(x + radius.tl, y); // Begin on top left, after radius
    ctx.lineTo(x + width - radius.tr, y); // Go to top right
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr); // Apply radius
    ctx.lineTo(x + width, y + height - radius.br); // Go to bottom right
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height); // Apply radius
    ctx.lineTo(x + radius.bl, y + height); // Go to bottom left
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl); // Apply radius
    ctx.lineTo(x, y + radius.tl); // Go to top left
    ctx.quadraticCurveTo(x, y, x + radius.tl, y); // Apply radius
    ctx.closePath(); // Canvas edit done
    ctx.stroke(); // Apply border
    // Background color
    if (this.isSelected) {
      ctx.fillStyle = this.style.node.selectedBackground;
    } else if (this.isHovered) {
      ctx.fillStyle = this.style.node.hoveredBackground;
    } else {
      ctx.fillStyle = this.style.node.background;
    }
    ctx.fill(); // Apply background
    // Text
    ctx.fillStyle = "rgb(45, 45, 45)"; // Font color
    ctx.font = `${this.style.node.fontSize}px sans-serif`; // Font style
    ctx.textAlign = 'center';
    ctx.fillText(this.fitString(ctx, text, this.style.node.maxTextWidth), // Apply font color
      x + this.style.node.paddingH,
      y + this.style.node.paddingV
    );
    // Highlight candidate node connector (drag)
    if (this.isCandidate) {
      const coord = { x: 0, y: 0 }; // End connector coordinates
      switch (this.style.tree.orientation) { // Compute coordinate depending on graph orientation
        case 0: // Top
          coord.x = this.origin.x + (this.style.node.width / 2);
          coord.y = this.origin.y + this.style.node.height;
          break;
        case 1: // Left
          coord.x = this.origin.x;
          coord.y = this.origin.y + (this.style.node.height / 2);
          break;
        case 2: // Bot
          coord.x = this.origin.x + (this.style.node.width / 2);
          coord.y = this.origin.y;
          break;
        case 3: // Right
          coord.x = this.origin.x + (this.style.node.width);
          coord.y = this.origin.y + (this.style.node.height / 2);
          break;
        default:
          console.error("The layout orientation has taken an invalid value.");
          break;
      }

      ctx.beginPath(); // Canvas edit start
      ctx.arc(coord.x, coord.y, 5, 0, 2 * Math.PI, false); // Draw circle
      ctx.fillStyle = 'rgba(255,0,0,1)'; // Set connector color
      ctx.fill(); // Apply color
      ctx.closePath(); // Canvas edit done
    }
  }


  /**
   * @method getConnectorCoordinates
   * @description Compute node start and end connectors coordinates (start = from parent to node && end = from node to children)
   * @return {object} X and Y coordinates for both start and end
   **/
  getConnectorCoordinates() {
    const coord = { // Connectors coordinates
      start: { x: 0, y: 0 }, // From parent to node connector
      end: { x: 0, y: 0 } // From node to children connector
    };

    switch (this.style.tree.orientation) { // Compute coordinate depending on graph orientation
      case 0: // Top
        coord.start.x = this.origin.x + (this.style.node.width / 2);
        coord.start.y = this.origin.y;
        coord.end.x   = this.origin.x + (this.style.node.width / 2);
        coord.end.y   = this.origin.y + this.style.node.height;
        break;
      case 1: // Left
        coord.start.x = this.origin.x + this.style.node.width;
        coord.start.y = this.origin.y + (this.style.node.height / 2);
        coord.end.x   = this.origin.x;
        coord.end.y   = this.origin.y + (this.style.node.height / 2);
        break;
      case 2: // Bot
        coord.start.x = this.origin.x + (this.style.node.width / 2);
        coord.start.y = this.origin.y + this.style.node.height;
        coord.end.x   = this.origin.x + (this.style.node.width / 2);
        coord.end.y   = this.origin.y;
        break;
      case 3: // Right
        coord.start.x = this.origin.x;
        coord.start.y = this.origin.y + (this.style.node.height / 2);
        coord.end.x   = this.origin.x + (this.style.node.width);
        coord.end.y   = this.origin.y + (this.style.node.height / 2);
        break;
      default:
        console.error("The layout orientation has taken an invalid value.");
        break;
    }

    return coord;
  }


  /**
   * @method isInNode
   * @description Test collision between position coordinates and node coordinates
   * @param {object} position : X and Y coordinates
   * @return {bool} Is in node?
   **/
  isInNode(position) {
    let inside = false; // In node indicator boolean
    const x = position.x; // X target
    const y = position.y; // Y target

    if (x >= this.origin.x && // Greater than X origin
      x <= this.origin.x + this.style.node.width &&  // Smaller than X origin + node width
      y >= this.origin.y && // Greater than Y origin
      y <= this.origin.y + this.style.node.height) { // Smaller than Y origin + node height
      inside = true;
    }

    return inside;
  }


  /**
   * @method select
   * @description Select node in graph and opens its context menu to show picklist items
   * @param {object} picklist : Node associated picklist
   * @param {object} origin   : X and Y coordinates
   **/
  select() {
    this.isSelected = true; // Lock selection boolean
  }


  /**
   * @method unselect
   * @description Unselect node in graph and close its context menu
   **/
  unselect() {
    this.isSelected = false; // Unlock selection boolean
    if (this.context) {
      this.context.clear(); // Clear context object
      this.context = null;  // Destroy context object
    }
  }


  /**
   * @method showChildren
   * @description Recursive function to show a node and all its children
   * @param {object} node : Starting node to show
   **/
  showChildren(node) {
    if (node.children) { // Child existence
      for (let i = 0; i < node.children.length; ++i) { // Parse node's children
        node.children[i].isVisible = true;   // Lock visibility boolean
        this.showChildren(node.children[i]); // Recurse over children
      }
    }
  }


  /**
   * @method hideChildren
   * @description Recursive function to hide a node and all its children
   * @param {object} node : Starting node to hide
   **/
  hideChildren(node) {
    if (node.children) { // Child existence
      for (let i = 0; i < node.children.length; ++i) { // Parse node's children
        node.children[i].isVisible = false;  // Unlock visibility boolean
        this.hideChildren(node.children[i]); // Recurse over children
      }
    }
  }


  getChildrenLabels() {
    const output = [];
    for (let i = 0; i < this.children.length; ++i) {
      output.push(this.children[i].label);
    }
    return output;
  }



  fitString(ctx, str, maxWidth) {
    const ellipsis = '…'; // Ellipsis text format
    let width = ctx.measureText(str).width; // Get str width
    const ellipsisWidth = ctx.measureText(ellipsis).width; // Get ellipsis width

    if (width <= maxWidth || width <= ellipsisWidth) { // String can be display as it is
      return str; // Return input string
    } else { // String is overflowing
      let len = str.length; // Save string length

      while (width >= maxWidth - ellipsisWidth && --len > 0) { // Until it does not fit
        str = str.substring(0, len);      // Remove last character
        width = ctx.measureText(str).width; // Update width
      }

      return (str + ellipsis); // Return edited string
    }
  }


  getChildren() {
    return this.children;
  }
  
  
  getParent() {
    return this.parent ? this.parent : null;
  }


  setLabel(label) {
    this.label = label; 
  }


  setOrigin(origin) {
    this.origin = origin; 
  }
  
  
  setIsCandidate(candidate) {
    this.isCandidate = candidate;
  }


}


export default Node;
