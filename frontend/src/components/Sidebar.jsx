import React from 'react';
import { Link } from 'react-router-dom';
import waste from '../assets/Sidebar/waste.svg'
import home from '../assets/Sidebar/home.svg'
import book from '../assets/Sidebar/book.svg'
import friend from '../assets/Sidebar/friend.svg'
import map from '../assets/Sidebar/map.svg'
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className='fixed top-0 left-0 h-screen w-16 sidebar flex flex-col'>
      <Link to="/dashboard" className='my-5 w-10 mx-auto'>
        <img src={waste} alt="" />
        <div className='w-10 border-2 border-[#b3b1b1] my-1 '></div>
      </Link>
      <Link to="/dashboard" className='mt-10 w-7 mx-auto '>
        <img src={home} alt="" />
        {/* <div className='w-7 border-2 border-[#b3b1b1] my-1 '></div> */}
      </Link>
      <Link to="/dashboard" className='mt-10 w-7 mx-auto aaaaac'>
        <img src={book} alt="" />
        {/* <div className='w-7 border-2 border-[#b3b1b1] my-1 '></div> */}
      </Link>
      <Link to="/dashboard" className='mt-10 w-7 mx-auto aaaaac'>
        <img src={friend} alt="" />
        {/* <div className='w-7 border-2 border-[#b3b1b1] my-1 '></div> */}
      </Link>
      <Link to="/dashboard" className='mt-10 w-9 mx-auto aaaaac'>
        <img src={map} alt="" />
        {/* <div className='w-7 border-2 border-[#b3b1b1] my-1 '></div> */}
      </Link>
    </div>
  );
}

export default Sidebar;
