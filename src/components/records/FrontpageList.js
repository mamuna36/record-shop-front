
import React from 'react';
import { Link } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap'
import '../../App.css'
import gif from '../../images/gif.gif'

function FrontpageList() {
  const [abgerufen, setAbgerufen] = React.useState(false);
  const [daten, setDaten] = React.useState(false);
  if (!abgerufen)
    fetch('/records/')
      .then(response => response.json())
      .then(records => {
        setAbgerufen(true);
        setDaten(records);
      })

  return (
    <Row className='mt-3 p-2'>
      <Col className="d-flex flex-wrap justify-content-center">
        { daten ? (
          daten
          .slice(0,6)
          .map( record => (

            <Card style={{ width: '18rem' }} key={record._id} className="m-2 card-custom">
              <Card.Img variant="top" src={gif} />
              <Card.Body>
                <Card.Title ><h2 className='title'>{record.title}<br/>({record.artist})</h2></Card.Title>
              </Card.Body>
              <Card.Body>
                <Link className='d-flex align-items-center' to={`/records/${record._id}`}>
                  <Button className='btn btn-dark button-custom'>Buy {record.price}€</Button>
                </Link>
              </Card.Body>
            </Card>


      ))
        ) : null}
     </Col>
     </Row>
  )}

export default FrontpageList;
