
import React from 'react';

import { Link } from 'react-router-dom';
import CRUDList from '../CRUDList';

function List() {
  const fieldNames = [ 'firstName','lastName','fullName','email' ];
  const sortFields = [ 'firstName','lastName','email' ];
  const restPath = '/users/';
  const renderListItem = user => (
  <div className='user-custom m-3'>
    <ul className='list-group'>
      <span className='list-group-item list-group-item-dark list-group-item-action list-custom '>KILLER USER</span>
      { fieldNames.map( fieldName =>
        <li className='list-group-item list-group-item-dark list-group-item-action'>
          {user[fieldName]}
        </li>
      )}
    </ul>
    <Link to={`/admin/users/${user.id}`} className="btn btn-dark btn-block">
      EDIT
    </Link>
  </div> );
  return <CRUDList {
    ...{fieldNames, sortFields, restPath, renderListItem}
  }/>
}
export default List;
