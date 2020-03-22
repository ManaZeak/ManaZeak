import overviewView from './views/AdminOverviewView.js';
import databaseView from './views/AdminDatabaseView.js';
import userView from './views/AdminUserView.js';
import suggestionView from './views/AdminSuggestionView.js';


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