import { useState } from "react";
import { InvoiceContext } from "./Contexts";

export default function InvoiceContextProvider ({children}){
    const [equipmentObject,setEquipmentObject]=useState({});
    
    return(
        <InvoiceContext.Provider value={{equipmentObject,setEquipmentObject}}>
        {children}
        </InvoiceContext.Provider>
    )
}
