import React from 'react'

const Navbar = () => {
  return (
 <nav className='bg-white/5 backdrop-blur-md border-b border-white/10 mycontainer
 text-black'>
    <div className="mycontainer flex justify-between items-center">

    <div className="logo font-bold text-2xl">
        <span className='text-amber-700'>&lt;</span>
        Pass
        <span className='text-amber-700'>Protect/&gt;</span>
        </div>
    <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
    </ul>
    </div>
 </nav>
  ) 
}

export default Navbar
