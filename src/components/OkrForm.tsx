import { useContext, useEffect, useState } from "react";
import KeyResultForm from "./KeyResultForm.tsx";
import { KeyResultListContext } from "../context/KeyResultListProvider.tsx";
import type { KeyResult, OkrType } from "../types/okr-types.ts";

const OkrForm = ({
  okr,
  handleSubmit,
}: {
  okr: OkrType;
  handleSubmit: (
    objective: string,
    keyResultsList: KeyResult[],
    okrId: string,
  ) => void;
}) => {
  const [objective, setObjective] = useState(okr.objective);
  const { keyResultsList, keyResult, handleKeyResultUpdation } =
    useContext(KeyResultListContext);

  useEffect(() => {
    handleKeyResultUpdation(okr.keyResultList);
  }, []);

  return (
    <div className="w-[70%] flex flex-col items-center justify-center bg-black/50 p-6 rounded-lg border border-gray-100/20 ">
      <h2 className="w-full text-center text-2xl text-white/40 font-bold">
        OKR Form
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(objective, keyResultsList, okr.id);
        }}
        className="flex flex-col gap-4 items-center justify-center w-full"
      >
        <div className="w-full flex gap-2 items-center justify-between">
          <input
            type="text"
            name="objective"
            placeholder="Write Objective?"
            className="w-full placeholder:text-xl h-12 rounded-xl bg-black-30 border border-gray-300/30 px-4 placeholder:text-slate-300 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white  transition-all"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <div className="w-full">
              <KeyResultForm keyResultOld={keyResult} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center ">
          <button
            type="submit"
            className="text-xl w-full max-w-lg cursor-pointer rounded-xl bg-linear-to-r bg-gray-950/30 text-white/30  py-3 font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Submit OKRs
          </button>
        </div>
      </form>
    </div>
  );
};
export default OkrForm;
