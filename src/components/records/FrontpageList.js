
import React from 'react';
import { Link } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap'
import '../../App.css'
import gif from '../../images/gif.gif'

function FrontpageList() {
  const [abgerufen, setAbgerufen] = React.useState(false);
  const [daten, setDaten] = React.useState(false);
  if ( ! abgerufen )
    window.Axios.get(
    `/records/?pageNumber=0&`+
    `recordsPerPage=6&`+
    `sortField=title&`+
    `sortOrder=1&`+
    `searchField=title&`+
    `search=`)
    .then( result => {
      setAbgerufen(true);
      setDaten(result.data);
    })

  if ( ! daten ) return null;

  return (
  <Row className='mt-3 p-2'>
    <Col className="d-flex flex-wrap justify-content-center">
      { daten.map( record => (
      <Card style={{ width: '18rem' }} key={record._id} className="m-2 card-custom">
        <Card.Img variant="top" src={record.img} />
        <Card.Body>
          <Card.Title ><h2 className='title'>{record.title}<br/>({record.artist})</h2></Card.Title>
        </Card.Body>
        <Card.Body>
          <Link className='d-flex align-items-center' to={`/records/${record._id}`}>
            <Button className='btn btn-dark button-custom'>Buy {record.price}€</Button>
          </Link>
        </Card.Body>
      </Card>
    ))}
   </Col>
  </Row> );
}

export default FrontpageList;
