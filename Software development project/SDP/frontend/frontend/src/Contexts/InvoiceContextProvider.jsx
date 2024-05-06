import { useState } from "react";
import { InvoiceContext } from "./Contexts";

export default function InvoiceContextProvider ({children}){
    const [equipmentObject,setEquipmentObject]=useState({});
    const [checkState,setCheckState]=useState(false);
    const [eqArray, setEqArray] = useState([]);

    
    return(
        <InvoiceContext.Provider value={{equipmentObject,setEquipmentObject,checkState,setCheckState,eqArray, setEqArray}}>
        {children}
        </InvoiceContext.Provider>
    )
}
