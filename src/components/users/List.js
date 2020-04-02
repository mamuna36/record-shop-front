
import React from 'react';
import '../../App.css'
import { Link } from 'react-router-dom';
import {
  Col, Row, Button, ButtonGroup, ButtonToolbar,
  InputGroup, FormControl,
} from 'react-bootstrap'

const fieldNames = [ 'firstName','lastName','fullName','email' ];
const sortFields = [ 'firstName','lastName','email' ];

function List() {
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [daten,setDaten]         = React.useState(false);

  const [meta,setMeta] = React.useState({
    sortField:   'id',
    sortOrder:      1,
    pageNumber:     0,
    recordsPerPage: 4,
    search:         ''
  });

  if ( ! abgerufen )
    fetch(
      `/users/?pageNumber=${meta.pageNumber}&`+
      `recordsPerPage=${meta.recordsPerPage}&`+
      `sortField=${meta.sortField}&`+
      `sortOrder=${meta.sortOrder}&`+
      `search=${meta.search}`)
    .then( response => response.json() )
    .then( ({ list, count }) => {
      setAbgerufen(true);
      setDaten(list);
      setMeta({ ...meta, numberOfRecords: count });
    })

  // rechne Anzahl der Seiten aus
  const numberOfPages =
    meta.recordsPerPage === -1 ? 1 : // sollen alle seitan angezeigt werden, gibt es nur eine Seite
    Math.floor( meta.numberOfRecords / meta.recordsPerPage ); // Sonst rechnen :D

  function changePage(whichPage=0){
    return (e) => {
      const nextPage =
        Math.min(
          numberOfPages - 1,
          Math.max(
            0,
            whichPage
          )
        );
      setMeta({ ...meta, pageNumber: nextPage });
      setAbgerufen(false);
    }
  }

  function changeNumberOfRecords(howMany){
    return (e) => {
      setMeta({ ...meta,
        recordsPerPage: howMany,
        pageNumber: 0
      });
      setAbgerufen(false);
    }
  }

  function quickSearch(e){
    setMeta({ ...meta,
      search: e.target.value
    });
    setAbgerufen(false);
  }

  function changeSortField(whichField){
    return (e)=> {
      if ( meta.sortField !== whichField ){
        setMeta({ ...meta,
          sortField: whichField,
          sortOrder: 1
        });
      } else {
        setMeta({ ...meta,
          sortOrder: meta.sortOrder * -1
        });
      }
      setAbgerufen(false);
    }
  }

  const liClass = 'list-group-item list-group-item-dark list-group-item-action'

  if ( ! daten ) return null;

  return (
    <>
    <Row className='m-2' >
      <Col xs={12} className="d-flex justify-content-center ">
        <ButtonToolbar>
          <ButtonGroup style={{marginRight:'1ch'}}>
            <Button onClick={changePage(0)}>&lt;&lt;</Button>
            <Button onClick={changePage(meta.pageNumber - 1)}>&lt;</Button>
            <Button className="btn">
              <b>
                {meta.pageNumber + 1} of {numberOfPages}
              </b>
            </Button>
            <Button onClick={changePage(meta.pageNumber + 1)}>&gt;</Button>
            <Button onClick={changePage(numberOfPages)}>&gt;&gt;</Button>
          </ButtonGroup>
          <ButtonGroup>
            { [4,8,25,50,100].map( howMany =>
              <Button onClick={changeNumberOfRecords(howMany)}>{howMany}</Button>
            )}
            <Button onClick={changeNumberOfRecords(-1)}>∞</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
    </Row>
    <Row className='m-2' >
      <Col xs={12} className="d-flex justify-content-center ">
        <ButtonGroup>
          { sortFields.map( fieldName =>
            <Button onClick={changeSortField(fieldName)}>{fieldName}</Button>
          )}
        </ButtonGroup>
      </Col>
    </Row>
    <Row className='m-2' >
      <Col xs={12} className="d-flex justify-content-center ">
        <InputGroup>
          <FormControl name="search" value={meta.search} onChange={quickSearch}/>
        </InputGroup>
      </Col>
    </Row>
    <Row className='m-2' >
      <Col xs={12} className="d-flex flex-wrap justify-content-center ">
      { daten
        .map( user => (
          <div className='user-custom m-3'>
            <ul className='list-group'>
              <span className='list-group-item list-group-item-dark list-group-item-action list-custom '>KILLER USER</span>
              { fieldNames.map( fieldName =>
                <li className={liClass}>{user[fieldName]}</li>
              )}
            </ul>
            <Link to={`/admin/users/${user.id}`} className="btn btn-dark btn-block">
                EDIT
            </Link>
          </div>
        ))
      }
      </Col>
    </Row>
</>
)}
export default List;
