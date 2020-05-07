
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css'

import { Container, Row, Col } from 'react-bootstrap'

import Login               from './components/users/Login';
import Register            from './components/users/Register';
import RecordList          from './components/records/List';
import RecordEditor        from './components/records/Editor'
import RecordViewer        from './components/records/Viewer'
import UserEditor          from './components/users/Editor';
import UserList            from './components/users/List';
import Activate            from './components/users/Activate';
import Reset               from './components/users/Reset';
import ResetPassword       from './components/users/ResetPassword';
import FrontpageRecordList from './components/records/FrontpageList';
import BasketStatus        from './components/basket/BasketStatus';
import Basket              from './components/basket/Basket';

import { IfAdmin, IfAuth, IfNotAuth, Logout, withAuth } from './auth'

function App({auth,authActions}) {
  const { firstName, lastName } = auth.user;
  return <Container fluid className='bg-container'>
    <div className="backdrop">&nbsp;</div>

    <Row className='row-custom'>
      <IfAdmin>
        <Col className='d-flex flex-row justify-content-center'>
          <Link className='link' to="/admin/records/" ><div className='link col-custom'>Records</div></Link>
          <Link className='link' to="/admin/users/" ><div className='link col-custom'>Users</div></Link>
        </Col>
      </IfAdmin>
    </Row>

    <div className="navbar">
      <IfNotAuth>
        <Link to="/login">Anmelden</Link>
        <Link to="/register">Registrieren</Link>
      </IfNotAuth>
      <IfAuth>
        <Link to="/profile">{firstName} {lastName}</Link>
        <Link to="/orders">Bestellungen</Link>
        <Link to="/logout">Abmelden</Link>
      </IfAuth>
      <BasketStatus/>
    </div>

    <Switch>
      {/* Auth Kram */}
      <Route path="/login"             component={Login} />
      <Route path="/logout"            component={Logout} />
      <Route path="/register"          component={Register} />
      <Route path="/reset/:token"      component={ResetPassword} />
      <Route path="/reset"             component={Reset} />
      <Route path="/activate/:token"   component={Activate} />
      {/* Admin Kram */}
      <Route path="/admin/records/:id" component={RecordEditor} />
      <Route path="/admin/records/"    component={RecordList} />
      <Route path="/admin/users/:id"   component={UserEditor} />
      <Route path="/admin/users/"      component={UserList} />
      {/* User Kram */}
      <Route path="/records/:id"       component={RecordViewer} />
      <Route path="/basket"            component={Basket} />
      <Route path="/"                  component={FrontpageRecordList} />
    </Switch>

  </Container>;
}

export default withAuth(App);
