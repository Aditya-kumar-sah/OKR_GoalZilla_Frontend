import Modal from "./Modal.tsx";
import OkrForm from "./OkrForm.tsx";
import OkrList from "./OkrList.tsx";
import type { OkrType } from "../types/okr-types.ts";
import { useEffect, useState } from "react";

const Home = () => {
  const [okrList, setOkrList] = useState<OkrType[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/okr").then(async (response) => {
      const responseOkrData = await response.json();
      setOkrList(responseOkrData);
      console.log();
    });
  }, []);
  return (
    <div className="w-full">
      <Modal>
        <OkrForm />
      </Modal>
      <OkrList okrList={okrList} />
    </div>
  );
};
export default Home;
