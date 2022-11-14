class Layout {


  /**
   * @class Layout
   * @constructor
   * @description Arrange a model into a grid filled with nodes
   **/
  constructor(style) {
    this.orientation = null; // Layout orientation
    this._levels = {}; // Layout levels (not depending on orientation)
    this.style = style;
    this._max = {
      x: 0,
      y: 0
    };        
  }


  destroy() {
    Utils.removeAllObjectKeys(this);
  }


  /**
   * @method arrange
   * @description Arranges a hierarchical collection of nodes
   * @param {array} nodes - Tree root of the model
   * @param {int} orientation - The layout orientation
   **/
  arrange(nodes) {
    this._levels = {}; // Reset levels
    this.orientation = this.style.tree.orientation; // Assign orientation
    this._fillLevels(nodes); // Fill levels object with nodes contained in each row
    this._organizeLevels(this._levels); // Place nodes in layout relatively to each other
    this._generateLocations(nodes); // Generate nodes origins
  }


  /**
   * @method _fillLevels
   * @private
   * @description Order nodes by their depth in the tree
   * @param {array} nodes : Tree nodes array
   **/
  _fillLevels(nodes) {
    for (let i = 0; i < nodes.length; ++i) { // Iterate over nodes
      if (nodes[i].isVisible) {
        let arrayRef = [];
        let count = 0;
        let parentNode = nodes[i].getParent();

        while (parentNode !== null) { // Getting node depth (count parent number until root)
          ++count;                             // Increment
          parentNode = parentNode.getParent(); // Crawl up in the tree
        }

        if (this._levels[count] === undefined) { // Create new level
          arrayRef = this._levels[count] = []; // Make
        } else { // Use existing level
          arrayRef = this._levels[count]; // Use
        }

        arrayRef.push(nodes[i]); // Save node in level
      }
    }
  }


  /**
   * @method _organizeLevels
   * @private
   * @description Parse node array to gave them grid coordinates relatively aligned
   * @param {object} levels : Array of node organize by depth in graph
   **/
  _organizeLevels(levels) {
    const keys = Object.keys(levels); // Get key number in levels
    const reservedCols = []; // Already used cols - NB: Carefull, have to substract -1 when comparing
    for (let i = 0; i < keys.length; ++i) { // Parse levels
      const nodes = levels[keys[i]]; // Get all nodes in level
      let positionCursor = 0; // Cursor that moves from the left to the right of the level
      for (let j = 0; j < nodes.length; ++j) { // Parse nodes
        switch (this.orientation) { // Assign first coordinate (row or col depending on orientation)
          case 0: // Top
            nodes[j].row = parseInt(keys[i]); // From the beginning
            break;
          case 1: // Left
            nodes[j].col = (keys.length - parseInt(keys[i])); // From the end
            break;
          case 2: // Bottom
            nodes[j].row = (keys.length - parseInt(keys[i])); // From the end
            break;
          case 3: // Right
            nodes[j].col = parseInt(keys[i]); // From the beginning
            break;
          default: // Fallback (top)
            nodes[j].row = parseInt(keys[i]); // From the beginning
            break;
        }
        /*  ----  NODE INFORMATION  ----  */
        nodes[j].widthInGraph  = this._getWidth(nodes[j]) + 1; // Get node width, we need to count the node itself too
        nodes[j].heightInGraph = 0; // Default node depth value (to avoid undefined values)
        this._getHeight(nodes[j]); // Get height of node
        /*  ----  CASE 1 : NODE IN GRAPH ----  */
        if (nodes[j].children.length !== 0) {
          positionCursor = this.__childrenNode(reservedCols, positionCursor, nodes[j]);
        } else {
          positionCursor = this.__noChildrenNode(reservedCols, positionCursor, nodes[j]);
        }
      }
    }
  }


  __childrenNode(reservedCols, positionCursor, node) {
    if (node.widthInGraph === 1) {
      ++positionCursor;
    } else {
      while (reservedCols.indexOf(positionCursor) !== -1) {
        ++positionCursor;
      }
      positionCursor += Math.round(node.widthInGraph / 2); // reservedCols array only store integer, so we need to round
      if (node.widthInGraph % 2 === 0) { // If it is even, we offset the col position from a half
        positionCursor += 0.5;
      }
    }

    while (reservedCols.indexOf(Math.round(positionCursor) - 1) !== -1) { // reservedCols array only store integer, so we need to round
      ++positionCursor;
    }
    
    switch (this.orientation) { // Assign second coordinate (row or col depending on orientation)
      case 0: // Top
        node.col = positionCursor;
        break;
      case 1: // Left
        node.row = positionCursor;
        break;
      case 2: // Bot
        node.col = positionCursor;
        break;
      case 3: // Right
        node.row = positionCursor;
        break;
      default: // Fallback (top)
        node.col = positionCursor;
        break;
    }

    if (node.widthInGraph !== 1) {
      positionCursor += Math.floor(node.widthInGraph / 2);
      if (node.widthInGraph % 2 === 0) { // We must substract the offset before going any further
        positionCursor -= 0.5;
      }
    }

    return positionCursor;
  }


  __noChildrenNode(reservedCols, positionCursor, node) {
    while (reservedCols.indexOf(positionCursor) !== -1) {
      ++positionCursor;
    }

    reservedCols.push(positionCursor);
    ++positionCursor;

    switch (this.orientation) { // Assign second coordinate (row or col depending on orientation)
      case 0: // Top
        node.col = positionCursor;
        break;
      case 1: // Left
        node.row = positionCursor;
        break;
      case 2: // Bot
        node.col = positionCursor;
        break;
      case 3: // Right
        node.row = positionCursor;
        break;
      default: // Fallback (top)
        node.col = positionCursor;
        break;
    }

    return positionCursor;
  }


  /**
   * @method _generateLocations
   * @private
   * @description Generate coordinates on a node and its children
   * @param {array} nodes     : Tree nodes array
   * @param {int} orientation : The layout orientation
   **/
  _generateLocations(nodes) {
    for (let i = 0; i < nodes.length; ++i) { // Iterate over nodes
      const origin = {
        x: (nodes[i].col * (this.style.node.width + this.style.tree.airspaceH)), // X coordinate
        y: (nodes[i].row * (this.style.node.height + this.style.tree.airspaceV)) // Y coordinate
      };

      nodes[i].setOrigin(origin); // Apply origin to node

      if (origin.x > this._max.x) {
        this._max.x = origin.x;
      }

      if (origin.y > this._max.y) {
        this._max.y = origin.y;
      }

      if (this.orientation === 1 || this.orientation === 3) { // Horizontal layout orientation
        [nodes[i].widthInGraph, nodes[i].heightInGraph] = [nodes[i].heightInGraph, nodes[i].widthInGraph]; // Swap col and row (flip layout)
      }

      if (nodes[i].children.length > 0) { // Not a leaf
        this._generateLocations(nodes[i].children); // Recursive call on children
      }
    }
  }


  /**
   * @method _getWidth
   * @private
   * @description Returns the total width of a node regarding its children (return value in col number)
   * @param {object} node : Node to determine the width in graph.
   * @return {int} Total width in graph (not in pixel, in node count)
   **/
  _getWidth(node) {
    let count = (node.children.length > 0) ? (node.children.length - 1) : 0; // Count children number

    for (let i = 0; i < node.children.length; ++i) { // Iterate over node children
      count += this._getWidth(node.children[i]); // Recusrive call on childen
    }

    return count; // Return width
  }


  /**
   * @method _getHeight
   * @private
   * @description Returns the total height of a node regarding its children
   * @param {object} node : Node to determine the width in graph
   * @return {int} Total height in graph (not in pixel, in node count)
   **/
  _getHeight(node) {
    let count = 1; // Init node height
    let parentNode = node.getParent(); // Store parent

    while (parentNode !== null) { // Iterate over parent
      parentNode.heightInGraph = count;    // Update parent depth
      ++count;                             // Increment
      parentNode = parentNode.getParent(); // Iterate
    }
  }


  getSize() {
    return {
      height: this._max.y,
      width: this._max.x
    };
  }


}


export default Layout;
