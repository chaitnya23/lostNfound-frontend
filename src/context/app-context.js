import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../api/requests';

export const AppContext = createContext();

export default function AppContextWrapper({children}) {

    const [user, setuser] = useState(null);
    console.log(user);
    const [enableLoginPopup, setenableLoginPopup] = useState(true);

    
    useEffect(() => {
      const id = localStorage.getItem("_id");
      console.log("id ",id);
      if(!id) return;

      const getUser = async()=>{

        try {
          const res = await axios.get(`${User.sessionAuth}/${id}`);
          console.log("user is ",res);
          setuser(res.data);
          setenableLoginPopup(false);

        } catch (error) {
          console.log("error : ", error);
        }
      }

      getUser();
    }, [])
    

  return (
    <AppContext.Provider value={{user, setuser, enableLoginPopup, setenableLoginPopup}}>
        {children}
    </AppContext.Provider>
    
  )
}


