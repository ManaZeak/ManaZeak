/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  EditTag class                                  *
 *                                                 *
 *  Handle the edit tag modal                      *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class EditTagEntry {

    constructor(container, track) {
        if (window.debug) {
            console.log('    EditTagEntry construction');
        }

        this.entry                 = document.createElement("P");
        this.track                 = track;
        this.entry.innerHTML       = track.fileName;
        this.entry.dataset.childID = container.children.length;

        container.appendChild(this.entry);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : setIsSelected (public)
     * class  : EditTagEntry
     * desc   : Set the entry as selected/!selected
     * return : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        if (window.debug) {
            console.log('    EditTagEntry : setIsSelected call');
        }

        this.isSelected = isSelected;

        if (this.isSelected) {
            this.entry.classList.add("mzk-selected");
        }

        else {
            this.entry.classList.remove("mzk-selected");
        }
    }

}

export default EditTagEntry