import SceneView from '../SceneView';
import ListViewEntry from './ListViewEntry';
import ScrollBar from '../../../utils/ScrollBar.js';
import TrackContext from "./TrackContext";

import listview from '../../../../../static/json/default/listview.json';
'use strict';

class ListView extends SceneView {
  /**
   * @summary ListView for mzk Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description ListView that display tracks with customizable columns (size and type) in rows
   * @param {object} options - The ListView options object
   * @param {array} options.availableColumns - The ListView available column (not necessarly the ones that are displayed)
   * @param {array} options.columns - The user columns
   * @param {object} options.target - The DOM target node to inject ListView in (usually mzk Scene)
   **/
  constructor(options) {
    super(options);

    this._availableColumns = listview.availableColumns;
    this._columns = listview.defaultColumns; // TODO Get from user pref first, and fallback to default if not prefs
    this._trackContext = {}; // Context menu clicked on a track
    this._draggedColumn = null; // Currently dragged column
    this._dom = {
      fragment: {},
      wrapper: {},
      header: {},
      container: {}
    };
    this._init();
    this._events();

  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _init() {
    this._dom.fragment = document.createDocumentFragment();
    this._dom.wrapper = document.createElement('DIV');
    this._dom.header = document.createElement('DIV');
    this._dom.container = document.createElement('DIV');

    this._dom.wrapper.classList.add('listview');
    this._dom.header.classList.add('header');
    this._dom.container.classList.add('track-container');

    this._dom.wrapper.appendChild(this._dom.header);
    this._dom.wrapper.appendChild(this._dom.container);
    this._dom.fragment.appendChild(this._dom.wrapper);

    this._trackContext = new TrackContext({
      target: this._dom.container,
      url: 'contexts/trackcontext/'
    });

    setTimeout(() => {
      this._initHeader();
    }, 0); // Wait that header has been added to the DOM
  }

  _events() {
    this._dom.container.addEventListener('click', (event) => {
      this._trackClicked(event);
    });

    this._dom.container.addEventListener('contextmenu', event => {
      event.preventDefault();

      if (this._dom.container.contains(this._trackContext.dom)) {
        this._trackContext.close();
      } else {
        this._contextClicked(event);
      }
    });

    window.addEventListener('click', (event) => {
      if (event.target.id === 'scene') {
        this.unselectAll();
      }
    });

    window.addEventListener('resize', () => {
      this._refreshGridColumn(this._computeGridTemplateColumns());
    });
  }

  _contextClicked(event) {
    if (event.target.closest('.track')) {
      // Event target is a column, we need to parent tiil we have the track-container
      this._trackContext.open(event, event.target.parentNode.dataset.id);
    }
  }

  _initHeader() {
    const fragment = document.createDocumentFragment();
    this._dom.header.style.gridTemplateColumns = this._computeGridTemplateColumns(); // Assign CSS rule

    for (let i = 0; i < this._columns.length; ++i) { // Fill header with user's columns
      this._columns[i].order = i; // Assign column order

      const column = document.createElement('DIV');
      const stretch = document.createElement('IMG');
      const resize = document.createElement('DIV');

      column.classList.add(this._columns[i].name.toLowerCase());
      column.setAttribute('draggable', 'true');
      column.innerHTML = this._columns[i].name;
      column.dataset.id = i;

      stretch.classList.add('listview-stretch-button');
      stretch.setAttribute('draggable', 'false');
      stretch.src = '/static/img/actions/stretch-x.svg';

      resize.classList.add('listview-resize-handle');

      column.appendChild(resize);
      column.appendChild(stretch);
      fragment.appendChild(column);
      // Add header events : Drag'n'Drop, resize and stretch self
      this._handleDragEvents(column);
      this._handleResizeEvents(resize);
      stretch.addEventListener('click', (event) => {
        this._stretchColumn(event.target.parentNode);
      });
    }

    this._dom.header.appendChild(fragment);
  }

  _handleResizeEvents(handle) {
    const parent = handle.parentNode;
    const marker = document.createElement('DIV');
    let grabbed = false;

    const resize = event => {
      const target = this._dom.wrapper.parentNode;
      grabbed = true;
      this._dom.wrapper.appendChild(marker);
      parent.style.width = `${(event.clientX) - (parent.offsetLeft + target.offsetLeft)}px`;
      marker.style.left = `${event.clientX - target.offsetLeft - 1}px`;
    };

    const stopResizing = event => {
      mzk.view.startLoading()
        .then(() => {
          event.target.parentNode.setAttribute('draggable', 'true');
          window.removeEventListener('mousemove', resize, false);
          window.removeEventListener('mouseup', stopResizing, false);

          if (grabbed) {
            grabbed = false;
            this._dom.wrapper.removeChild(marker);
            for (let i = 0; i < this._columns.length; ++i) {
              if (this._columns[i].name === parent.innerHTML.match(/.*?(?=<div|$)/i)[0]) {
                this._columns[i].width = (parent.style.width.slice(0, -2) * 100 / this._dom.wrapper.clientWidth);
                this._columns[i].width = this._columns[i].width.toString();
                break;
              }
            }
          }

          this._refreshGridColumn(this._computeGridTemplateColumns());
          mzk.view.stopLoading();
        });
    };

    const initResize = event => {
      event.target.parentNode.setAttribute('draggable', 'false');
      window.addEventListener('mousemove', resize, false);
      window.addEventListener('mouseup', stopResizing, false);
    };

    handle.addEventListener('mousedown', initResize, false);
    marker.id = 'listview-resize-marker';
  }

  _handleDragEvents(column) {
    const dragStart = e => {
      if (e.target.getAttribute('draggable') === false) {
        return;
      } // Abort drag, resize event is occuring
      this._draggedColumn = e.target; // Store drag start column
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target.outerHTML);
      e.target.classList.add('dragElem');
    };

    const dragOver = event => {
      if (event.target.getAttribute('draggable') === false) {
        return;
      } // Abort drag, resize event is occuring
      if (event.preventDefault) {
        event.preventDefault();
      } // Necessary. Allows us to drop.
      if (this._draggedColumn !== event.target) {
        event.target.classList.add('over');
      }
      event.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
    };

    const dragLeave = function() {
      this.classList.remove('over'); // this / e.target is previous target element.
    };

    const dragEnd = event => {
      // this/e.target is the source node.
      event.target.classList.remove('over');
      event.target.classList.remove('dragElem');
    };

    const drop = event => {
      // this/e.target is current target element.
      if (event.stopPropagation) {
        event.stopPropagation();
      } // Stops some browsers from redirecting.

      event.target.classList.remove('over');

      // Don't do anything if dropping the same column we're dragging.
      if (this._draggedColumn !== event.target) {
        event.target.removeEventListener('drageend', dragEnd, false);
        mzk.view.startLoading()
          .then(() => {
            for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
              const draggedColumn = this._dom.container.childNodes[i].childNodes[this._draggedColumn.dataset.id];
              const targetColumn = this._dom.container.childNodes[i].childNodes[event.target.dataset.id];

              this._dom.container.childNodes[i].insertBefore(draggedColumn, targetColumn);
            }

            if (this._draggedColumn.dataset.id < event.target.dataset.id) {
              this._columns.move(this._draggedColumn.dataset.id, event.target.dataset.id - 1); // Since we splice in move, we need to simulate insert
            } else { // No need to test id equality since self-drop is prevented : that._draggedColumn !== this
              this._columns.move(this._draggedColumn.dataset.id, event.target.dataset.id);
            }

            this._draggedColumn = null; // Must be done after column movement in grid
            this._refreshGridColumn();
            mzk.view.stopLoading();
          });
      } else {
        this._draggedColumn = null; //
      }
    };

