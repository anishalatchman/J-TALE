import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessModal ({closeModal}, filename){

    const Navigate = useNavigate();

    const PageChange = (url) => {
        Navigate(url);
      };

    return(
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure you want to upload transcripts. 
                </p>
                //TODO Add name of transcript to p tag
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal(false)}
                >
                    Cancel
                </button>
                <button
                    className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        closeModal(false);
                        PageChange("/");
                    }}
                >
                    Continue
                </button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default SuccessModal

