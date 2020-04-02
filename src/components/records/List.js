
import React from 'react';

import { Link } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

import CRUDList from '../CRUDList';

import gif from '../../images/gif.gif'

function List(){
  const fieldNames     = [ 'title', 'artist', 'year', 'price' ];
  const sortFields     = fieldNames;
  const restPath       = '/records/';
  const renderListItem = record => (
  <Card style={{ width: '18rem' }} key={record._id} className="m-2 card-custom">
    <Card.Img variant="top" src={gif} />
    <Card.Body>
      <Card.Title><h2 className='title'>{record.title}</h2></Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>{record.year}</ListGroupItem>
      <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>{record.artist}</ListGroupItem>
      <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>{record.price}</ListGroupItem>
    </ListGroup>
    <Card.Body>
      <Link className='d-flex align-items-center' to={`/admin/records/${record._id}`}>
        <Button className='btn btn-dark button-custom'>EDIT ME</Button>
      </Link>
    </Card.Body>
  </Card> );
  return <CRUDList {
    ...{fieldNames, sortFields, restPath, renderListItem}
  }/>
}

export default List;
