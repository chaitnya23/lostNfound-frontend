import React, { useContext } from "react";
import { AppContext } from "../context/app-context";
import { signInWithGoogle } from '../resources/firebase';
import { AiOutlineSearch,AiOutlineMenu } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { toast } from "react-toastify";


export default function Navbar({setopenSideBar}) {
  //context api
  const { user, setuser } = useContext(AppContext);

  const logoutUser = ()=>{
    localStorage.removeItem("_id");
    setTimeout(() => {
      
      toast.success("logged out successfully...✅");
    }, 1000);
    window.location.reload();
  }
  return (
    <div className="flex  justify-end py-4 shadow-md">
   

      <div className="flex gap-1 items-center mr-3">
   
        <div className="my-auto  gap-3 h-9 w-9 mr-3 rounded-full border-2 overflow-hidden">
          <img
            src={user && user.profilePic}
            className="h-full w-full rounded-full"
            alt=""
          />
        </div>
        
        <FiLogOut className="cursor-pointer" size={23} onClick={logoutUser}/>
        <AiOutlineMenu className="cursor-pointer md:hidden block" size={23} onClick={()=>setopenSideBar(true)}/>

      </div>
    </div>
  );
}
