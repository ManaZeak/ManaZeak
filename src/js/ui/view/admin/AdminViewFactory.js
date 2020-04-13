import overviewView from './view/AdminOverviewView.js';
import databaseView from './view/AdminDatabaseView.js';
import userView from './view/AdminUserView.js';
import suggestionView from './view/AdminSuggestionView.js';


const Classes = {
  overviewView,
  databaseView,
  userView,
  suggestionView
};


class AdminViewFactory {


  constructor(type, parent, options = { type: type, parent: parent }) {
    return new Classes[`${type}View`](options);
  }


}


export default AdminViewFactory;