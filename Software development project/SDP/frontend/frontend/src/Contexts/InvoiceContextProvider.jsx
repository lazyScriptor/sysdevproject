import { useState } from "react";
import { InvoiceContext } from "./Contexts";

export default function InvoiceContextProvider ({children}){
    const [equipmentObject,setEquipmentObject]=useState({});
    const [checkState,setCheckState]=useState(false);
    
    return(
        <InvoiceContext.Provider value={{equipmentObject,setEquipmentObject,checkState,setCheckState}}>
        {children}
        </InvoiceContext.Provider>
    )
}
