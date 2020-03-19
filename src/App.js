
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import RecordList  from './components/records/List';
import UserEditor drom './component/Editor'
import UserList    from './components/users/List';

function App() {
  return
  <>
  <Link to="admin/records/">Records</Link>
  <Switch>
    <Route path="/admin/records/" component={RecordList}/>
    <Route path="/admin/users/:id" component={UserList}/>
    <Route path="/admin/users/"   component={UserList}/>
  <Switch/>
  </>
}

export default App;
