import { KeyResultsContext } from "../context/KeyResultProvider.tsx";
import { useContext } from "react";

const KeyResultsList = () => {
  const { keyResultsList } = useContext(KeyResultsContext);

  return (
    <>
      {keyResultsList?.map((keyResult, index) => {
        return (
          <div key={index} className="flex justify-around px-4 py-2">
            <span>{keyResult.description}</span>
            <span>{keyResult.progress}</span>
          </div>
        );
      })}
    </>
  );
};
export default KeyResultsList;
