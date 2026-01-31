import { type ReactNode, useState } from "react";
interface ModalProps {
  children: ReactNode;
  isOpen?: boolean;
  formButtonName?: string;
}

const Modal = ({
  children,
  isOpen = false,
  formButtonName = "Add Okr",
}: ModalProps) => {
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  return (
    <div className="fixed inset-0 bg-gray-500/25 flex items-center justify-center">
      {!isFormOpen ? (
        <button
          className="bg-purple-400 text-white font-bold rounded-md p-2 fixed top-[30px] right-[100px] cursor-pointer z-50"
          onClick={() => setIsFormOpen(true)}
        >
          {formButtonName}
        </button>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <button
            className="bg-purple-400 text-white font-bold rounded-md p-2 fixed top-[60px] right-[400px] cursor-pointer z-50"
            onClick={() => setIsFormOpen(false)}
          >
            Close
          </button>
          {children}
        </div>
      )}
    </div>
  );
};
export default Modal;
