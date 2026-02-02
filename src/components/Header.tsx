import Modal from "./Modal.tsx";
import OkrForm from "./OkrForm.tsx";
import { useContext, useState } from "react";
import type { KeyResult } from "../types/okr-types.ts";
import { v4 as uuidv4 } from "uuid";
import { KeyResultListContext } from "../context/KeyResultListProvider.tsx";

const Header = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addKeyResultToFormHandler } = useContext(KeyResultListContext);
  const handleOpenAddOkr = () => {
    setIsFormOpen(true);
  };

  const handleCloseAddOkr = () => {
    setIsFormOpen(false);
    addKeyResultToFormHandler({
      description: "",
      id: "",
      isCompleted: false,
      progress: 0,
    });
  };

  const handleAddOkrSubmit = async (
    objective: string,
    keyResultsList: KeyResult[],
  ) => {
    await fetch("http://localhost:3000/okr", {
      method: "POST",
      body: JSON.stringify({
        objective,
        keyResultList: keyResultsList,
        id: uuidv4(),
      }),
    });
    alert("Form Submitted!");
    setIsFormOpen(false);
  };
  return (
    <div className="w-full py-4 px-2 sticky top-0 right-0 left-0 bg-black/50 flex items-center justify-between">
      <div className="text-2xl cursor-pointer font-bold text-gray-200">
        GoalZilla
      </div>
      <div>
        <Modal
          isOpen={isFormOpen}
          handleOpenOkr={handleOpenAddOkr}
          handleCloseOkr={handleCloseAddOkr}
        >
          <OkrForm
            handleSubmit={handleAddOkrSubmit}
            okr={{ objective: "", keyResultList: [], id: "" }}
          />
        </Modal>
      </div>
    </div>
  );
};
export default Header;
