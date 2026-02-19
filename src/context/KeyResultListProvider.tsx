import { createContext, type ReactElement, useState } from "react";
import type { KeyResult } from "../types/okr-types.ts";


type KeyResultContextDefaultType = {
  keyResultsList: KeyResult[];
  keyResult: KeyResult;
  handleKeyResultAddition: (keyResult: KeyResult) => void;
  updateKeyResultList: (keyResultList: KeyResult[]) => void;
  deleteKeyResultInList: (keyResult: KeyResult) => void;
  updateKeyResultInList: (keyResult: KeyResult) => void;
  updateKeyResult : (keyResult: KeyResult) => void;
};

export const KeyResultListContext = createContext<KeyResultContextDefaultType>({
  keyResultsList: [],
  keyResult: { description: "", currentProgress: 0,targetProgress : 0,metric:"", isCompleted: false, id: "" ,objectiveId:"" },
  handleKeyResultAddition: () => {},
  updateKeyResultList : () => {},
  deleteKeyResultInList : () => {},
  updateKeyResultInList : () => {},
  updateKeyResult : () => {}
});

const KeyResultListProvider = ({ children }: { children: ReactElement }) => {
  const [keyResultsList, setKeyResultsList] = useState<KeyResult[]>([]);
  const [keyResult, setKeyResult] = useState<KeyResult>({
    description: "",
    id: "",
    isCompleted: false,
    currentProgress: 0,
    targetProgress: 0,
    metric:"",
    objectiveId:""
  });


  const handleKeyResultAddition = (updatedKeyResult: KeyResult): void => {
    if (!updatedKeyResult.currentProgress) {
      alert("Please Enter current progress");
      return;
    }
    if (!updatedKeyResult.targetProgress) {
      alert("Please Enter targetprogress");
      return;
    }
    if (!updatedKeyResult.description) {
      alert("Please Enter description");
      return;
    }
    if (!updatedKeyResult.metric) {
      alert("Please Enter metric");
      return;
    }

    if (!(updatedKeyResult.currentProgress >= 0 && updatedKeyResult.currentProgress <= updatedKeyResult.targetProgress)) {
      alert("Please Enter currentProgress less than or equal to targetProgress and greater than or equal to 0");
      return;
    }

    let isDone = false;

    setKeyResultsList(
      keyResultsList.map((keyResultCurr) => {
        if (keyResultCurr.id === updatedKeyResult.id) {
          isDone = true;
          return updatedKeyResult;
        }
        return keyResultCurr;
      }),
    );

    if (!isDone) {
      setKeyResultsList([...keyResultsList, { ...updatedKeyResult}]);
    }

    setKeyResult({
      description: "",
      id: "",
      isCompleted: false,
      currentProgress: 0,
      targetProgress: 0,
      metric:"",
      objectiveId:""
    });
  };

  const updateKeyResultList = (keyResultListNew: KeyResult[]) => {
      setKeyResultsList(keyResultListNew);
  }

  const updateKeyResultInList = (updatedKeyResult:KeyResult) =>{
     setKeyResultsList(keyResultsList.map(currKeyResult => {
            if(currKeyResult.id === updatedKeyResult.id) return updatedKeyResult;
            return currKeyResult;
     }))
  }

  const deleteKeyResultInList = (deletedKeyResult:KeyResult) =>{
    setKeyResultsList(keyResultsList.filter(currKeyResult => currKeyResult.id !== deletedKeyResult.id))
  }

  const updateKeyResult = (updatedKeyResult : KeyResult) =>{
     setKeyResult(updatedKeyResult);
  }

  return (
    <KeyResultListContext.Provider
      value={{
        keyResultsList,
        keyResult,
        handleKeyResultAddition,
        updateKeyResultList,
        deleteKeyResultInList,
        updateKeyResultInList,
        updateKeyResult
      }}
    >
      {children}
    </KeyResultListContext.Provider>
  );
};
export default KeyResultListProvider;
