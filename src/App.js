
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css'

import { Container, Row, Col } from 'react-bootstrap'

import RecordList from './components/records/List';
import RecordEditor from './components/records/Editor'
import RecordViewer from './components/records/Viewer'
import UserEditor from './components/users/Editor';
import UserList from './components/users/List';
import FrontpageRecordList from './components/records/FrontpageList';

function App() {
  return <Container fluid className='bg-container'>


    <Row className='row-custom'>
      <Col className='d-flex flex-row justify-content-center'>
        <Link className='link' to="/admin/records/" ><div className='link col-custom'>Records</div></Link>
        <Link className='link' to="/admin/users/" ><div className='link col-custom'>Users</div></Link>
      </Col>
    </Row>




    <Switch>
      <Route path="/admin/records/:id" component={RecordEditor} />
      <Route path="/admin/records/"    component={RecordList} />
      <Route path="/admin/users/:id"   component={UserEditor} />
      <Route path="/admin/users/"      component={UserList} />
      <Route path="/records/:id"       component={RecordViewer} />
      <Route path="/"                  component={FrontpageRecordList} />
    </Switch>

  </Container>;
}

export default App;
