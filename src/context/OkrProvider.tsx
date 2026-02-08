import {createContext, type ReactNode, useState} from "react";
import type {KeyResult, OkrType} from "../types/okr-types.ts";


interface OkrContextType {
    okrList : OkrType[];
    updateOkrList : (okr:OkrType) => void;
    addOkrList : (okrList : OkrType[]) => void;
    deleteOkr : (okrId:string) => void;
    updateOkr : (updatedOkr:{title:string,id:string}) => void;
    updateEachOkrWithGivenKeyResultList : (keyResultList : KeyResult[],objectiveId : string) => void;
}

export const OkrListContext = createContext<OkrContextType>({
    okrList : [],
    updateOkrList : () => {},
    addOkrList : () => {},
    deleteOkr : () => {},
    updateOkr : () => {},
    updateEachOkrWithGivenKeyResultList : () => {}
});

const OkrListProvider = ({ children }: { children: ReactNode }) => {
    const [okrList, setOkrList] = useState<OkrType[]>([]);
    const updateOkrList = (okr:OkrType) =>{
        setOkrList([...okrList,okr]);
    }

    const addOkrList = (updateOkrList:OkrType[]) =>{
        setOkrList(updateOkrList);
    }

    const deleteOkr = (okrId:string) =>{
        setOkrList(okrList.filter(currOkr=>currOkr.id !== okrId));
    }

    const updateOkr = (updatedOkr: {title:string,id:string}) =>{
        let isDone = false;
        setOkrList(okrList.map(currOkr => {
            if(currOkr.id === updatedOkr.id){
                currOkr.title = updatedOkr.title;
                isDone = true;
            }
            return currOkr;
        }))

        if(!isDone){
            setOkrList([...okrList,{...updatedOkr,keyResult:[]}])
        }
    }

    const updateEachOkrWithGivenKeyResultList = (keyResultList : KeyResult[],okrId:string) =>{
        setOkrList(okrList.map(currOkr => {
            if(currOkr.id === okrId){
                currOkr.keyResult = keyResultList;
            }
            return currOkr;
        }))
    }


    return (
        <OkrListContext.Provider
            value={{
                okrList,
                updateOkrList,
                addOkrList,
                deleteOkr,
                updateOkr,
                updateEachOkrWithGivenKeyResultList
            }}
        >
            {children}
        </OkrListContext.Provider>
    );
};
export default OkrListProvider;
