const ItemViewHelperMixin = (SuperClass) => class extends SuperClass {
  _artistClicked(e) {
    e.stopPropagation();
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });    
  }


  _albumClicked(e) {
    e.stopPropagation();
    mzk.setView({
      name: 'Album',
      id: this.dataset.id
    });
  }


  _labelClicked(e) {
    e.stopPropagation();
    mzk.setView({
      name: 'Label',
      id: this.dataset.id
    });
  }


  _genreClicked(e) {
    e.stopPropagation();
    mzk.setView({
      name: 'Genre',
      id: this.dataset.id
    });
  }


};


export default ItemViewHelperMixin;
