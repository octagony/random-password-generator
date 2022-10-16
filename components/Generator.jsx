import React, {useState}from 'react';
import Checkbox from './UI/Checkbox.jsx'
import Range from './UI/Range.jsx'

const Generator = ({ handleGeneratePassword, password, actionButtons, handlePasswordLength, passwordLength, updateCheckboxes, handleCopyToClipboard,setModalSave }) =>{
/*
 * TODO:
 * 1.  Fix generate password function
 */

const [firstAttempt, setFirstAttempt] = useState(true);

const handleFirstGenerate =(event) =>{
  event.preventDefault();
  setFirstAttempt(!firstAttempt ? firstAttempt : !firstAttempt );
  handleGeneratePassword(event);
}

  return(
        <form
          onSubmit={(event)=>handleFirstGenerate(event)}
          className="p-4 rounded-xl"
        >
          <div>
        {password.value ? (
            <span className = 'text-primary text-lg block mb-2'>Your password: </span>
        ) : ( <span className = 'text-primary text-lg block mb-2'> Select the password length: </span>)}
            <p  className={firstAttempt ? 'hidden' : 'p-4  border-2 mb-4 rounded-xl text-xl font-mono'}>{password.value}</p>
            {actionButtons ? (
              <div className='flex flex-col md:flex-row md:justify-evenly mb-5'>

                <button
                  className = 'w-full md:w-1/2 my-2 md:mx-2  p-3 bg-button text-btnText rounded-2xl shadow-xl'
                  onClick={handleCopyToClipboard}
                >
                  Copy to Clipboard
                </button>
                <button
                  className = 'w-full md:w-1/2 my-2 md:mx-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'
                  onClick={() => setModalSave(true)}
                >
                  Save Password
                </button>
              </div>
            ) : null}
          </div>
          <div className='px-4'>
              <Range passwordLength={passwordLength} handlePasswordLength={handlePasswordLength} />
            <span>Password Length:</span>
            <span>{passwordLength}</span>
          </div>
          <div className='grid grid-cols-1 place-items-center md:grid-cols-3'>
            <Checkbox updateCheckboxes={updateCheckboxes} info = 'Include numbers'  name = 'numbers'/>
            <Checkbox updateCheckboxes={updateCheckboxes} info = 'Include symbols' name = 'symbols'/>
            <Checkbox updateCheckboxes={updateCheckboxes} info = 'Include uppercase' name = 'uppercase'/>
          </div>
          <div>
            <input
              className = 'w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'
              type="submit"
              value="Generate password"
            />
          </div>
        </form>
  )
}

  export default Generator
