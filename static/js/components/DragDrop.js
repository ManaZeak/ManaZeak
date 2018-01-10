/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                       *
 *  DragDrop class                                                       *
 *                                                                       *
 *  Handle the drag and drop of music files                              *
 *                                                                       *
 *  parentElement : {object} the container hoisting the menu             *
 *  openCallback  : {function} A function to run when the menu is opened *
 *  event         : {string} The trigger event                           *
 *                                                                       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

class DragDrop {
    constructor(element) {
      this.element = element;

      this._eventListener();
    }

    _eventListener() {
        this.element.addEventListener('drop', function(event) {
            let files = event.dataTransfer.files;

            let f;
            for(let i = 0; i < files.length; i++) {
                f = files[i];
                if(f.type == 'audio/flac' || f.type == 'audio/ogg' || (f.type == 'audio/mpeg' || f.type == 'audio/mp3')) {
                    JSONParsedPostRequest('ajax/fileUpload', files[i], function() {
                        new Notification('INFO', 'Upload successful', 'Your file ' + f.name + ' has been uploaded.');
                    }, true);
                } else {
                    new Notification('ERROR', 'Unsupported file format', 'The MIME format ' + f.type + ' for the file ' + f.name + ' is not supported.<br/><br/>Supported MIME formats are audio/flac, audio/ogg and audio/mpeg');
                }
            }
        });
    }
}
