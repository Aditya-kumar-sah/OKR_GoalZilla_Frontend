import { useState } from "react";
import KeyResultsList from "./KeyResultsList.tsx";
import * as React from "react";
import KeyResultForm from "./KeyResultForm.tsx";
import KeyResultProvider from "../context/KeyResultProvider.tsx";

const OkrForm = () => {
  const [objective, setObjective] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-100 h-auto  rounded bg-gray-100 shadow-md flex flex-col justify-center py-2 px-4 gap-3">
      <h2 className="text-center font-semibold text-2xl">OKR Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 w-full  items-center justify-center ">
          <label className="font-bold">Objective</label>
          <input
            type="text"
            name="objective"
            placeholder="Enter Objective"
            required
            className="border w-[70%] h-10 rounded p-2"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
        </div>
        <KeyResultProvider>
          <>
            <KeyResultForm />

            <KeyResultsList />
          </>
        </KeyResultProvider>
        <div className="w-full flex gap-1 justify-around font-semibold">
          <button
            type="submit"
            className=" p-2 w-full bg-green-400 rounded hover:bg-green-100 cursor-pointer "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default OkrForm;
