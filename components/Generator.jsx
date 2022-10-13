import React from 'react';
import Checkbox from './UI/Checkbox.jsx'
import Range from './UI/Range.jsx'

const Generator = ({initialState, setInitialState, handleGeneratePassword, password, actionButtons, handlePasswordLength, passwordLength, updateCheckboxes, handleCopyToClipboard,setModalSave }) =>{
/*
 * TODO:
 * 1. Set styles to Generate block
 * 2. Fix checkboxes location 
 */

  return(
        <form
          onSubmit={handleGeneratePassword}
          className="p-4 border-2 border-amber-400"
        >
          <div>
            <span className = 'text-primary text-lg'>Your password: </span>
            <p>{password.value}</p>
            {actionButtons ? (
              <div>
                <button
                  className="p-2 cursor-pointer"
                  onClick={handleCopyToClipboard}
                >
                  Copy to Clipboard
                </button>
                <button
                  className="p-2 cursor-pointer"
                  onClick={() => setModalSave(true)}
                >
                  Save Password
                </button>
              </div>
            ) : null}
          </div>
          <div>
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
              className="p-2 bg-slate-500 cursor-pointer"
              type="submit"
              value="Generate password"
            />
          </div>
        </form>
  )
}

  export default Generator
