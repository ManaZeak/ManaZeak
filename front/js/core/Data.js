class Data {


  constructor() {
    // Nothing to do here
  }


  getGenreInfo(name) {
    return new Promise((resolve, reject) => {
/*
      mzk.kom.get(`${name.json}`).then(data => {
        console.log(data);
      }).catch(reject);
*/
      resolve();
    });
  }


}


export default Data;
