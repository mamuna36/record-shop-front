
import React from 'react';
import { Route } from 'react-router-dom';

import RecordList  from './components/records/List';
import UserList    from './components/users/List';

function App() {
  return <>
    <Route path="/admin/records/" component={RecordList}/>
    <Route path="/admin/users/"   component={UserList}/>
  </>;
}

export default App;
