import React from 'react'
import Transition from '../utils/Transition'

const Overlay = ({ isOpen, isLargeScreen,closeSidebar }) => {
    return (
        <Transition
            show={!isLargeScreen && isOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-50"
            leaveTo="opacity-0">
            <div onClick={closeSidebar} className="fixed inset-0 bg-black opacity-0 z-10"></div>
        </Transition>
    )
}

export default Overlay
