import { useContext, useState } from "react";
import type { KeyResult } from "../types/okr-types.ts";
import { KeyResultListContext } from "../context/KeyResultListProvider.tsx";

const KeyResultForm = () => {
  const [keyResult, setKeyResult] = useState<KeyResult>({
    description: "",
    progress: 0,
    id: "",
    isCompleted: false,
  });

  const { handleKeyResultAddition } = useContext(KeyResultListContext);

  function handleAddKeyResult() {
    handleKeyResultAddition(keyResult);
    setKeyResult({
      description: "",
      progress: 0,
      id: "",
      isCompleted: false,
    });
  }

  return (
    <div className="flex flex-col w-full items-center py-8 gap-5">
      <input
        type="text"
        name="description"
        placeholder="Enter Key"
        className="w-full placeholder:text-xl  h-12 rounded-xl bg-black-30 border border-gray-300/30 px-4 placeholder:text-slate-300 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white  transition-all"
        value={keyResult.description}
        onChange={(e) =>
          setKeyResult({ ...keyResult, [e.target.name]: e.target.value })
        }
      />

      <input
        type="text"
        name="progress"
        placeholder="Progress (%)"
        className="w-full placeholder:text-xl  h-12 rounded-xl bg-black-30 border border-gray-300/30 px-4 placeholder:text-slate-300 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white  transition-all"
        value={keyResult.progress}
        onChange={(e) =>
          setKeyResult({ ...keyResult, [e.target.name]: e.target.value })
        }
      />

      <button
        onClick={handleAddKeyResult}
        type="button"
        className="w-full text-xl focus:text-xl max-w-lg cursor-pointer rounded-xl bg-linear-to-r bg-gray-950/30 text-white/30  py-3 font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
      >
        Add Key Result
      </button>
    </div>
  );
};
export default KeyResultForm;
