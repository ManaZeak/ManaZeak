class Data {


  constructor() {
    // Nothing to do here
  }


  getGenreInfo(name) {
    return new Promise((resolve, reject) => {
      console.log(name);
      resolve();
    });
  }


}


export default Data;
