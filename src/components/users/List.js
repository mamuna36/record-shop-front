
import React from 'react';
import '../../App.css'
import { Link } from 'react-router-dom';
import {
  Col, Row, Button, ButtonGroup, ButtonToolbar,
  InputGroup, FormControl,
} from 'react-bootstrap'

function List() {
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [daten,setDaten]         = React.useState(false);

  const [meta,setMeta] = React.useState({
    pageNumber:     0,
    recordsPerPage: 4,
    search:         ''
  });

  if ( ! abgerufen )
    fetch(`/users/?pageNumber=${meta.pageNumber}&recordsPerPage=${meta.recordsPerPage}`)
    .then( response => response.json() )
    .then( ({ list, count }) => {
      setAbgerufen(true);
      setDaten(list);
      setMeta({ ...meta, numberOfRecords: count });
    })

  const liClass = 'list-group-item list-group-item-dark list-group-item-action'

  const numberOfPages = Math.floor(
    meta.numberOfRecords / meta.recordsPerPage
  );

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
  }

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
            <Button onClick={changeNumberOfRecords(4)}>4</Button>
            <Button onClick={changeNumberOfRecords(8)}>8</Button>
            <Button onClick={changeNumberOfRecords(25)}>25</Button>
            <Button onClick={changeNumberOfRecords(100)}>100</Button>
            <Button onClick={changeNumberOfRecords(-1)}>ALL</Button>
          </ButtonGroup>
        </ButtonToolbar>

        <InputGroup>
          <FormControl name="search" value={meta.search} onChange={quickSearch}/>
        </InputGroup>
      </Col>
    </Row>
    <Row className='m-2' >
      <Col xs={12} className="d-flex flex-wrap justify-content-center ">
      { daten ? (
        daten
        .filter ( user => {
          if ( meta.search ){
            return user.fullName.match(meta.search)
          } else return true;
        })
        .map( user => (
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
