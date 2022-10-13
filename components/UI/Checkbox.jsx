import React from 'react';


const Checkbox = ({ updateCheckboxes, info, name }) =>{
  return(
   <label class="flex radio p-2 cursor-pointer">
     <input class="my-auto transform scale-125" name = {name} type="checkbox" onChange = { ()=>{ updateCheckboxes(event) } }/>
     <div class="title px-2 my-auto">{info}</div>
  </label>

  )

}
export default Checkbox
