/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                       *
 *  DragDrop class                                       *
 *                                                       *
 *  Handle the drag and drop of music files              *
 *                                                       *
 *  element : {object} TODO   *
 *                                                       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedPostRequest } from '../utils/Utils.js'

class DragDrop {

    constructor(element) {
      this.element = element;
      this.element.classList.add('mzk-dragdrop');
      //this.wrapper = document.createElement('DIV');
      //this.wrapper.className = 'mzk-dragdrop';

      //if(this.element.parentNode)
      //    this.element.parentNode.replaceChild(this.wrapper, this.element);

      //this.wrapper.appendChild(this.element);
      this._eventListener();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : DragDrop
     * desc   : DragDrop event listeners
     **/
    _eventListener() {
        let that = this;
        this.element.addEventListener('dragenter', function() {
           that.element.classList.add('mzk-dragdrop-show');
        });
        this.element.addEventListener('dragleave', function(event) {
            if (event.target == that.element) {
               that.element.classList.remove('mzk-dragdrop-show');
            }
        });
        this.element.addEventListener('drop', function(event) {
            let files = event.dataTransfer.files;
            that.element.classList.remove('mzk-dragdrop-show');

            let f;
            for (let i = 0; i < files.length; i++) {
                f = files[i];
                if (f.type == 'audio/flac' || f.type == 'audio/ogg' || (f.type == 'audio/mpeg' || f.type == 'audio/mp3')) {
                    let reader = new FileReader();
                    // This fires after the blob has been read/loaded.
                    reader.addEventListener('loadend', function(event) {
                        JSONParsedPostRequest(
                            "file/upload/",
                            JSON.stringify({
                                FILENAME: f.name,
                                CONTENT:  event.target.result
                            }),
                            function(response) {
                                if (!response.DONE) {
                                    new Notification('INFO', 'Upload successful', 'Your file ' + f.name + ' has been uploaded.');
                                }
                            }
                        );
                    });
                    // Start reading the blob as text.
                    reader.readAsDataURL(f);
                } else {
                    new Notification('ERROR', 'Unsupported file format', 'The MIME format ' + f.type + ' for the file ' + f.name + ' is not supported.<br/><br/>Supported MIME formats are audio/flac, audio/ogg and audio/mpeg');
                }
            }
        });
    }

}

export default DragDrop