import React, { useContext, useState } from 'react'
import LoginImgSrc from '../asset/Login-img.png'
import { AppContext } from '../context/app-context';
import { signInWithGoogle } from '../resources/firebase';
import SignupBox from './signup-box';
import { User } from '../api/requests';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function LoginPopup() {

  const { user, setuser, enableLoginPopup, setenableLoginPopup } = useContext(AppContext);
  const [roomNo, setroomNo] = useState(null);
  const [mobileNo, setmobileNo] = useState(null);
  const [isLogin, setisLogin] = useState(false);

  if (!enableLoginPopup) return;

  const handleOnClick = async () => {
    
    try {
      const googleUser = await signInWithGoogle(setuser,setenableLoginPopup);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center backdrop-blur-lg z-[100]'>
      <div className="p-5 bg-white border shadow-2xl">
        <p className="font-bold text-center text-2xl">Oooops.. you haven't logged in yet...</p>
        <img src={LoginImgSrc} className='w-[25rem] h-[15rem]' alt="" />

          <div>
            <div onClick={handleOnClick} className='py-2 my-3 bg-red-500 cursor-pointer font-bold flex gap-5 p-4 rounded text-white'>
              <p className='text-center'>continue with google </p>
            </div>
           
          </div>
        <span className='float-right text-xs text-gray-500'>* Use collage email id only</span>
      </div>
    </div>
  )
}


