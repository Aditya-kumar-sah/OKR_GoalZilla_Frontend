import { KeyResultsContext } from "../context/KeyResultProvider.tsx";
import { useContext } from "react";

const KeyResultsList = () => {
  const { keyResultsList } = useContext(KeyResultsContext);

  return (
    <>
      {keyResultsList?.map((keyResult, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-xl bg-white shadow-sm border border-slate-200 px-5 py-4 hover:shadow-md transition-all"
          >
            <span className="text-slate-800 font-medium text-sm md:text-base flex-1">
              {keyResult.description}
            </span>

            <div className="shrink-0 rounded-full bg-blue-100 text-blue-700 font-semibold px-4 py-1 text-sm">
              {keyResult.progress}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default KeyResultsList;
