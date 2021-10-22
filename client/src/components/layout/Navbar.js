import React from 'react'
import { FaBars } from 'react-icons/fa'

const Navbar = ({ openSidebar, isLargeScreen }) => {
    return (
        <header className="bg-white border-b h-10 flex items-center justify-center">
            <div className="flex flex-grow items-center justify-between px-3">
                {
                    !isLargeScreen ? (
                    <button className="w-10 p-1"
                        onClick={openSidebar}
                        title="Toggle menu"
                        tabIndex="1"
                    >
                        <FaBars size="25px"/>
                    </button>) :
                    (<i></i>)
                }
                <button className="text-blue-700">
                    Login
                </button>
            </div>
        </header>
    )
}

export default Navbar
