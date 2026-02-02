import OkrList from "./OkrList.tsx";
import type { OkrType } from "../types/okr-types.ts";
import { useEffect, useState } from "react";
import Header from "./Header.tsx";
import KeyResultListProvider from "../context/KeyResultListProvider.tsx";

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
    <KeyResultListProvider>
      <div className="w-full h-screen">
        <div className="w-full">
          <Header />
        </div>
        <div className="w-full p-4">
          <OkrList okrList={okrList} setOkrList={setOkrList} />
        </div>
      </div>
    </KeyResultListProvider>
  );
};
export default Home;
