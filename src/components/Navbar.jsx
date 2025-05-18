import React from 'react'

const Navbar = () => {
  return (
 <nav className='bg-white/5 backdrop-blur-md border-b border-white/10 mycontainer
 text-black'>
    <div className="mycontainer flex justify-between items-center">

    <div className="logo font-bold md:text-2xl text-xl">
        <span className='text-amber-700'>&lt;</span>
        Pass
        <span className='text-amber-700'>Protect/&gt;</span>
        </div>
    <ul className='hidden md:flex gap-8'>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
    </ul>
    <button className='text-black cursor-pointer flex gap-1.5 justify-around items-center w-fit rounded-full bg-amber-700 px-3 py-1 hover:border hover:bg-amber-600 '>
        <img src="./github.png" width={28} alt="github logo" />
        GitHub
    </button>
    </div>
 </nav>
  ) 
}

export default Navbar
