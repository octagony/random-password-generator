import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IModal } from "./Modal.props";

const Modal = ({
  savePassword,
  password,
  setModalSave,
  setPassword,
}: IModal): JSX.Element => {
  return (
    <div className="absolute w-screen h-screen bg-gray-900 bg-opacity-20 z-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="rounded-xl fixed border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-max md:w-96 h-96 bg-primary rounded-xl">
          <div className="p-4">
            <p className="text-xl cursor-pointer"> Save your password</p>
            <span
              className="cursor-pointer absolute top-5 right-4"
              onClick={() => setModalSave(false)}
            >
              <AiOutlineClose size={20} />
            </span>
          </div>
          <form onSubmit={savePassword}>
            <div className="px-4 mb-10">
              <label
                className="block tracking-wide text-primary font-bold mb-2"
                htmlFor="password-name"
              >
                Password name:
              </label>
              <input
                className="appearance-none block w-full border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-accent"
                id="password-name"
                type="text"
                placeholder="my awesome password"
                onChange={(event) =>
                  setPassword({ ...password, name: event.target.value })
                }
                value={password.name}
              />
            </div>
            <div className="px-4 mb-10">
              <label
                className="block tracking-wide text-primary font-bold mb-2"
                htmlFor="password-name"
              >
                Configure password:
              </label>
              <input
                className="appearance-none block w-full border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-primary"
                id="password-name"
                type="text"
                onChange={(event) =>
                  setPassword({ ...password, value: event.target.value })
                }
                value={password.value}
              />
            </div>
            <div className="px-4">
              <input
                className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl cursor-pointer"
                type="submit"
                value="Save password"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
