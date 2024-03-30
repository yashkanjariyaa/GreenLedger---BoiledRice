import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {setIndex} from '../slices/generalSlice'

import waste from '../assets/Sidebar/waste.svg'
import home from '../assets/Sidebar/home.svg'
import book from '../assets/Sidebar/book.svg'
import qrcodelogo from '../assets/Sidebar/qrcodelogo.svg'
import map from '../assets/Sidebar/map.svg'
import './sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.counter.index);
  return (
    <div className='fixed top-0 left-0 h-screen w-16 sidebar flex flex-col'>
      <Link to="/dashboard" className='my-5 w-10 mx-auto'>
        <img src={waste} alt="" />
        <div className='w-10 border-2 border-[#b3b1b1] my-1 '></div>
      </Link>
      <Link to="/dashboard" className='mt-10 w-7 mx-auto ' onClick={()=>dispatch(setIndex(1))}>
        <img src={home} alt="" />
        {currentIndex==1 && <div className='w-7 border-2 border-[#292929] my-1 '></div> }
      </Link>
      <Link to="/learn" className='mt-10 w-7 mx-auto' onClick={()=>dispatch(setIndex(2))}>
        <img src={book} alt="" />
        {currentIndex==2 && <div className='w-7 border-2 border-[#292929] my-1 '></div> }
      </Link>
      <Link to="/qrcode" className='mt-10 w-7 mx-auto' onClick={()=>dispatch(setIndex(3))}>
        <img src={qrcodelogo} alt="" />
        {currentIndex==3 && <div className='w-7 border-2 border-[#292929] my-1 '></div> }
      </Link>
      <Link to="/location" className='mt-10 w-9 mx-auto' onClick={()=>dispatch(setIndex(4))} >
        <img src={map} alt="" />
        {currentIndex==4 && <div className='w-9 border-2 border-[#292929] my-1 '></div> }
      </Link>
      <Link to="/scan" className='mt-10 w-9 mx-auto' onClick={()=>dispatch(setIndex(4))} >
        <img src={qrcodelogo} alt="" />
        {currentIndex==4 && <div className='w-9 border-2 border-[#292929] my-1 '></div> }
      </Link>
    </div>
  );
}

export default Sidebar;
