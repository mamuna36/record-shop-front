import React from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap'
import gif from '../../images/gif.gif'
import { Link } from 'react-router-dom'

function Editor({ match }) {
  const id = match.params.id
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [record,setDaten]        = React.useState(false);

  if ( ! abgerufen ){
    setAbgerufen(true)
    fetch(`/records/${id}`)
    .then( response => response.json() )
    .then( data => setDaten(data));
    }
  if ( ! record ) return null;

  return (
    <Card style={{ width: '18rem' }} key={record._id} className="m-2 card-custom">
      <Card.Img variant="top" src={gif} />
      <Card.Body>
        <Card.Title>
          <div className='list-group-item list-group-item-dark' className='title'>
            {record.title}
          </div>
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <div className='list-group-item list-group-item-dark list-group-item-action'>{record.year}</div>
        <div className='list-group-item list-group-item-dark list-group-item-action'>{record.artist}</div>
        <div className='list-group-item list-group-item-dark list-group-item-action'>{record.price}€</div>
      </ListGroup>
      <Card.Body>
        <Link to="/">Home</Link>
      </Card.Body>
    </Card>
  )
}

export default Editor;
