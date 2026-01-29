import { useContext, useState } from "react";
import type { KeyResult } from "../types/okr-types.ts";
import { KeyResultsContext } from "../context/KeyResultProvider.tsx";

const KeyResultForm = () => {
  const [keyResult, setKeyResult] = useState<KeyResult>({
    description: "",
    progress: "",
  });

  const { handleKeyResultAddition } = useContext(KeyResultsContext);
  function handleAddKeyResult() {
    if (handleKeyResultAddition(keyResult)) {
      setKeyResult({
        description: "",
        progress: "",
      });
    } else {
      alert("Validation Error");
    }
  }

  return (
    <div className="flex flex-col w-full  items-center py-2 gap-2">
      <label className="font-bold ">Key Result</label>
      <input
        type="text"
        name="description"
        placeholder="Enter Description"
        className="border w-[70%] h-10  rounded p-2"
        value={keyResult.description}
        onChange={(e) =>
          setKeyResult({ ...keyResult, [e.target.name]: e.target.value })
        }
      />
      <input
        type="text"
        name="progress"
        placeholder="Enter Progress eg: 24%"
        className="border w-[70%] h-10  rounded p-2"
        value={keyResult.progress}
        onChange={(e) =>
          setKeyResult({ ...keyResult, [e.target.name]: e.target.value })
        }
      />
      <button
        onClick={handleAddKeyResult}
        type="button"
        className="bg-blue-400 rounded-md p-2 font-semibold cursor-pointer hover:bg-blue-200 "
      >
        Add Key result
      </button>
    </div>
  );
};
export default KeyResultForm;
