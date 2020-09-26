import MainPageView from './mainpage/MainPageView.js';
import UserPageView from './community/UserPageView.js';


const Classes = {
  MainPageView,
  UserPageView
};


class ViewFactory {


  constructor(type, options = {}) {
    return new Classes[`${type}View`](options);
  }


}


export default ViewFactory;