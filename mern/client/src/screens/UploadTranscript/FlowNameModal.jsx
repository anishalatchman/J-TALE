import React from "react";
import { useNavigate } from "react-router-dom";

function FlowNameModal({ closeModal }, filename) {
  const Navigate = useNavigate();

  const PageChange = (url) => {
    Navigate(url);
  };

  const NameSubmit = () => {
    alert("Flow name set to: ");
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
      <div className="text-center w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="rounded-3xl shadow-lg relative flex flex-col w-full bg-white">
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="text-center font-nunito font-bold text-xl">
              Name Your Flow
            </p>
            <input
              className="my-2 text-lg font-nunito border-2 rounded-lg p-2"
              type="text"
              placeholder="Enter flow name here"
            />
          </div>
          {/*footer*/}
          <div className="relative p-6 flex-auto">
            <button
              className="text-red-500 px-6 py-2 text-base font-nunito font-bold"
              type="button"
              onClick={() => closeModal(false)}
            >
              CANCEL
            </button>
            <button
              className="text-green-500 px-6 py-2 text-base font-nunito font-bold"
              type="button"
              onClick={() => {
                NameSubmit();
                closeModal(false);
                PageChange("/startingintent");
              }}
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowNameModal;
