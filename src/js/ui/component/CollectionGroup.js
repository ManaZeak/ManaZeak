import CollectionEntry from "./entry/CollectionEntry";
import DiscoverEntry from "./entry/DiscoverEntry";
'use strict';


class CollectionGroup {


  constructor(options) {
    this._label = options.label;
    this._items = options.items;

    this._dom = {
      container: null,
      title: null,
      group: null,
      toggle: null,
      toggleImage: null,
      elements: null
    };

    this._entries = [];
    this._visible = true;

    this._init();
    this._events();
  }


  _init() {
    this._dom.container = document.createElement('DIV');
    this._dom.container.classList.add('aside-item-group');
    this._dom.title = document.createElement('H3');

    this._dom.group = document.createElement('SPAN');
    this._dom.group.classList.add('group-image');
    this._dom.groupImage = document.createElement('IMG');
    this._dom.group.appendChild(this._dom.groupImage);

    this._dom.toggle = document.createElement('SPAN');
    this._dom.toggle.classList.add('group-collapser');
    this._dom.toggleImage = document.createElement('IMG');
    this._dom.toggleImage.src = 'static/img/navigation/collapse.svg';
    this._dom.toggle.appendChild(this._dom.toggleImage);

    this._dom.title.innerHTML = mzk.lang.mainpage.collection[this._label];

    this._dom.title.appendChild(this._dom.group);
    this._dom.title.appendChild(this._dom.toggle);

    this._dom.elements = document.createElement('UL');

    if (this._label === 'PlaybackModes') {
      this._dom.container.classList.add('playback-modes');
      this._dom.groupImage.src = 'static/img/object/modes.svg';
      const partyView = new DiscoverEntry({
        type: 'PartyView'
      });
      this._dom.elements.appendChild(partyView.dom);
    } else {
      this._dom.groupImage.src = 'static/img/object/collection.svg';
      for (let i = 0; i < this._items.length; ++i) {
        this._items[i].DESC = `${this._items[i].TOTAL_TRACK} ${mzk.lang.playlist.tracks}`;
        const element = new CollectionEntry({
          entry: this._items[i],
          callback: (id) => {
            mzk.ui.setSceneView({ playlist: mzk.model.collection.getPlaylistFromId(parseInt(id)) })
          }
        });

        this._entries.push(element);
        this._dom.elements.appendChild(element.dom);
      }

      const newPl = new CollectionEntry({
        entry: {
          IMG: '/static/img/actions/new.svg',
          NAME: 'New playlist',
          DESC: 'Public or private, yours!'
        },
        callback: () => {
          console.log('Playlist coming next release');
        }
      });

      newPl.dom.classList.add('new-playlist');
      this._entries.push(newPl);
      this._dom.elements.appendChild(newPl.dom);
    }

    this._dom.container.appendChild(this._dom.title);
    this._dom.container.appendChild(this._dom.elements);
  }


  _events() {
    this._dom.toggle.addEventListener('click', () => {
      if (this._visible === false) {
        this._visible = true;
        this._dom.elements.style.height = 'inherit';
        this._dom.toggleImage.src = 'static/img/navigation/collapse.svg';
      } else {
        this._visible = false;
        this._dom.elements.style.height = '0';
        this._dom.toggleImage.src = 'static/img/navigation/expand.svg';
      }
    }, false);
  }


  get dom() {
    return this._dom.container;
  }


  get elements() {
    return this._dom.elements;
  }

}


export default CollectionGroup;
