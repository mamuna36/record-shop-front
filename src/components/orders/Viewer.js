
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap'
import gif from '../../images/gif.gif'
import { withAuth } from '../../auth';

function Editor({ match, auth:{token}}) {
  const id = match.params.id;
  const history = useHistory();
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [order,setDaten]         = React.useState(false);

  if ( ! abgerufen ){
    setAbgerufen(true)
    window.Axios.get(`/orders/${id}`)
    .then( result => setDaten(result.data) );
  }

  if ( ! order ) return null

  const change = e => setDaten( {
    ...order,
    [e.target.name]: e.target.value
  })

  if ( order && order.error ) return <h1>ouch</h1>;

  return (
  <Card style={{ width: '18rem' }} key={order._id} className="m-2 card-custom">
    <Card.Img variant="top" src={gif} />
    <Card.Body>
      <Card.Title><h2 className='title'>{order.totalRecords}</h2></Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>{order.user.email}</ListGroupItem>
      <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>{order.date}</ListGroupItem>
      { order.records.map( (record,index)=>
        <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>
          {record.title} {order.quantity[index]}x
        </ListGroupItem>
      )}
    </ListGroup>
    <Card.Body>
      <Button onClick={e=>history.goBack()} className='btn btn-dark button-custom'>Close</Button>
    </Card.Body>
  </Card>
  )
}

export default withAuth( Editor );
