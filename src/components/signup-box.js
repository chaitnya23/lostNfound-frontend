import React, { useContext, useState } from 'react'
import { signInWithGoogle } from '../resources/firebase';
import { AppContext } from '../context/app-context';

export default function SignupBox({setisLogin}) {

  const { user, setuser, enableLoginPopup, setenableLoginPopup } = useContext(AppContext);

    const [roomNo, setroomNo] = useState(null);
    const [mobileNo, setmobileNo] = useState(null);

    const handleOnClick = async () => {

        
        try {
          await signInWithGoogle(setuser, setenableLoginPopup, roomNo, mobileNo, false);
    
        } catch (error) {
          console.log(error);
        }
      }
    return (
        <div className=''>
            <div className="flex gap-5">
            
                <div className=' my-4'>
                    <label htmlFor="roomNo" className=' font-semibold text-gray-600'>* Select roomNo : </label>
                    <input type="number" name='roomNo' onChange={(e) => setroomNo(e.target.value)} placeholder='Enter' className='w-full mt-3 rounded p-1 border border-gray-300 outline-none' />
                </div>
                <div className=' my-4'>
                    <label htmlFor="mobileNo" className=' font-semibold text-gray-600'>Mobile number : </label>
                    <input type="number" name='mobileNo' onChange={(e) => setmobileNo(e.target.value)} placeholder='Enter' className='w-full mt-3 rounded p-1 border border-gray-300 outline-none' />
                </div>
            </div>
            <div onClick={handleOnClick} className='py-2 my-3 bg-red-500 cursor-pointer font-bold flex gap-5 p-4 rounded text-white'>
                <p className='text-center'>Signup with google </p>
            </div>
            
          <p className='m-1 text-blue-500 font-semibold cursor-pointer' onClick={()=>setisLogin(true)}>already have an account ? login here</p>

        </div>
    )
}
