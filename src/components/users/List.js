
import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <table>
    { daten ? (
      daten.map( user => (
        <tr>
        <td><Link to={`/admin/users/${user.id}`}>{user.id}</Link></td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.fullName}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        </tr>
      ))
  ) : null }
  </table> )
}

export default List;
