
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
    fetch(`/orders/${id}`,{headers:{"x-auth":token}})
    .then( response => response.json() )
    .then( data => setDaten(data));
  }

  if (!order) return null
  console.log(order)
  const change = e => setDaten( {
    ...order,
    [e.target.name]: e.target.value
  })

  const submit = e =>{
    e.preventDefault()
    fetch(`/orders/toggle/${id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json","x-auth":token},
      body:JSON.stringify( order)})
      .then( response => {
        if ( response.status !== 200 ){
          history.push('/login');
          return false
        }
        return response.json()
      })
      .then( data => {
        setDaten(data)
      })
  }

  const remove = e =>{
    e.preventDefault();
    if(!window.confirm('Wirklich?!?!?') ) return
    fetch(`/orders/${id}`,{method:"DELETE" })
      .then( response => response.json() )
      .then( data => console.log("und hop"))
  }

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
      { order.record.map( (record,index)=>
        <ListGroupItem className='list-group-item list-group-item-dark list-group-item-action'>
          {record.title} {order.quantity[index]}x
        </ListGroupItem>
      )}
    </ListGroup>
    <Card.Body>
      <Button onClick={submit} className='btn btn-dark button-custom'>{ order.isOpen ? "Close Order" : "Reopen" }</Button>
    </Card.Body>
  </Card>
  )
}

export default withAuth( Editor );