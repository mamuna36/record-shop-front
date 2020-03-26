
import React from 'react';
import '../../App.css'
import { Link } from 'react-router-dom';
import { Col, Row} from 'react-bootstrap'

function List() {
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [daten,setDaten]         = React.useState(false);
  if ( ! abgerufen )
    fetch('/users/')
    .then( response => response.json() )
    .then( users => {
      setAbgerufen(true);
      setDaten(users);
    })

    const liClass = 'list-group-item list-group-item-dark list-group-item-action'
  return (
    <>
    <Row className='m-2' >
      <Col xs={12} className="d-flex flex-wrap justify-content-center ">
    
      {daten ? (
        daten.map(user => (
          
            <div className='user-custom m-3'>
              <ul className='list-group'>
              <span className='list-group-item list-group-item-dark list-group-item-action list-custom '>KILLER USER</span>
              <li className={liClass}>{user.firstName}</li>
              <li className={liClass}>{user.lastName} </li>
              <li className={liClass}>{user.fullName} </li>
              <li className={liClass}>{user.email}    </li>
          </ul>
         
              <Link to={`/admin/users/${user.id}`} className="btn btn-dark btn-block">
                  EDIT
              </Link>
           </div>
      
        ))
      ): null}
       
    </Col>
 </Row>
</>
)}
export default List;
