import type { KeyResult} from "../types/okr-types.ts";
import OkrForm from "./OkrForm.tsx";
import Modal from "./Modal.tsx";
import { useContext, useState } from "react";
import { Trash } from "lucide-react";
import {OkrListContext} from "../context/OkrProvider.tsx";
import axios from "axios";



const OkrList = () => {
  const {okrList,deleteOkr,updateOkr} = useContext(OkrListContext)

  const [isEditOpen, setIsEditOpen] = useState(false);


  const handleOpenEditOkr = () => {
    setIsEditOpen(true);
  };

  const handleCloseEditOkr = () => {
    setIsEditOpen(false);
  };

  const handleDeleteOkr = async (okrId: string) => {
     try{
         const res = await axios.delete(`http://localhost:3002/objective/${okrId}`)
         deleteOkr(res.data.id);
     }catch(err:any){
       alert(err.message)
     }
  };

  const handleEditOkrSubmit = async (
    objective: string,
    okrId: string,
  ) => {
    try{
      const res = await axios.put(`http://localhost:3002/objective/${okrId}`,{title:objective});
      updateOkr({title : res.data.title,id : res.data.id});
      handleCloseEditOkr();
    }catch(err:any){
      alert(err.message);
      handleCloseEditOkr();
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full h-[60%] ">
      {okrList.map((okr, index) => (
        <div
          key={index}
          className="w-[50%] flex flex-col items-start gap-2 bg-gray-200 p-2 rounded-md"
        >
          <div className="w-full flex flex-col items-start gap-4">
            <div
              className={
                (!isEditOpen &&
                  "text-slate-700  w-full text-3xl text-bold flex justify-between items-center") ||
                "text-slate-700  w-full text-3xl text-bold"
              }
            >
              Objective:
              <div className="flex items-center gap-2">

                  <Modal
                    isOpen={isEditOpen}
                    formButtonName={"Edit Okr"}
                    handleOpenOkr={handleOpenEditOkr}
                    handleCloseOkr={handleCloseEditOkr}
                  >
                    <OkrForm isAdd = {false} handleSubmit={handleEditOkrSubmit} okr={okr} />
                  </Modal>
                <div>
                  <button
                    className="bg-slate-500 rounded-full text-white p-2 cursor-pointer"
                    onClick={() => handleDeleteOkr(okr.id)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-slate-600  text-2xl text-bold">
              {okr.title}
            </div>
          </div>

          <div className="w-full flex flex-col items-start gap-2  p-2 rounded-md">
            <div className="text-slate-600 text-2xl font-bold">
              Key Results:
            </div>
            <KeyResultList
              keyResultList={okr.keyResult}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default OkrList;

const KeyResultList = ({
  keyResultList,
}: {
  keyResultList: KeyResult[];
}) => {


  return (
    <div className="w-full  flex flex-col p-2 gap-4 rounded-md items-center justify-center">
      {keyResultList?.map((keyResult, index) => {
        return (
          <div
            onClick={() => {}}
            key={index}
            className="flex bg-black/30 cursor-pointer p-3 rounded-2xl items-center gap-4 w-[90%]"
          >
            <input
              type="checkbox"
              className="
    appearance-none
    w-5 h-5
    rounded-full
    border-2 border-gray-500
    checked:bg-gray-500
    checked:border-gray-500
    checked:after:content-['']
    checked:after:absolute
    checked:after:w-2
    checked:after:h-2
    checked:after:rounded-full
    checked:after:top-1/2
    checked:after:left-1/2
    checked:after:-translate-x-1/2
    checked:after:-translate-y-1/2
  "
              checked={keyResult.isCompleted}
            />

            <div className="flex flex-col gap-4">
              <div className="text-white font-bold">
                Description: {keyResult.description}
              </div>
              <div className="text-white font-bold">
                Progress: {keyResult.progress}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
