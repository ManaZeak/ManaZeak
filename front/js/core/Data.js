class Data {


  constructor() {

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
