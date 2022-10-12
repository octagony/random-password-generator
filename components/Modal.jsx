import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({savePassword, password, setModalSave}) =>{
  return( 
        <div className="absolute w-screen h-screen bg-gray-900 bg-opacity-20 z-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 p-2 bg-primary rounded-xl">
              <div className="">
                <p>Save your password</p>
                <span
                  className="cursor-pointer absolute top-2 right-2"
                  onClick={() => setModalSave(false)}
                >
                  <AiOutlineClose size={20} />
                </span>
              </div>
              <form onSubmit={savePassword}>
                <div>
                  <p>Set label</p>
                  <input
                    type="text"
                    onChange={(event) =>
                      setPassword({ ...password, name: event.target.value })
                    }
                    value={password.name}
                  />
                </div>
                <div>
                  <p>Configure password</p>
                  <input
                    type="text"
                    onChange={(event) =>
                      setPassword({ ...password, value: event.target.value })
                    }
                    value={password.value}
                  />
                </div>
                <input
                  className="p-4 border border-cyan-900 cursor-pointer"
                  type="submit"
                  value="Save password"
                ></input>
              </form>
            </div>
          </div>
        </div>
  )
}

export default Modal
