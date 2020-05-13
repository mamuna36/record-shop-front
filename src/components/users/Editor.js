
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { withAuth } from '../../auth';

function Editor({match,auth:{token}}) {
  const id = match.params.id
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [user,setUser]           = React.useState(false);
  if ( ! abgerufen ){
    setAbgerufen(true)
    fetch(`/users/${id}`,{headers:{'x-auth':token}})
    .then( response => response.json() )
    .then( data => setUser(data));
    }
    if (!user) return null
    console.log(user)
    const change = e => setUser( {
      ...user,
      [e.target.name]: e.target.value
    })
    const submit = e =>{
      e.preventDefault()
      fetch(`/users/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json",'x-auth':token},
        body:JSON.stringify( user)})
        .then( response => response.json() )
        .then( data => setUser(data))
    }

    const remove = e =>{
      e.preventDefault();
      if(!window.confirm('Wirklich?!?!?') ) return
      fetch(`/users/${id}`,{method:"DELETE" })
        .then( response => response.json() )
        .then( data => console.log("und hop"))
    }

  return (

    <div className='user-custom m-3'>
      <ul className='list-group'>
        <span className='list-group-item list-group-item-dark list-group-item-action list-custom '>KILLER USER</span>
        <input name ="firstName" value={user.firstName} onChange={change} className='list-group-item list-group-item-dark list-group-item-action' value={user.firstName}/>
        <input name ="lastName"  value={user.lastName}  onChange={change} className='list-group-item list-group-item-dark list-group-item-action' value={user.lastName}/>
        <input name ="fullName"  value={user.fullName}  onChange={change} className='list-group-item list-group-item-dark list-group-item-action' value={user.fullName}/>
        <input name ="email"     value={user.email}     onChange={change} className='list-group-item list-group-item-dark list-group-item-action' value={user.email}/>
        <Form.Check
          className="list-group-item list-group-item-dark list-group-item-action"
          type="checkbox"
          label="Admin"
          onChange={ e=> setUser( { ...user, role: e.target.checked ? 'Admin' : 'User' })}
          checked={user.role === 'Admin'}
        />
      </ul>
      <Button className="btn btn-dark mr-2" onClick={submit}>SAVE  </Button>
      <Button className="btn btn-danger" onClick={remove}>REMOVE</Button>
   </div>
  )
}

export default withAuth( Editor );
