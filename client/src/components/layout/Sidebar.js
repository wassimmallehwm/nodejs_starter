import React from 'react'
import { Link } from 'react-router-dom'
import Transition from '../utils/Transition'

const Sidebar = ({ isOpen, isLargeScreen, closeSidebar }) => {
    return (
        <Transition
            show={isLargeScreen || isOpen}
            enter="transition-all duration-500"
            enterFrom="-ml-56"
            enterTo="ml-0"
            leave="transition-all duration-500"
            leaveTo="-ml-56"
        >
            <aside className={`z-20 bg-white w-56 min-h-screen flex flex-col ${!isLargeScreen ? 'fixed' : ''}`}>
                <div className="bg-white border-r border-b px-4 h-14 flex items-center justify-between">
                    <Link to="/">
                        <span className="text-blue-300 py-2">
                            Application
                        </span>
                    </Link>
                    {
                        !isLargeScreen ? (
                            <button className="w-10 p-1"
                                onClick={closeSidebar}
                                title="Close menu"
                                tabIndex="1"
                            >
                                <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>) :
                            (<i></i>)
                    }
                </div>
                <div className="border-r flex-grow">
                    <nav>
                        <ul>
                            <Link to="users">
                                <li className="p-3 cursor-pointer rounded-sm hover:bg-gray-200">
                                    <span className="mx-4"> Users </span>
                                </li>
                            </Link>
                            <Link to="users">
                                <li className="p-3 cursor-pointer rounded-sm hover:bg-gray-200">
                                    <span className="mx-4"> Users </span>
                                </li>
                            </Link>
                            <Link to="users">
                                <li className="p-3 cursor-pointer rounded-sm hover:bg-gray-200">
                                    <span className="mx-4"> Users </span>
                                </li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </aside>
        </Transition>
    )
}

export default Sidebar
