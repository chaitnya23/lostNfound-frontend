import React, { useContext, useState } from 'react'
import smile from '../asset/smile.svg';
import mostache from '../asset/mostache.svg';
import angel from '../asset/angel.svg';
import heart from '../asset/heart.svg';
import unready from '../asset/unready.svg';
import axios from 'axios';
import { FeedBackReq } from '../api/requests';
import { toast } from 'react-toastify';
import {AppContext} from '../context/app-context';
import { useNavigate } from 'react-router-dom';

export default function Feedback() {

    const {user} = useContext(AppContext);
    const icons = [unready,smile,mostache,angel,heart];
    const [ratingIcon, setratingIcon] = useState(4);
    const [feedbackInfo, setfeedbackInfo] = useState({userEmail:user?.email});
    const navigate = useNavigate();
    // console.log("user ",user);

    const sendfeedback = async()=>{

        if(!feedbackInfo.rating && !feedbackInfo.context && feedbackInfo.context==""){
            toast.error("fill the information correctly..")
        }
        try{
            const data = await axios.post(FeedBackReq.add,{...feedbackInfo});
            toast.success('thanks for the feedback 😌');
        }catch(e){

            console.log(e);
        }
    }

    const handleIconChange = (i)=>{
        setratingIcon(i);
        setfeedbackInfo({...feedbackInfo, rating:i+1});
    }
    return (
        <div className='flex justify-center items-center'>

            <div className="feedback-form w-[50%] border shadow-xl bg-gray-100 mt-16 rounded p-3 py-8">

            <p className="font-semibold text-center my-2 text-2xl text-[#30437b]">Rate us</p>
                <div className='flex gap-5 justify-center'>
                    {
                        icons.map((ele,idx) => {
                            return (
                                <img src={ele} key={idx} onClick={()=>handleIconChange(idx)} className={`cursor-pointer rounded w-16 h-16 ${ratingIcon===idx?"border-4 border-red-600":""}`} alt="" />
                            )
                        })
                    }
                </div>
                <div>
                </div>
                <p className=" my-3 text-4xl font-semibold text-[#30437b]">feed back</p>

                <div>
                    <label htmlFor="feedback" className=' font-semibold text-gray-800'>
                        Do you have any thoughts to share ?
                    </label>
                    <textarea onChange={(e)=>setfeedbackInfo({...feedbackInfo,context:e.target.value})} value={feedbackInfo.context} className='w-full border-2 my-3 outline-blue-700' name="feedback" id="" rows="6"></textarea>
                </div>

                <div className="flex justify-between">
                    <button onClick={sendfeedback} className='w-[30%] font-xl rounded-md py-2 bg-[#30437b] text-white '>Send</button>
                    <button onClick={()=>navigate('/lost-items')} className='w-[30%] font-xl rounded-md py-2 bg-red-600 text-white '>Cancel</button>

                </div>
            </div>
        </div>
    )
}
