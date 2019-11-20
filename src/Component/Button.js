import React from 'react';

const Button = (props) => {
  return (
    <button type="button" onClick={()=> props.runParentFunction()}>{props.name}</button>
  )
}
export default Button;