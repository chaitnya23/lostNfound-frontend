import React from 'react'
import FadeLoader  from "react-spinners/FadeLoader";

export default function LoadingPage({show}) {
  if(!show) return; 
  return (
    <div className="absolute top-0 bottom-0 z-50 right-0 left-0 backdrop-blur flex items-center justify-center">
        <div>
            <FadeLoader color='#30437b' loading={show} size={20}/>
        </div>
    </div>
  )
}
   