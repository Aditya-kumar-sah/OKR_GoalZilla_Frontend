import OkrList from "./OkrList.tsx";
import {useContext, useEffect} from "react";
import Header from "./Header.tsx";
import KeyResultListProvider from "../context/KeyResultListProvider.tsx";
import axios from "axios";
import {OkrListContext} from "../context/OkrProvider.tsx";

const Home = () => {
  const {addOkrList} = useContext(OkrListContext)

  useEffect(() => {
    const fetchAllOkr = async () =>{
      try {
        const res = await axios.get("http://localhost:3002/objective");
        addOkrList(res.data);
      } catch (error : any) {
        alert(error.message);
      }
    }
    fetchAllOkr();
  }, []);

  return (
    <KeyResultListProvider>
      <div className="w-full h-screen">
        <div className="w-full">
          <Header />
        </div>
        <div className="w-full p-4">
          <OkrList/>
        </div>
      </div>
    </KeyResultListProvider>
  );
};
export default Home;
