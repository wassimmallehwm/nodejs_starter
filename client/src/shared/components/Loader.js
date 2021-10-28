import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'

const Loader = () => {
    return (
        <div className="w-full h-full fixed block top-14 left-0 bg-white opacity-75 z-2">
            <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-[50%]">
                <FaCircleNotch className="animate-spin" size="42px"/>
            </span>
        </div>
    )
}

export default Loader
