import React,{useState,useEffect} from "react";
import Img from '../asset/Login-img.png'

export default function AboutPage() {
  return (
    <div>
      <div>
        <div className="about-page-title p-2">
          <h1 className="text-3xl text-center p-2 font-bold">
            {" "}
            <span className="text-blue-500">Hello Students</span> @ IIITDWD ✨✨
          </h1>
        </div>
        <div className="p-4 border-2 rounded-md bg-gray-200 mx-8">
          <p>
            Welcome, fellow college mates! I've created this platform to address
            the common college issue of lost and found items. The goal is simple:
            to reunite people with their belongings easily and efficiently.
            Whether you've lost something valuable or found an item that doesn't
            belong to you, our user-friendly website is here to help. I value your
            feedback and cooperation, so together, we can make this platform even
            better. Let's work together to ensure that no one loses their
            belongings for long on our campus.
          </p>
          <p>
            This website is built to tackle the common college problem of lost and
            found items. websites use case is simple that is reuniting people with
            their belongings. Whether you've lost something or found an item, this
            user-friendly platform makes it easy to view or search for items.
          </p>
        </div>

        <div className="instructions">
          <div className="mx-8 p-3 border-2 rounded shadow my-3 border-l-blue-500">
            <p>
              You can register for the your lost item/item you found in the lost
              item page/found item page with necessary information .
            </p>
          </div>

          <div className="mx-8 p-3 border-2 rounded shadow my-3 border-l-blue-500">
            <p>
              If you don't see any information on your item on the internet after
              15 days, you can re-register. Lost or found items are only kept
              available for that short period of time.
            </p>
          </div>

          <div className="mx-8 p-3 border-2 rounded shadow my-3 border-l-blue-500">
            <p>
              If you lose something, look in the "found items" section to see if
              any other student have already located it or not. If so, get in
              touch with them so they may help you retrieve it, otherwise you can
              register your lost item.
            </p>
          </div>

          <div className="mx-8 p-3 border-2 rounded shadow my-3 border-l-blue-500">
            <p>
              Once you've located the lost item you previously reported, mark it as claimed on your item card by clicking the button.
            </p>
          </div>

          <div className="mx-8 p-3 border-2 rounded shadow my-3 border-l-blue-500">
            <p>
              Try to provide the essential feedback so we can improve our platform.
            </p>
          </div>
        </div>
      </div>


    </div>

  );
}



 