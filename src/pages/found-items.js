import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { FoundItem, LostItem } from '../api/requests';
import ItemSlide from '../components/item-slide';
import Info from '../components/info';
import { AiOutlineSearch } from 'react-icons/ai';
import LoadingPage from '../components/loading-page';

export default function FoundItemsPage() {

  const [foundItems, setfoundItems] = useState(null);
  const [searchTerm, setsearchTerm] = useState(null);
  const [loading, setloading] = useState(false);


  useEffect(() => {

    const getItems = async () => {

      setloading(true);
      try {

        const res = await axios.get(FoundItem.getAll);
         console.log(res);
        setloading(false);

        setfoundItems(res.data.body);

      } catch (error) {

        console.log("error in fetching data ", error);
        setloading(false);

      }
    }

    getItems();
  }, [])

  const handleOnChange = async (e) => {


    const val = e.target.value;
    setloading(true);
    setsearchTerm(val);
    try {

      const res = await axios.post(FoundItem.search, { searchTerm: val });
      if (res.status == 200) {

        setfoundItems(res.data.body);
        console.log(res.data.body);
      }
      setloading(false);

    } catch (error) {
      console.log("error in searching ", error);
      setloading(false);
    }
  }


  return (
    <>

      <div className='flex border-2 border-[#30437b] rounded w-fit m-auto my-5 shadow-xl items-center'>

        <input
          type="text"
          onChange={handleOnChange}
          value={searchTerm}
          className="outline-none ml-2 "
          placeholder="search for found items"
        />
        <div className='bg-[#30437b] h-[100%] p-1' >
          <AiOutlineSearch size={20} color='white' />
        </div>
      </div>

      <div>
        {
          searchTerm ?
            <p className='font-semibold p-2 my-5 text-2xl ml-3 text-black'>Search results for <span className='text-[#30437b]'>{searchTerm}</span></p> :
            <div></div>
        }
      </div>

      <div className='lost-items-box md:grid grid-cols-3 gap-5 p-3 h-[100vh] overflow-y-scroll overflow-hidden '>
        <LoadingPage show={loading} />
        {
          foundItems && foundItems.map((ele, idx) => {

            return (
              <ItemSlide {...ele} key={idx} isFoundObj owner_roomNo={ele.foundBy_roomNo} owner_mobileNo={ele.foundBy_mobileNo} owner={ele.foundBy}/>
            )
          })
        }
      </div>
    </>
  )
}
