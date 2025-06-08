import React from 'react'

const Navbar =()=>{
    return(
       <nav className='flex justify-between bg-violet-900 text-white py-2'>
            <div className='logo'>
                <span className='font-bold text-xl mx-8'>TaskMate</span>
            </div>
            <ul className='flex gap-8 mx-9'>
                <li className='cursor-pointer hover:font-bold tansition-all '>Home</li>
                <li className='cursor-pointer hover:font-bold tansition-all '>Your Tasks</li>
            </ul>
       </nav>
    )
}

export default Navbar