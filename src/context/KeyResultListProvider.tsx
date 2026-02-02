import { createContext, type ReactElement, useState } from "react";
import type { KeyResult } from "../types/okr-types.ts";
import { v4 as uuidv4 } from "uuid";

type KeyResultContextDefaultType = {
  keyResultsList: KeyResult[];
  keyResult: KeyResult;
  handleKeyResultAddition: (keyResult: KeyResult) => void;
  handleKeyResultUpdation: (keyResultList: KeyResult[]) => void;
  handleKeyResultDeletion: (keyResultId: string) => void;
  handleKeyResultCheckBox: (keyResultId: string) => void;
  addKeyResultToFormHandler: (keyResult: KeyResult) => void;
};

export const KeyResultListContext = createContext<KeyResultContextDefaultType>({
  keyResultsList: [],
  keyResult: { description: "", progress: 0, isCompleted: false, id: "" },
  handleKeyResultAddition: () => {},
  handleKeyResultUpdation: () => {},
  handleKeyResultDeletion: () => {},
  handleKeyResultCheckBox: () => {},
  addKeyResultToFormHandler: () => {},
});

const KeyResultListProvider = ({ children }: { children: ReactElement }) => {
  const [keyResultsList, setKeyResultsList] = useState<KeyResult[]>([]);
  const [keyResult, setKeyResult] = useState<KeyResult>({
    description: "",
    id: "",
    isCompleted: false,
    progress: 0,
  });

  const addKeyResultToFormHandler = (keyResult: KeyResult) => {
    setKeyResult(keyResult);
    console.log("reached");
  };

  const handleKeyResultAddition = (keyResult: KeyResult): void => {
    if (!keyResult.progress) {
      alert("Please Enter progress");
      return;
    }
    if (!keyResult.description) {
      alert("Please Enter description");
      return;
    }

    if (!(keyResult.progress >= 0 && keyResult.progress <= 100)) {
      alert("Please Enter progress between 0 and 100 percentage");
      return;
    }

    let isDone = false;

    setKeyResultsList(
      keyResultsList.map((keyResultCurr) => {
        if (keyResultCurr.id === keyResult.id) {
          isDone = true;
          return keyResult;
        }
        return keyResultCurr;
      }),
    );

    if (!isDone) {
      setKeyResultsList([...keyResultsList, { ...keyResult, id: uuidv4() }]);
    }

    setKeyResult({
      description: "",
      id: "",
      isCompleted: false,
      progress: 0,
    });
  };

  const handleKeyResultDeletion = (keyId: string): void => {
    const newKeyResultList = keyResultsList.filter((keyResult: KeyResult) => {
      return keyResult.id !== keyId;
    });

    setKeyResultsList(newKeyResultList);
  };
  const handleKeyResultCheckBox = (keyId: string): void => {
    const newKeyResultList = keyResultsList.map((keyResult: KeyResult) => {
      if (keyResult.id === keyId) {
        keyResult.isCompleted = !keyResult.isCompleted;
      }

      return keyResult;
    });

    setKeyResultsList(newKeyResultList);
  };

  const handleKeyResultUpdation = (keyResultList: KeyResult[]): void => {
    setKeyResultsList(keyResultList);
  };

  return (
    <KeyResultListContext.Provider
      value={{
        keyResultsList,
        keyResult,
        handleKeyResultAddition,
        handleKeyResultUpdation,
        handleKeyResultDeletion,
        handleKeyResultCheckBox,
        addKeyResultToFormHandler,
      }}
    >
      {children}
    </KeyResultListContext.Provider>
  );
};
export default KeyResultListProvider;
