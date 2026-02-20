import {useContext, useEffect, useState} from "react";
import KeyResultForm from "./KeyResultForm.tsx";
import { KeyResultListContext } from "../context/KeyResultListProvider.tsx";
import type { OkrType } from "../types/okr-types.ts";
import KeyResultsList from "./KeyResultsList.tsx";

const OkrForm = ({
  okr,
  handleSubmit, isAdd
}: {
  okr: OkrType;
  isAdd:boolean;
  handleSubmit: (
    objective: string,
    okrId: string,
  ) => void;
}) => {
  
  const [objective, setObjective] = useState(okr.title);
  const { updateKeyResultList } = useContext(KeyResultListContext);

    useEffect(() => {
        updateKeyResultList(okr.keyResult);
    }, [okr.keyResult]);

  return (
    <div className="w-[70%] flex flex-col items-center justify-center bg-black/50 p-6 rounded-lg border border-gray-100/20 gap-6">
      <h2 className="w-full text-center text-2xl text-white/40 font-bold">
        OKR Form {okr.title}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(objective,okr.id);
        }}
        className="flex flex-col gap-4 items-center justify-center w-full"
      >
        <div className="w-full flex flex-col gap-2 items-center justify-between">
          <div className="w-full flex items-center justify-center gap-6">
            <input
            type="text"
            name="objective"
            placeholder="Write Objective?"
            className="w-[60%] placeholder:text-xl h-12 rounded-xl bg-black-30 border border-gray-300/30 px-4 placeholder:text-slate-300 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white  transition-all"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
          <div className="w-[40%] flex justify-center ">
          <button
            type="submit"
            className="text-xl w-full max-w-lg cursor-pointer rounded-xl bg-linear-to-r bg-gray-950/30 text-white/30  py-3 font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Submit Objective
          </button>
        </div>
          </div>
          {!isAdd && <div className="flex flex-col gap-2 items-center justify-center w-full">
            <div className="w-full flex gap-2 items-center justify-between">
                  <KeyResultForm okrId = {okr.id} />
            
                  <KeyResultsList  />
            </div>
          </div>}
        </div>


      </form>

    </div>
  );
};
export default OkrForm;
