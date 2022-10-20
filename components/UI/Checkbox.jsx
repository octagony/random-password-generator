import React from 'react';


const Checkbox = ({ updateCheckboxes, info, name }) =>{
  return(
   <label className="flex radio p-2 cursor-pointer">
     <input className="my-auto transform scale-125" name = {name} type="checkbox" onChange = { ()=>{ updateCheckboxes(event) } }/>
     <div className="title px-2 my-auto">{info}</div>
  </label>

  )

}
export default Checkbox
