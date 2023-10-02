import React, { useContext, useState } from 'react'
import { FoundItem, LostItem } from '../api/requests';
import axios from 'axios';
import { AppContext } from '../context/app-context';
import uploadImage from '../helpers/image-uploader';
import { toast } from 'react-toastify';
import LoadingPage from '../components/loading-page';
import { useNavigate } from 'react-router-dom';

export default function FoundItemRegisterPage() {

    const navigate = useNavigate();

    const [itemDetails, setitemDetails] = useState({foundBy_mobileNo:""});
    const [imgData, setimgData] = useState(null);
    const [loading, setloading] = useState(false);


    const { user } = useContext(AppContext);

    const onImageSelect = async (e) => {

        const file = e.target.files[0];

        if (file === undefined) {
            throw new Error("please select an undefined file....");
        }


        if (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg"
        ) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "lost_and_found_imgs");
            data.append("cloud_name", "drq4mkrvp");
            setimgData(data);
        }

    }

    const handleOnChange = (e) => {

        var name = e.target.name;
        var value = e.target.value;
        // console.log(value);
        setitemDetails({ ...itemDetails, [name]: value });
    }

    const isMobileNoValid = (number)=>{

        var s = String(number);
        return s.length===10;
    }

    const registerFoundItem = async () => {

        if((itemDetails.foundBy_mobileNo>1 && !isMobileNoValid(itemDetails.foundBy_mobileNo)) || !itemDetails.foundBy_roomNo || !itemDetails.name){
            toast.error(" enter valid details");
            return;
        }

        setloading(true);
        try {

            const imgUrl = await uploadImage(imgData);

            const res = await axios.post(FoundItem.register, { ...itemDetails, imgSrc: imgUrl ? imgUrl : "", foundBy: user._id });
            setloading(false);
            toast.success("your lost object created successfully..");

            navigate('/found-items');


        } catch (error) {
            setloading(false);

            console.log("error in registering the found item");
        }
    }

    return (
        <>
            <LoadingPage show={loading} />
            <div className='md:flex items-center justify-center lost-item-register-page py-3 h-screen'>

                <div className='border-2 p-5 shadow-2xl mt-2  md:w-[75%] h-fit  main backdrop-blur-xl'>

                    <div className=''>
                        <p className="font-bold text-xl">Add Item You Found 🔎</p>
                        <hr />

                        <div className="md:flex gap-5">

                            <div>

                                <div className=' my-4'>
                                    <label htmlFor="roomNo" className=' font-semibold text-gray-600'>*Your room no : </label>
                                    <input type="text" name='foundBy_roomNo' onChange={handleOnChange} placeholder='e.g. B109' className='w-full mt-3 rounded p-1 border border-gray-300 outline-none' />
                                </div>
                                <div className=' my-4'>
                                    <label htmlFor="mobileNo" className=' font-semibold text-gray-600'>Your mobile number : </label>
                                    <input type="number" name='foundBy_mobileNo' onChange={handleOnChange} placeholder='e.g. 9328598347' className='w-full mt-3 rounded p-1 border border-gray-300 outline-none' />
                                </div>

                                <div className=' my-4 '>
                                    <div className='h-[7.5rem] border-dashed rounded relative border-[3px] border-gray-500  w-full  md:flex justify-center items-center'>

                                        {!imgData ? (<div>
                                            <div>
                                                <p className="text-center font-semibold">Drag and Drop here </p>
                                                <p className='text-center font-bold'> or </p>
                                                <p className='text-center text-blue-500 font-semibold'>Browse files from your device</p>
                                            </div>
                                            <input type="file" onChange={onImageSelect} name='image' placeholder='Enter' className='cursor-pointer absolute w-full top-0 bottom-0 right-0 left-0 opacity-0 rounded p-2 py-3 border border-gray-300 outline-none' />
                                        </div>) : (
                                            <div>
                                                <img src="" alt="" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className=' '>
                                <div className=' my-4'>
                                    <label htmlFor="name" className=' font-semibold text-gray-600'>*What is the item : </label>
                                    <input type="text" name='name' onChange={handleOnChange} placeholder='e.g. phone, bag, laptop, earbuds, etc...' className='w-full mt-3 rounded p-1 border border-gray-300 outline-none' />
                                </div>
                                <div>
                                    <label htmlFor="desc" className=' font-semibold text-gray-600'>Describe about your item : </label>
                                    <textarea name="desc" id="" rows="3" onChange={handleOnChange} className='outline-none mt-2 p-1 w-full border border-gray-300 rounded'></textarea>
                                </div>
                                <div className=' my-4'>
                                    {/*<label htmlFor="location" className=' font-semibold text-gray-600'>Location : </label>
                                <input type="text" name='location' onChange={handleOnChange} placeholder='Enter' className='w-full mt-3 rounded p-1 border border-gray-300 outline-none' />*/}
                                    <select name="location" id="" onChange={handleOnChange} value={itemDetails?.location} className='outline-none w-full p-1 border rounded location-selector'>
                                        <option value="">--select lost location--</option>
                                        <option value="E-block">E-block</option>
                                        <option value="PI-block">PI-block</option>
                                        <option value="A-block">A-block</option>
                                        <option value="H-block">H-block</option>
                                        <option value="B-Mess">B-Mess</option>
                                        <option value="G-Mess">G-Mess</option>
                                        <option value="Canteen">Cantine</option>
                                        <option value="Ground">Ground</option>
                                        <option value="Campus">Campus</option>
                                        <option value="Boys Hostel">Boys Hostel</option>
                                        <option value="Girls Hostel">Girls Hostel</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button onClick={registerFoundItem} className='w-full p-2 rounded my-5 bg-[#30437b] hover:bg-[#2b3e76e8] text-white font-bold'>Add</button>

                    </div>
                </div>
            </div>
        </>
    )
} 
