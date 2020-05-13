
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
import Thanks              from './components/basket/Thanks';
import Orders              from './components/orders/UserList';
import OrderViewer         from './components/orders/Viewer';
import OrderEditor         from './components/orders/Editor';
import OrderList           from './components/orders/List';

import { IfAdmin, IfAuth, IfNotAuth, Logout, AdminRoute, AuthRoute, withAuth } from './auth'

function App({auth,authActions}) {
  const { firstName, lastName } = auth.user;
  return <Container fluid className='bg-container'>
    <div className="backdrop">&nbsp;</div>

    <Row className='row-custom'>
      <Col className='d-flex flex-row justify-content-center'>
        <Link className='link' to="/" ><div className='link col-custom'>Home</div></Link>
        <IfAdmin>
          <Link className='link' to="/admin/records/" ><div className='link col-custom'>Records</div></Link>
          <Link className='link' to="/admin/users/" ><div className='link col-custom'>Users</div></Link>
          <Link className='link' to="/admin/orders/" ><div className='link col-custom'>Orders</div></Link>
        </IfAdmin>
        <IfNotAuth>
          <Link className='link' to="/login"><div className='link col-custom'>Anmelden</div></Link>
          <Link className='link' to="/register"><div className='link col-custom'>Registrieren</div></Link>
        </IfNotAuth>
        <IfAuth>
          <Link className='link' to="/profile"><div className='link col-custom'>{firstName} {lastName}</div></Link>
          <Link className='link' to="/orders"><div className='link col-custom'>Bestellungen</div></Link>
          <Link className='link' to="/logout"><div className='link col-custom'>Abmelden</div></Link>
        </IfAuth>
      </Col>
    </Row>

    <BasketStatus/>

    <Switch>
      {/* Auth Kram */}
      <Route path="/login"                  component={Login} />
      <Route path="/logout"                 component={Logout} />
      <Route path="/register"               component={Register} />
      <Route path="/reset/:token"           component={ResetPassword} />
      <Route path="/reset"                  component={Reset} />
      <Route path="/activate/:token"        component={Activate} />
      {/* Admin Kram */}
      <AdminRoute path="/admin/orders/:id"  component={OrderEditor} />
      <AdminRoute path="/admin/orders/"     component={OrderList} />
      <AdminRoute path="/admin/records/:id" component={RecordEditor} />
      <AdminRoute path="/admin/records/"    component={RecordList} />
      <AdminRoute path="/admin/users/:id"   component={UserEditor} />
      <AdminRoute path="/admin/users/"      component={UserList} />
      {/* User Kram */}
      <AuthRoute path="/orders/:id"         component={OrderViewer} />
      <AuthRoute path="/orders"             component={Orders} />
      <AuthRoute path="/records/:id"        component={RecordViewer} />
      <AuthRoute path="/basket"             component={Basket} />
      <AuthRoute path="/thanks"             component={Thanks} />
      <Route path="/"                       component={FrontpageRecordList} />
    </Switch>

  </Container>;
}

export default withAuth(App);
