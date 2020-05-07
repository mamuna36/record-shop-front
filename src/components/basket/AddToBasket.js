
import React          from 'react'
import { withBasket } from '../../basket'
import {
  Button,
  InputGroup
} from 'react-bootstrap'

export default withBasket( function({basketActions,product}){
  const [count,setCount] = React.useState(1);
  return (
    <InputGroup>
      <Button onClick={e => basketActions.add(product,count)}>Add to Basket</Button>
      <InputGroup.Append>
        <Button variant="warning" onClick={e => setCount(Math.min(10,count+1)) }>+</Button>
        <InputGroup.Text>{count}</InputGroup.Text>
        <Button variant="warning" onClick={e => setCount(Math.max(1,count-1)) }>-</Button>
      </InputGroup.Append>
    </InputGroup>
  );
})
