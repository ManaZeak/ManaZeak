/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  NewContextMenu class - handle the context menu on right click                      *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ContextMenuEntry = function (displayString, callback/*, MORE ARGUMENTS HERE*/)
{

    // /!\ IMPORTANT - CHANGE THIS IF YOU ADD/REMOVE ARGUMENTS FROM THIS CONSTRUCTOR /!\
    var NB_OF_NAMED_ARGS = 2;

    this.displayString = displayString;
    this.callback = callback;
    this.callback_args = arguments.length > NB_OF_NAMED_ARGS ? new Array(arguments.length - NB_OF_NAMED_ARGS) : [];
    for (var i = NB_OF_NAMED_ARGS; i < arguments.length; i++)
        this.callback_args[i - NB_OF_NAMED_ARGS] = arguments[i];

    this.multi_open_submenu = false;
    this.element = null;
    this.children = [];
    this.parent = null;

    this._init();
};


ContextMenuEntry.prototype = {

    _init: function ()
    {
        this.element = document.createElement("UL");
    },

    set_multi_open_submenu: function(allow)
    {
        this.multi_open_submenu = allow;
        return this;
    },

    add_child: function (other_entry)
    {
        var hr = document.createElement("HR");
        var li = document.createElement("LI");
        li.dataset.parentIx = this.children.length;
        li.textContent = other_entry.displayString;
        li.appendChild(other_entry.element);

        this.element.appendChild(li);
        this.element.appendChild(hr);
        this.children.push(other_entry);
        other_entry.parent = this;

        if(this.element.parentNode)
            this.element.parentNode.classList.add("mzk-submenu");
    },

    activate_event_listener: function ()
    {
        var self = this;
        this.element.addEventListener("click", function (event)
        {
            if(event.target.tagName !== 'LI')
                return true;

            var target = event.target;
            var ixArray = new Array(10);
            var i = 0;

            while(target.parentNode !== self.element)
            {
                ixArray[i++] = target.dataset.parentIx;
                do
                    target = target.parentNode;
                while(target.tagName !== 'LI');
            }
            ixArray[i] = target.dataset.parentIx;

            var clicked = self;
            for(i; i >= 0; --i)
                clicked = clicked.children[ixArray[i]];

            //If the entry is a leaf then run its action
            if(clicked.children.length == 0)
                clicked.run_callback();
            //Else expand it
            else
            {
                if(clicked.parent.multi_open_submenu)
                    clicked.parent.close_all();
                clicked.element.classList.toggle("mzk-open");
            }

            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
        }, true);
    },

    close_all: function()
    {
        this.children.forEach(function(child)
        {
           child.close_all();
           child.element.classList.remove("mzk-open");
        });
    },

    run_callback: function ()
    {
        if (this.callback)
            this.callback.apply(null, this.callback_args);
    }
};
