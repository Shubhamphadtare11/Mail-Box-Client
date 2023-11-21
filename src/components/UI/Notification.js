import React from 'react'
const Notification = (props) => {


  return (
    <div>
     <h6 style={{color:"rgb(233, 49, 79)",marginRight:"3rem"}}>{props.message}!!</h6>
    </div>
  )
}

export default Notification