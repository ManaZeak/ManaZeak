/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  NewContextMenu class - handle the context menu on right click                      *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var NewContextMenu = function()
{
    this.contextMenu = null;
    this.element = null;
    this.isVisible = false;

    this._init();
};


NewContextMenu.prototype = {

    _init: function()
    {
        this.contextMenu = new ContextMenuEntry("master", "", null);
        this.contextMenu.activate_event_listener();
        this.contextMenu.add_child(new ContextMenuEntry("1", "TEST_1", null));
        this.contextMenu.add_child(new ContextMenuEntry("2", "TEST_2", null));
        this.contextMenu.add_child(new ContextMenuEntry("3", "TEST_3", function(a) {console.log(a);}, 'NON'), "1", true);
        this.contextMenu.children[0].add_child(new ContextMenuEntry("4", "TEST_0", function() {console.log('OUI')}));
        this.contextMenu.children[1].add_child(new ContextMenuEntry(null, "TEST_HR", null));
        this.contextMenu.children[2].set_visible_areas(["footBar"]);

        this.element = document.createElement('DIV');
        this.element.id = "mzk-ctx-wrap";
        this.element.appendChild(this.contextMenu.element);
        document.body.insertBefore(this.element, document.body.firstChild);

        this._eventListener();
        this._keyListener();
    },

    _eventListener: function()
    {
        var self = this;
        document.body.addEventListener("contextmenu", function(event)
        {
            if(event.pageY <= document.documentElement.clientHeight / 2)
            {
                self.element.style.bottom = "unset";
                self.element.style.top = event.pageY + "px";
            }
            else
            {
                self.element.style.top = "unset";
                self.element.style.bottom = (document.documentElement.clientHeight - event.pageY) + "px";
            }

            if(event.pageX <= document.documentElement.clientWidth / 2)
            {
                self.element.style.right = "unset";
                self.element.style.left = event.pageX + "px";
            }
            else
            {
                self.element.style.left = "unset";
                self.element.style.right = (document.documentElement.clientWidth - event.pageX) + "px";
            }

            self.contextMenu.close_all();
            self.element.className = "";

            var target = event.target;
            while(target)
            {
                if(target.id)
                    self.element.classList.add("mzk-ctx-include-" + target.id);
                target = target.parentNode;
            }

            self.element.classList.add("mzk-ctx-open");
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        });
    },


    _keyListener: function()
    {
        var that = this;

        // Key pressed event
        document.addEventListener("keydown", function(event)
        {
            switch (event.keyCode)
            {
                case 27: // Esc
                    if (that.isVisible) { that.toggleVisibilityLock(); }
                    break;
                default:
                    break;
            }
        });
    }
};