    column.addEventListener('dragstart', dragStart, false);
    column.addEventListener('dragover', dragOver, false);
    column.addEventListener('dragleave', dragLeave, false);
    column.addEventListener('drop', drop, false);
    column.addEventListener('dragend', dragEnd, false);
  }

  _computeGridTemplateColumns() {
    let gridTemplateColumns = ''; // CSS grid rule

    for (let i = 0; i < this._columns.length; ++i) { // Init listview header and CSS grid columns rule
      gridTemplateColumns += `${(this._columns[i].width * (this._dom.wrapper.clientWidth / 100))}px `;
    }

    return gridTemplateColumns;
  }

  _refreshHeader(gridTemplateColumns) {
    this._dom.header.style.gridTemplateColumns = gridTemplateColumns;

    for (let i = 0; i < this._columns.length; ++i) { // Init listview header
      this._columns[i].order = i; // Refresh columns order

      const column = this._dom.header.childNodes[i];
      column.style = ''; // Remove old remaining width style value
      column.className = this._columns[i].name.toLowerCase();
      column.childNodes[0].nodeValue = this._columns[i].name; // Don't innerHTML to avoid remove of stretch and resize handles. childNodes[0] is #text node
      column.dataset.id = i;
    }
  }

  // gridTemplateColumns optionnal (custom set or self set)
  _refreshGridColumn(gridTemplateColumns) {
    if (!gridTemplateColumns) {
      gridTemplateColumns = this._computeGridTemplateColumns();
    }

    this._refreshHeader(gridTemplateColumns);

    for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
      this._dom.container.childNodes[i].style.gridTemplateColumns = gridTemplateColumns;
    }
  }

  _checkActivatedColumns() {
    const activatedColumns = [];

    for (let i = 0; i < this._columns.length; ++i) {
      for (let j = 0; j < this._availableColumns.length; ++j) {
        if (this._columns[i].name === this._availableColumns[j].name) {
          activatedColumns.push(this._columns[i].name);
        }
      }
    }

    return activatedColumns;
  }

  _addColumn(column) {
    if (this._checkActivatedColumns().indexOf(column.name) === -1) {
      this._columns.push({
        name: column.name,
        width: column.width
      });

      this._refreshGridColumn();

      for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
        const col = document.createElement('DIV');
        col.classList.add(column.name.toLowerCase());

        if (column.name.toLowerCase() === 'duration') {
          col.innerHTML = Utils.secondsToTimecode(this._tracks[this._dom.container.childNodes[i].dataset.id].get(column.name.toLowerCase()));
        } else {
          col.innerHTML = this._tracks[this._dom.container.childNodes[i].dataset.id].get(column.name.toLowerCase());
        }

        this._dom.container.childNodes[i].appendChild(col);
      }
    }
  }

  _removeColumn(column) {
    for (let i = this._columns.length - 1; i >= 0; --i) {
      if (this._columns[i].name === column.name) {
        this._columns.splice(i, 1);
        break;
      }
    }

    this._refreshGridColumn();

    for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
      for (let j = 0; j < this._dom.container.childNodes[i].childNodes.length; ++j) {
        if (this._dom.container.childNodes[i].childNodes[j].classList.contains(column.name.toLowerCase())) {
          this._dom.container.childNodes[i].removeChild(this._dom.container.childNodes[i].childNodes[j]);
        }
      }
    }
  }

  _toggleColumn(column) {
    if (this._checkActivatedColumns().indexOf(column.name) === -1) {
      this._addColumn(column);
    } else {
      this._removeColumn(column);
    }
  }

  _stretchColumn(column) {
    mzk.view.startLoading()
      .then(() => {
        const index = column.dataset.id; // Column to stretch index
        let sum = 0; // Columns width in % sum

        for (let i = 0; i < this._columns.length; ++i) {
          sum += parseFloat(this._columns[i].width, 10);
        }

        this._columns[index].width = parseFloat(this._columns[index].width, 10); // Convert target value to float for computations

        if (sum < 100) { // Expand column
          this._columns[index].width += (100 - sum);
        } else if (sum > 100) { // Retract column
          if ((sum - 100) < this._columns[index].width) {
            this._columns[index].width -= (sum - 100);
          } else { // Too tight to retract column, raise a warning
            Errors.raise({
              code: 'CANT_STRETCH_COLUMN',
              frontend: true
            });
            mzk.view.stopLoading();
            return;
          }
        } else { // Layout is 100% stretched to its container, raise an info
          Errors.raise({
            code: 'ALREADY_STRETCH',
            frontend: true
          });
          mzk.view.stopLoading();
          return;
        }

        this._columns[index].width = this._columns[index].width.toString(); // Restore target value
        this._refreshGridColumn();
        mzk.view.stopLoading();
      });
  }

  _stretchAllColumns() {
    mzk.view.startLoading()
      .then(() => {
        const equalColumnWidthInPx = (this._dom.wrapper.clientWidth / this._columns.length);
        let alreadyStretched = true; // Assuming by default that that columns have equal width

        for (let i = 0; i < this._columns.length; ++i) { // Loop to find if columns aren't all equal
          const currentColumnWidthInPx = ((this._dom.wrapper.clientWidth * this._columns[i].width) / 100);
          if (currentColumnWidthInPx !== equalColumnWidthInPx) { // One column isn't equals to the others
            alreadyStretched = false; // Break equal width assumption
            break;
          }
        }

        if (alreadyStretched) { // Exit function if columns are already stretched
          Errors.raise({
            code: 'ALREADY_STRETCH',
            frontend: true
          });
          mzk.view.stopLoading();
          return;
        }

        let gridTemplateColumns = ''; // CSS grid rule (in pixels)
        for (let i = 0; i < this._columns.length; ++i) { // Init equaly CSS grid columns rule
          this._columns[i].width = (equalColumnWidthInPx * 100) / this._dom.wrapper.clientWidth; // Update column width in %
          gridTemplateColumns += `${equalColumnWidthInPx}px `; // Assign column width in px
        }

        this._refreshGridColumn(gridTemplateColumns); // Refresh ListView grid with custom gridTemplateColumns value
        mzk.view.stopLoading();
      });
  }

  addTracks(artists) {
    mzk.view.startLoading()
      .then(() => {
        const tracks = [];

        for (let i = 0; i < artists.length; ++i) {
          for (let j = 0; j < artists[i].albums.length; ++j) {
            for (let k = 0; k < artists[i].albums[j].tracks.length; ++k) {
              tracks.push(artists[i].albums[j].tracks[k]);
            }
          }
        }

        const fragment = document.createDocumentFragment();
        const gridTemplateColumns = this._computeGridTemplateColumns(); // CSS grid rule
        const firstCall = (this._tracks.length === 0);

        for (let i = 0; i < tracks.length; ++i) { // Init listview content depending on options object
          const listViewEntry = new ListViewEntry({
            track: tracks[i],
            datasetId: i,
            gridTemplateColumns: gridTemplateColumns
          });
          this._tracks.push(listViewEntry);

          for (let j = 0; j < this._columns.length; ++j) {
            const col = document.createElement('DIV');
            col.classList.add(this._columns[j].name.toLowerCase());
            col.dataset.id = j;

            if (this._columns[j].name.toLowerCase() === 'duration') {
              col.innerHTML = Utils.secondsToTimecode(listViewEntry.get(this._columns[j].name.toLowerCase()));
            } else {
              col.innerHTML = listViewEntry.get(this._columns[j].name.toLowerCase());
            }

            listViewEntry.addColumn(col);
          }

          fragment.appendChild(listViewEntry.getDom());
        }

        this._dom.container.appendChild(fragment);

        if (firstCall) {
          this._scrollBar = new ScrollBar({
            target: this._dom.container
          });
          this._dom.container = this._dom.container.firstChild.firstChild; // ScrollBar creates two wrappers
        }

        this.initTracksState();
        mzk.view.stopLoading();
      });
  }

  fillContext(context) {
    const activatedColumns = this._checkActivatedColumns();

    const checkBoxes = document.createElement('DIV');
    checkBoxes.classList.add('checkbox-container');

    for (let i = 0; i < this._availableColumns.length; ++i) {
      const text = document.createElement('LABEL');
      const input = document.createElement('INPUT');

      input.id = 'context-' + this._availableColumns[i].name;
      text.innerHTML = this._availableColumns[i].name;
      text.setAttribute('for', `context-${this._availableColumns[i].name}`);
      input.setAttribute('type', 'checkbox');

      if (activatedColumns.indexOf(this._availableColumns[i].name) !== -1) {
        input.checked = true;
      }

      input.addEventListener('click', (event) => {
        const name = event.target.id.match(/-(.*)/)[1];
        let width = '';

        mzk.view.startLoading()
          .then(() => {
            for (let j = 0; j < this._availableColumns.length; ++j) {
              if (this._availableColumns[j].name === name) {
                width = this._availableColumns[j].width;
                break;
              }
            }
            this._toggleColumn({
              name: name,
              width: width
            });
            mzk.view.stopLoading();
          });
      });

      checkBoxes.appendChild(input);
      checkBoxes.appendChild(text);
    }

    context.appendChild(checkBoxes);

    const stretchAll = document.createElement('BUTTON');
    stretchAll.innerHTML = 'Stretch All Columns';
    context.appendChild(stretchAll);

    stretchAll.addEventListener('click', (event) => {
      event.stopPropagation();
      this._stretchAllColumns();
    });
  }

  refreshView() {
    mzk.view.startLoading()
      .then(() => {
        setTimeout(() => {
          this._refreshGridColumn();
          mzk.view.stopLoading();
        }, 500);
      });
  }
}

export default ListView;
