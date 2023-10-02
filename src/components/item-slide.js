import axios from 'axios'
import React, { useContext, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { MdCloudDone, MdLocationOn, MdEmail, MdHome } from 'react-icons/md'
import { FaMobileAlt } from 'react-icons/fa';
import { LostItem } from '../api/requests'
import { AppContext } from '../context/app-context'
import { toast } from 'react-toastify';
import NoImgPlaceholder from '../asset/No-Image-Placeholder.png';
import moment from 'moment';

export default function ItemSlide({ _id, name, desc, imgSrc, location, creater, claimed, createdAt, owner_roomNo, owner_mobileNo, isFoundObj }) {

    const { user } = useContext(AppContext);
    const [openDesModel, setopenDesModel] = useState(false);

    const handleMarkAsClaimed = async () => {

        if (user._id !== creater._id) {

            toast.error("you are not the owner of this item")
            console.log(user, creater._id);
            return;
        }
        try {

            const res = await axios.post(LostItem.claim, { userId: user._id, _id });

            if (res.status == 200) {
                //claimed
                toast.success(`you claimed your lost item - ${name} ...✅`);
                claimed = true;
                window.location.reload();
                // console.log(res);
            }
        } catch (error) {
            //display error
            toast.error("server error try again later");

        }
    }
    return (
        <div className='shadow-lg relative text-sm item-card h-fit rounded justify-evenly items-center py-2 p-3 border-2 font-semibold cursor-pointer mb-3 bg-gray-100'>

            <div onClick={() => setopenDesModel(!openDesModel)} className='absolute top-2 right-2 flex justify-center items-center h-5 w-5 rounded-full shadow bg-gray-700 text-center '>
                <p className="font-bold p-1 text-white">i</p>
            </div>

            {
                openDesModel && (

                    <div className="absolute top-7 -right-16 bg-gray-200 w-52 z-50 rounded shadow p-2">
                        <p className='text-sm font-mono'>{desc}</p>
                    </div>
                )
            }
            <div className='front'>
                <div className=" items-center gap-4">
                    <div className='img h-[11rem] bg-white rounded-md overflow-hidden'>
                        <img className="w-full h-full object-contain" src={`${(imgSrc !== null && imgSrc !== "") ? imgSrc : NoImgPlaceholder}`} alt="" />
                    </div>

                </div>
                <div className="">
                    <div className='flex items-center my-5 justify-between'>
                        <p className='text-lg'>
                            {name && name}
                        </p>
                        <p className='text-sm text-gray-700'>{moment(createdAt).format('MM-DD-YYYY')}</p>
                    </div>

                </div>

                <div>

                    <div className="flex items-center gap-3">
                        <FaUserAlt size={15} />
                        <p className='text-sm'>{creater && creater.name}</p>
                    </div>
                    <p>{creater && creater.mobileNo}</p>
                </div>

                <div className="flex items-center gap-3 my-3">
                    <MdEmail size={15} />
                    <p>{creater && creater.email}</p>
                </div>


                <div className="flex items-center gap-3 my-3">
                    <MdHome size={18} />
                    <p>{owner_roomNo}</p>
                </div>
                <div className="flex items-center gap-3 my-3">
                    <FaMobileAlt size={18} />
                    <p>{owner_mobileNo}</p>
                </div>


                <div className="flex items-center gap-3 my-3">
                    <MdLocationOn size={15} />
                    <p>
                        {location && location}
                    </p>
                </div>
            </div>
            {
                !claimed && !isFoundObj &&
                <button className='p-[3px] text-sm px-1 relative bottom-0 shadow rounded border-2 border-[#30437b] text-[#30437b] hover:bg-[#30437b] hover:text-white' onClick={handleMarkAsClaimed}>Mark as claimed</button>
            }
            {
                claimed &&
                <div className=' p-1 px-2 rounded mt-4 bg-green-400'>
                <p className='font-semibold font-mono'>This item is claimed by it's owner</p>
                </div>
            }

        </div>
    )
}
