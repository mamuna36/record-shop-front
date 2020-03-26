
import React from 'react';
import { Button } from 'react-bootstrap'

function Editor({ match}) {
  const id = match.params.id
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [user,setuser]         = React.useState(false);
  if ( ! abgerufen ){
    setAbgerufen(true)
    fetch(`/users/${id}`)
    .then( response => response.json() )
    .then( data => setuser(data));
    }
    if (!user) return null
    console.log(user)
    const change = e => setuser( { 
      ...user, 
      [e.target.name]: e.target.value
    })
    const submit = e =>{
      e.preventDefault()
      fetch(`/users/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify( user)})
        .then( response => response.json() )
        .then( data => setuser(data))    
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
              <input name ="lastName"  value={user.lastName} onChange={change}  className='list-group-item list-group-item-dark list-group-item-action' value={user.lastName}/> 
              <input name ="fullName"     value={user.fullName} onChange={change}     className='list-group-item list-group-item-dark list-group-item-action' value={user.fullName}/>
              <input name ="email"  value={user.email} onChange={change}  className='list-group-item list-group-item-dark list-group-item-action' value={user.email}/>   
          </ul>
              
          <Button className="btn btn-dark mr-2" onClick={submit}>SAVE  </Button>
          <Button className="btn btn-danger" onClick={remove}>REMOVE</Button>
           </div>
    
  )
}

export default Editor;
