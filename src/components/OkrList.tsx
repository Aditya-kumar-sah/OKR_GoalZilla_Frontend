import type { KeyResult, OkrType } from "../types/okr-types.ts";

interface OkrListPropsType {
  okrList: OkrType[];
}

const OkrList = ({ okrList }: OkrListPropsType) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full ">
      {okrList.map((okr, index) => (
        <div
          key={index}
          className="w-[60% flex flex-col items-center gap-2 bg-gray-200 p-2 rounded-md"
        >
          <div>Objective : {okr.objective}</div>

          <div>
            Key Results:
            <KeyResultList keyResultList={okr.keyResultList} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default OkrList;

const KeyResultList = ({ keyResultList }: { keyResultList: KeyResult[] }) => {
  return (
    <div>
      {keyResultList.map((keyResult, index) => {
        return (
          <div key={index} className="flex gap-2">
            <input type="checkbox" />
            <div className="flex flex-col gap-4">
              <div>Description: {keyResult.description}</div>
              <div>Progress: {keyResult.progress}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
