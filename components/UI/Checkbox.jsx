import React from 'react';


const Checkbox = ({updateCheckboxes, info}) =>{
  return(
   <label class="flex radio p-2 cursor-pointer">
     <input class="my-auto transform scale-125" type="checkbox"  onChange = {updateCheckboxes}/>
     <div class="title px-2 my-auto">{info}</div>
  </label>

  )

}
export default Checkbox
