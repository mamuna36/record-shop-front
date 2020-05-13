
import React from 'react';

import { Link } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

import CRUDList from '../CRUDList';

import gif from '../../images/gif.gif'

function List(){
  const fieldNames     = [ 'user', 'date' ];
  const sortFields     = fieldNames;
  const restPath       = '/orders/';
  const renderListItem = order => (
  <Card style={{ width: '18rem' }} key={order._id} className="m-2 card-custom">
    <Card.Img variant="top" src={gif} />
    <Card.Body>
      <Card.Title><h2 className='title'>{order.totalRecords}</h2></Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>{order.user.email}</ListGroupItem>
      <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>{order.date}</ListGroupItem>
      { order.record.map( (record,index)=>
        <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>
          {record.title}
        </ListGroupItem>
      )}
    </ListGroup>
    <Card.Body>
      <Link className='d-flex align-items-center' to={`/admin/orders/${order._id}`}>
        <Button className='btn btn-dark button-custom'>View Order</Button>
      </Link>
    </Card.Body>
  </Card> );
  return <CRUDList {
    ...{fieldNames, sortFields, restPath, renderListItem}
  }/>
}

export default List;
