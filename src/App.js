
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import RecordList  from './components/records/List';
import UserEditor  from './components/users/Editor';
import UserList    from './components/users/List';

function App() {
  return <>
    <Link to="/admin/records/">Records</Link>
    <Link to="/admin/users/">Users</Link>
    <Switch>
      <Route path="/admin/records/"  component={RecordList}/>
      <Route path="/admin/users/:id" component={UserEditor}/>
      <Route path="/admin/users/"    component={UserList}/>
    </Switch>
  </>;
}

export default App;
