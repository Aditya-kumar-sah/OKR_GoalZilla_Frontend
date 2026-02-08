import {useContext, useEffect, useState} from "react";
import { KeyResultListContext } from "../context/KeyResultListProvider.tsx";
import type {KeyResult} from "../types/okr-types.ts";
import axios from "axios";
import {OkrListContext} from "../context/OkrProvider.tsx";

const KeyResultForm = ({okrId} : {okrId : string}) => {

  const { handleKeyResultAddition, keyResult,keyResultsList } =
    useContext(KeyResultListContext);

  const {updateEachOkrWithGivenKeyResultList} = useContext(OkrListContext)

  const [currKeyResult, setCurrKeyResult] = useState<KeyResult>(keyResult);

    useEffect(() => {
        setCurrKeyResult(keyResult)
    }, [keyResult]);

  async function handleAddKeyResult() {
      try{
          let newCurrKeyResult;
          if(currKeyResult.id) newCurrKeyResult = await axios.put(`http://localhost:3002/objective/${okrId}/keyResult/${currKeyResult.id}`,{progress:currKeyResult.progress,description:currKeyResult.description,isCompleted:currKeyResult.isCompleted});
          else newCurrKeyResult = await axios.post(`http://localhost:3002/objective/${okrId}/keyResult`,{progress:currKeyResult.progress,description:currKeyResult.description,isCompleted:currKeyResult.isCompleted});
          handleKeyResultAddition(newCurrKeyResult.data);
          updateEachOkrWithGivenKeyResultList(keyResultsList,okrId)
          setCurrKeyResult({objective_id:"",id:"",progress:0,description:"",isCompleted:false});
      }catch(error : any){
          console.log(error)
          alert(error.message);
      }

  }

  return (
    <div className="flex flex-col w-full items-center py-8 gap-5">
      <input
        type="text"
        name="description"
        placeholder="Enter Key"
        className="w-full placeholder:text-xl  h-12 rounded-xl bg-black-30 border border-gray-300/30 px-4 placeholder:text-slate-300 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white  transition-all"
        value={currKeyResult.description}
        onChange={(e) => setCurrKeyResult({...currKeyResult,description:e.target.value})}

      />

      <input
        type="number"
        name="progress"
        placeholder="Progress (%)"
        className="w-full placeholder:text-xl  h-12 rounded-xl bg-black-30 border border-gray-300/30 px-4 placeholder:text-slate-300 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white  transition-all"
        value={currKeyResult.progress}
        onChange={(e) => setCurrKeyResult({...currKeyResult,progress:Number(e.target.value)})}
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
