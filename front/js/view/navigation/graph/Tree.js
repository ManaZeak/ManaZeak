import Node from './Node';
import Layout from './Layout';


class Tree {
  /**
   * @class Tree
   * @constructor
   * @description Tree object to store all nodes
   *              Contains an array of Node objects with individual information
   *              and a Layout object to handle node positioning
   * @param {string} url        : Exposed API url to get tree from
   * @param {function} callback : Callback function to call once tree fetching is done
   **/
  constructor(options) {
    this.style = options.style;
    this._data = options.data;
    this.nodes     = [];       // {array}    Nodes array
    this.layout    = null;     // {object}   Layout controller
    this.callback  = options.callback; // {function} End of loading callback
    this._loadNodes(); // Fill nodes array
  }


  destroy() {
  this.layout.destroy();

  for (let i = 0; i < this.nodes.length; ++i) {
    this.nodes[i].destroy();
  }

  Utils.removeAllObjectKeys(this);
  }


  /**
   * @method loadNodes
   * @private
   * @description GET the API url and build Tree object
   **/
  _loadNodes() {
    this._addNode(this._data.genres, null);    // Make tree first iteration, recursive call
    this.layout = new Layout(this.style);      // Arrange layout (set cartesian coordinates)
    this.layout.arrange(this.nodes); // Orientation (0: root top || 1: root: right || 2: root bottom || 3: root left)
  }


  /**
   * @method addNode
   * @private
   * @description Recursive function to add a root and all its children
   * @param {object} toAdd  : The root node to add. Can come straight from the raw JSON of from an existing node
   * @param {object} parent : Parent node, must be null for the root
   **/
  _addNode(toAdd, parent) {
    const node = new Node(toAdd, parent, this.style); // Create node
    this.nodes.push(node); // Fill nodes array
    if (toAdd.subgenres) { // toAdd comes from JSON (raw node)
      for (let i = 0; i < toAdd.subgenres.length; ++i) { // Iterate over children
        this._addNode(toAdd.subgenres[i], node); // Recursive call on each children
      }
    } else { // toAdd comes from an existing Node
      for (let i = 0; i < toAdd.subgenres.length; ++i) { // Iterate over children
        this._addNode(toAdd.subgenres[i], node); // Recursive call on each children
      }
    }
  }


  /**
   * @method updateLayout
   * @description Update layout object (musty be called for after each modification in the tree hierrarchy)
   **/
  updateLayout() {
    this.layout.arrange(this.nodes); // Call layout arrange method
  }


  /**
   * @method reorganizeTree
   * @description Clear and re-create the nodes array, according to hierrarchy contained in root node
   **/
  reorganizeTree() {
    let root = this.nodes[0]; // Save root node
    this.nodes = []; // Clear tree nodes
    this._addNode(root, null); // Build tree again
  }


  /**
   * @method unselectAll
   * @description Unselect every node in tree
   **/
  unselectAll() {
    for (let i = 0; i < this.nodes.length; ++i) { // Iterate over nodes array
      this.nodes[i].unselect(); // Unselect node
    }
  }


  layoutSize() {
    return this.layout.getSize();        
  }


}


export default Tree;
