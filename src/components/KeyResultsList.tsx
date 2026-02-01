import { KeyResultListContext } from "../context/KeyResultListProvider.tsx";
import { useContext } from "react";
import { Trash } from "lucide-react";

const KeyResultsList = () => {
  const { keyResultsList, handleKeyResultDeletion } =
    useContext(KeyResultListContext);

  const handleDeleteKeyResult = (id: string) => {
    handleKeyResultDeletion(id);
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-h-[600px] justify-start p-6 rounded-lg overflow-y-auto scrollbar-none">
      {keyResultsList?.map((keyResult) => {
        let width = keyResult.progress;
        return (
          <div
            key={keyResult.id}
            className="w-full flex items-center gap-6  bg-black/20 shadow-sm border border-slate-200/20 px-5 py-4 hover:shadow-md transition-all"
          >
            <div className="flex flex-col w-[80%] items-start justify-between gap-4 rounded-xl ">
              <div className="text-white w-full break-all font-medium text-sm md:text-base flex-1">
                {keyResult.description}
              </div>

              <div
                style={{ width: `${width}%` }}
                className={`shrink-0 flex flex-col items-center justify-center rounded-full bg-slate-200/40 text-white font-semibold px-4 py-1 text-sm`}
              >
                {keyResult.progress}%
              </div>
            </div>
            <div
              className="w-[20%] cursor-pointer"
              onClick={() => handleDeleteKeyResult(keyResult.id)}
            >
              <Trash />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default KeyResultsList;
