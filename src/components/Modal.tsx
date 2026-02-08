import { type ReactNode } from "react";
import { X } from "lucide-react";
interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  formButtonName?: string;
  handleCloseOkr: () => void;
  handleOpenOkr: () => void;
}

const Modal = ({
  children,
  handleOpenOkr,
  handleCloseOkr,
  isOpen = false,
  formButtonName = "Add Okr",
}: ModalProps) => {
  if (!isOpen) {
    return (
      <button
        className="bg-gray-800/40 hover:bg-gray-800/20 text-white font-bold rounded-lg p-2 text-xl cursor-pointer"
        onClick={handleOpenOkr}
      >
        {formButtonName}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800/90 flex items-center justify-center transition w-full p-4 ">
      <button
        className="bg-black/50 text-white font-bold rounded-full p-2 fixed top-[3%] right-[2%] cursor-pointer z-50"
        onClick={handleCloseOkr}
      >
        <X />
      </button>
      <div className="w-[70%] h-screen flex items-center justify-center">
          {children}
      </div>


    </div>
  );
};
export default Modal;
