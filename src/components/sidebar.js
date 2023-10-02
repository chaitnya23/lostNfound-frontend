import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillRightCircle, AiFillLeftCircle, AiOutlineMenu } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

export default function Sidebar({ openSideBar, setopenSideBar }) {

    const [expand, setexpand] = useState(true);

    // for mobile web view
    if (!openSideBar && window.innerWidth <= 900) return;

    return (
        <div className={`md:h-[131vh]  z-50 md:relative absolute overflow-hidden bottom-0 top-0 transition-all duration-200  ${expand ? "md:w-[18%] w-full" : "w-0"} text-white md:block  bg-[#30437b] `}>

            <div className="absolute right-4 cursor-pointer md:hidden block top-2">
                <MdCancel size={30} onClick={() => setopenSideBar(false)} />
            </div>
            <div className=" rounded-full md:block hidden cursor-pointer top-2 absolute -right-7 bg-gray-800 " onClick={() => setexpand(!expand)}>
                {!expand ? <AiFillRightCircle size={30} /> : <AiFillLeftCircle size={30} />}
            </div>

            <p className="text-2xl font-bold my-8 text-center rounded-lg mx-4 border-2 border-white">lost<span className='text-4xl text-orange-400'>N</span>found</p>

            <div className="opt-list">

                <div className='flex py-2 gap-2 my-2  justify-center'>
                    <Link to={"lost-items"}>
                        <p className='font-semibold'>Lost Items</p>
                    </Link>
                </div>

                <div className='flex py-2 gap-2 my-2  justify-center'>
                    <Link to={"found-items"}>
                        <p className='font-semibold'>Found Items</p>
                    </Link>
                </div>

                <div className='flex py-2 gap-2 my-2  justify-center'>
                    <Link to={"lost-item-register"}>
                        <p className='font-semibold'>Register lost item</p>
                    </Link>
                </div>

                <div className='flex py-2 gap-2 my-2  justify-center'>
                    <Link to={'found-item-register'}>
                        <p className='font-semibold'>Register found item</p>
                    </Link>
                </div>

                <div className='flex py-2 gap-2 my-2  justify-center'>
                    <Link to={'/'}>
                        <p className='font-semibold'>About</p>
                    </Link>
                </div>

                <div className='flex py-2 gap-2 my-2  justify-center'>
                    <Link to={'feedback'}>
                        <p className='font-semibold'>Feedback</p>
                    </Link>
                </div>

            </div>
        </div>
    )
}
