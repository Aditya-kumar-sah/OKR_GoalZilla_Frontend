import type { KeyResult, OkrType } from "../types/okr-types.ts";
import OkrForm from "./OkrForm.tsx";
import Modal from "./Modal.tsx";
import { useContext, useState } from "react";
import KeyResultListProvider, {
  KeyResultListContext,
} from "../context/KeyResultListProvider.tsx";
import { Trash } from "lucide-react";

interface OkrListPropsType {
  okrList: OkrType[];
  setOkrList: (okrList: OkrType[]) => void;
}

const OkrList = ({ okrList, setOkrList }: OkrListPropsType) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { addKeyResultToFormHandler } = useContext(KeyResultListContext);

  const handleOpenAddOkr = () => {
    setIsEditOpen(true);
  };

  const handleCloseAddOkr = () => {
    setIsEditOpen(false);
    addKeyResultToFormHandler({
      description: "",
      id: "",
      isCompleted: false,
      progress: 0,
    });
  };

  const handleDeleteOkr = async (okrId: string) => {
    const newOkrList = okrList.filter((okr) => okr.id !== okrId);
    setOkrList(newOkrList);
    await fetch(`http://localhost:3000/okr/${okrId}`, {
      method: "DELETE",
    });
  };

  const handleEditOkrSubmit = async (
    objective: string,
    keyResultsList: KeyResult[],
    okrId: string,
  ) => {
    await fetch(`http://localhost:3000/okr/${okrId}`, {
      method: "PUT",
      body: JSON.stringify({
        objective,
        keyResultList: keyResultsList,
      }),
    });
    alert("Form Editted!");
    handleCloseAddOkr();
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
                <KeyResultListProvider>
                  <Modal
                    isOpen={isEditOpen}
                    formButtonName={"Edit Okr"}
                    handleOpenOkr={handleOpenAddOkr}
                    handleCloseOkr={handleCloseAddOkr}
                  >
                    <OkrForm handleSubmit={handleEditOkrSubmit} okr={okr} />
                  </Modal>
                </KeyResultListProvider>
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
              {okr.objective}
            </div>
          </div>

          <div className="w-full flex flex-col items-start gap-2  p-2 rounded-md">
            <div className="text-slate-600 text-2xl font-bold">
              Key Results:
            </div>
            <KeyResultList
              keyResultList={okr.keyResultList}
              setOkrList={setOkrList}
              okrList={okrList}
              okrId={okr.id}
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
  setOkrList,
  okrList,
  okrId,
}: {
  keyResultList: KeyResult[];
  okrList: OkrType[];
  setOkrList: (okrList: OkrType[]) => void;
  okrId: string;
}) => {
  const handleCheck = async (keyResultId: string, okrId: string) => {
    const newOkrList = okrList.map((okr) => {
      if (okr.id === okrId) {
        const updatedKeyResultList = okr.keyResultList?.map((keyResult) => {
          if (keyResult.id === keyResultId) {
            keyResult.isCompleted = !keyResult.isCompleted;
            if (keyResult.isCompleted) keyResult.progress = 100;
            else keyResult.progress = 0;
          }
          return keyResult;
        });
        okr.keyResultList = updatedKeyResultList;
      }
      return okr;
    });
    setOkrList(newOkrList);
    const updatedOkr = newOkrList.find((okr) => okr.id === okrId);

    await fetch(`http://localhost:3000/okr/${okrId}`, {
      method: "PATCH",
      body: JSON.stringify({
        keyResultList: updatedOkr?.keyResultList,
      }),
    });
  };
  return (
    <div className="w-full  flex flex-col p-2 gap-4 rounded-md items-center justify-center">
      {keyResultList?.map((keyResult, index) => {
        return (
          <div
            onClick={() => handleCheck(keyResult.id, okrId)}
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
