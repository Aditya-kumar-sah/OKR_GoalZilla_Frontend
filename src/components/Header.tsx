import Modal from "./Modal.tsx";
import OkrForm from "./OkrForm.tsx";
import {useContext, useState} from "react"
import axios from "axios";
import {OkrListContext} from "../context/OkrProvider.tsx";

const Header = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
    const {updateOkr} = useContext(OkrListContext);
  const handleOpenAddOkr = () => {
    setIsFormOpen(true);
  };

  const handleCloseAddOkr = () => {
    setIsFormOpen(false);
  };

  const handleAddOkrSubmit = async (
    objective: string,okrId:string
  ) => {

     try{
       const res = await axios.post("http://localhost:3002/objective",{
         title : objective
       })
         updateOkr({title : res.data.title,id : res.data.id});
       alert("Form Submitted!");
       setIsFormOpen(false);
     }catch(error : any){
        alert(error.message);
     }
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
            isAdd = {true}
            okr={{ title: "", keyResult: [], id: "" }}
          />
        </Modal>
      </div>
    </div>
  );
};
export default Header;
