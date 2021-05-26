
import React from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap'
import gif from '../../images/gif.gif'

import { withAuth } from '../../auth';

function Editor({match,auth:{token}}) {
  const id = match.params.id
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [record,setDaten]        = React.useState(false);

  if ( ! abgerufen ){
    setAbgerufen(true)
    window.Axios.get(`/records/${id}`)
    .then( result => setDaten(result.data) );
  }

  if (!record) return null

  const change = e => {
    setDaten( {
      ...record, // copy of original data
      [e.target.name]: e.target.name == "img" ? e.target.files[0] : e.target.value // replace one property value
    })
  }

  const submit = e =>{
    e.preventDefault()
    const formData = new FormData()
    for(let key in record) {
      if(key == "img") {
        if(typeof record[key] == "object") formData.append(key, record[key], record[key].name)
      } else {
        formData.append(key, record[key])
      }
    }
    window.Axios.put(`/records/${id}`, formData )
    .then( result => setDaten(result.data) )
  }

  const remove = e =>{
    e.preventDefault();
    if(!window.confirm('Wirklich?!?!?') ) return
    window.Axios.delete(`/records/${id}`)
    .then( data => console.log("und hop"))
  }

  return (

    <Card style={{ width: '18rem' }} key={record._id} className="m-2 card-custom">
              <Card.Img variant="top" src={"http://localhost:3000/" + record.img} />
              <Card.Body>
                <Card.Title ><input className='list-group-item list-group-item-dark' name ="title" value={record.title} onChange={change} className='title' value={record.title}/></Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <input name ="year" value={record.year} onChange={change} className=' list-group-item-action' value={record.year}/>
                <input name ="artist" value={record.artist} onChange={change} className='list-group-item list-group-item-dark list-group-item-action' value={record.artist}/>
                <input name ="price" value={record.price} onChange={change} className='list-group-item list-group-item-dark list-group-item-action' value={record.price}/>
                <input name = "img" type="file" onChange={change} className='list-group-item list-group-item-dark list-group-item-action'/>
              </ListGroup>
              <Card.Body>
               <Button className="btn btn-dark mr-3" onClick={submit}>SAVE  </Button>
               <Button className="btn btn-danger" onClick={remove}>REMOVE</Button>
              </Card.Body>
            </Card>

  )
}

export default withAuth( Editor );
