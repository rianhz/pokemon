import React from "react";
import { BiSolidSad } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-200'>
      <BiSolidSad className='text-[7rem]' />
      <p className='font-bold'>Sorry, not found!</p>
    </div>
  );
};

export default NotFound;
