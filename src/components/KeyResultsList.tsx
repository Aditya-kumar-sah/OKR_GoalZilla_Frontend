import { KeyResultListContext } from "../context/KeyResultListProvider.tsx";
import { useContext } from "react";
import { Pencil, Trash } from "lucide-react";
import type { KeyResult } from "../types/okr-types.ts";
import {OkrListContext} from "../context/OkrProvider.tsx";
import axios from "axios";

const KeyResultsList = () => {
  const {deleteKeyResultInList,keyResultsList,updateKeyResult} = useContext(KeyResultListContext);
  const {updateEachOkrWithGivenKeyResultList} = useContext(OkrListContext)

  const handleDeleteKeyResult = async (keyResult:KeyResult) => {
     try{
         const res = await axios.delete(`http://localhost:3002/objective/${keyResult.objective_id}/keyResult/${keyResult.id}`);
         deleteKeyResultInList({id:res.data.id,objective_id:res.data.objective_id,progress:res.data.progress,description:res.data.description,isCompleted:res.data.isCompleted});
         updateEachOkrWithGivenKeyResultList(keyResultsList,keyResult.objective_id);
     }
     catch(err : any){
        alert(err.message)
        console.log(err)
     }
  };

  const handleAddKeyResultToForm = (keyResult: KeyResult) => {
     updateKeyResult(keyResult);
  };

  return (
    
    <div className="flex flex-col items-center gap-2 w-full justify-start p-6 rounded-lg h-[200px] overflow-y-auto scrollbar-none">
      {keyResultsList.map((keyResult) => {
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
              onClick={() => handleDeleteKeyResult(keyResult)}
            >
              <Trash />
            </div>
            <div
              className="w-[20%] cursor-pointer"
              onClick={() => handleAddKeyResultToForm(keyResult)}
            >
              <Pencil />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default KeyResultsList;
