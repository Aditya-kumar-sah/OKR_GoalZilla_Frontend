import Modal from "./Modal.tsx";
import OkrForm from "./OkrForm.tsx";
import KeyResultListProvider from "../context/KeyResultListProvider.tsx";
import { useState } from "react";

const Header = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleOpenAddOkr = () => {
    setIsFormOpen(true);
  };

  const handleCloseAddOkr = () => {
    setIsFormOpen(false);
  };
  return (
    <div className="w-full py-4 px-2 sticky top-0 right-0 left-0 bg-black/50 flex items-center justify-between">
      <div className="text-2xl cursor-pointer font-bold text-gray-200">
        GoalZilla
      </div>
      <div>
        <KeyResultListProvider>
          <Modal
            isOpen={isFormOpen}
            handleOpenOkr={handleOpenAddOkr}
            handleCloseOkr={handleCloseAddOkr}
          >
            <OkrForm okr={{ objective: "", keyResultList: [], id: "" }} />
          </Modal>
        </KeyResultListProvider>
      </div>
    </div>
  );
};
export default Header;
