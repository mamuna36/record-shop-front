import React from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap'
import gif from '../../images/gif.gif'
import { Link } from 'react-router-dom'
import AddToBasket from '../basket/AddToBasket';

function Editor({ match }) {
  const id = match.params.id
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [record,setDaten]        = React.useState(false);

  if ( ! abgerufen ){
    setAbgerufen(true)
    window.Axios.get(`/records/${id}`)
    .then( result => setDaten(result.data));
  }

  if ( ! record ) return null;

  return (
    <Card style={{ width: '18rem', left:'50%', transform:'translate(-50%)' }} key={record._id} className="m-2 card-custom">
      <Card.Img variant="top" src={record.img} />
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
      <Card.Body style={{ display:'flex', justifyContent:'center' }}>
        <AddToBasket product={record}/>
      </Card.Body>
    </Card>
  )
}

export default Editor;
