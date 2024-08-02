"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

const Navbar = () => {
    const [nav, setNav] = useState(false)

    const handleNav = () =>{
        setNav(!nav)
    }
  return (
    
        <nav className='  h-[100px] px-4 mx-auto flex justify-between items-center'>

            <h1 className='text-3xl text-[#9d3306] font-bold primary-color ml-4 font-sans'>Get Recipe</h1>
            <ul className='hidden md:flex'>
                <li className='p-5'><Link href='/' className='hover:text-[#9d3306] font-medium'>Home</Link></li>
                <li className='p-5'><Link href='/category' className='hover:text-[#9d3306] font-medium' >Categories</Link></li>
                <li className='p-5'><Link href='/search' className='hover:text-[#9d3306] font-medium' >Search by Name</Link></li>
                <li className='p-5'><Link href='/alphabet' className='hover:text-[#9d3306] font-medium' >Search by Alphabet</Link></li>
            </ul>

            <div onClick={handleNav} className='block md:hidden mr-6'>
                {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
            </div>

            <div className={nav ? 'z-10 fixed h-full left-0 top-0 w-[60%] bg-[#e3ecec] ease-in-out duration-500' : 'fixed left-[-100%]'} onClick={handleNav}>
                <h1 className='text-3xl primary-color m-4 text-[#9d3306]'>Get Recipe</h1>
                <ul className='p-8 text-2xl'>
                    <li className='p-2'><Link href='/' className='hover:text-[#9d3306] font-medium'>Home</Link></li>
                    <li className='p-2'><Link href='/category' className='hover:text-[#9d3306] font-medium' >Categories</Link></li>
                    <li className='p-2'><Link href='/search' className='hover:text-[#9d3306] font-medium' >Search by Name</Link></li>
                    <li className='p-2'><Link href='/alphabet' className='hover:text-[#9d3306] font-medium' >Search by Alphabet</Link></li>
                </ul>
            </div>

        </nav>
    
  )
}

export default Navbar