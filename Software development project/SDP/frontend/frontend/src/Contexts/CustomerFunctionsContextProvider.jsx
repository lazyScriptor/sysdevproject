import React, { useState } from "react";
import {CustomerFunctionsContext} from "./CustomerPopupContext";

export default function CustomerFunctionsContextProvider({children}){
    const [nameee,setNameee]=useState("initial");

    
    return(
        <>
            <CustomerFunctionsContext.Provider value={{nameee,setNameee}}>
                {children}
            </CustomerFunctionsContext.Provider>
        </>
    )
}