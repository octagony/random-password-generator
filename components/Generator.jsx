import React from 'react';
import Checkbox from './UI/Checkbox.jsx'

const Generator = ({initialState, setInitialState, handleGeneratePassword, password, actionButtons, handlePasswordLenght, passwordLength, updateCheckboxes, handleCopyToClipboard,setModalSave }) =>{
/*
 * TODO:
 * 1. Fix data transfer to password input
 * 2. Set styles to Generate block
 * 3. Fix checkboxes location 
 */
  const updateCheckboxes = (event) => {
    setInitialState({
      ...initialState,
      [event.target.name]: event.target.checked,
    });
  };

  return(
        <form
          onSubmit={handleGeneratePassword}
          className="p-4 border-2 border-amber-400"
        >
          <div>
            <span>Your password: </span>
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
            <span>Password Length:</span>
            <input
              type="range"
              name="length"
              onChange={handlePasswordLenght}
              min="2"
              max="100"
              value={passwordLength}
            />
            <span>{passwordLength}</span>
          </div>
          <div>
            <Checkbox updateCheckboxes={updateCheckboxes} info = 'Include Numbers:'/>
          </div>
          <div>
            <span>Include symbols:</span>
            <Checkbox updateCheckboxes={updateCheckboxes} info = 'Include symbols:'/>
          </div>
          <div>
            <span>Include uppercase:</span>
            <Checkbox updateCheckboxes={updateCheckboxes} info = 'Include uppercase:'/>
            />
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
