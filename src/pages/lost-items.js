import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { LostItem } from '../api/requests';
import ItemSlide from '../components/item-slide';
import Info from '../components/info';
import { AiOutlineSearch } from 'react-icons/ai';
import LoadingPage from '../components/loading-page';

export default function LostItemsPage() {

  const [lostItems, setlostItems] = useState(null);
  const [searchTerm, setsearchTerm] = useState(null);
  const [loading, setloading] = useState(false);
  const [showSearch, setshowSearch] = useState(null);

  useEffect(() => {

    const getItems = async () => {

      setloading(true);
      try {

        const res = await axios.get(LostItem.getAll);
        console.log(res);
        setloading(false);

        setlostItems(res.data.body);

      } catch (error) {

        console.log("error in fetching data ", error);
        setloading(false);

      }
    }

    getItems();
  }, [])

  const searchItems = async (e) => {

    setloading(true);
    if (searchTerm !== "") setshowSearch(true);
    else setshowSearch(false);

    try {

      const res = await axios.post(LostItem.search, { searchTerm });
      if (res.status == 200) {

        setlostItems(res.data.body);
        console.log(res.data.body);
      }
      setloading(false);

    } catch (error) {
      console.log("error in searching ", error);
      setloading(false);

    }
  }

  // on clicking on enter
  const onEnter = async (e) => {

    if (e.key === 'Enter') {
      await searchItems();
    }
  }

  return (
    <>

      <div className='flex border-2 border-[#30437b] rounded w-fit m-auto my-5 shadow-xl items-center'>

        <input
          type="text"
          onChange={(e) => setsearchTerm(e.target.value)}
          value={searchTerm}
          onKeyDown={onEnter}
          className="outline-none ml-2 "
          placeholder="search for lost items"
        />
        <div className='bg-[#30437b] h-[100%] p-1 cursor-pointer' onClick={searchItems}>
          <AiOutlineSearch size={20} color='white' />
        </div>
      </div>

      <div>
        {
          searchTerm && showSearch ?
            <p className='font-semibold p-2 my-5 text-2xl ml-3 text-black'>Search results for <span className='text-[#30437b]'>{searchTerm}</span></p> :
            <div></div>
        }
      </div>

      <div className='relative lost-items-box md:grid grid-cols-3 gap-5 p-3 h-[100vh] overflow-y-scroll overflow-hidden '>
        <LoadingPage show={loading} />
        {
          lostItems && lostItems.map((ele, idx) => {

            return (
                <ItemSlide {...ele} key={idx} isFoundObj={false} creater={ele.owner} />  
            )
          })
        }
      </div>
    </>
  )
}
