import { Children, createContext, useState } from "react";
import { HElement } from "../assets/asset";

  export const AppContext=createContext();

 export default function AppContextProvider({children}){
     const [headerData, setHeaderData] = useState({
        title: HElement.hero,
       subtitle: HElement.heroTitle
     });
     const [islogin,setIsLogin]=useState(false);
     const [user,setUser]=useState(null);
     const [showModel,setShowModel]=useState(false);
     const [authLoading,setAuthLoading]=useState(true);
     const [edittask,setEdittask]=useState(null);




    return(
         <AppContext.Provider value={
            {headerData,setHeaderData,islogin,
               setIsLogin,user,setUser,setShowModel,showModel,
               authLoading,setAuthLoading,
            edittask,setEdittask}
         }>
         {children}
         </AppContext.Provider>
    )
}