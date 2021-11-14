import { Transition } from '@headlessui/react'
import React, { useState } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SidebarAccordion = ({
    label,
    items
}) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div>
            <li onClick={() => setCollapsed(prev => !prev)} className="p-3 flex justify-between items-center cursor-pointer rounded-sm hover:bg-gray-200">
                <span className="mx-4"> {label} </span>
                {collapsed ? (<FaChevronDown />) : (<FaChevronRight />)}
            </li>
            <Transition
                show={collapsed}
                enter="transition-all duration-500"
                enterFrom={`-mt-[${items.length * 40.33}]`}
                enterTo="mt-0"
                leaveFrom="mt-0"
                leaveTo={`-mt-[${items.length * 40.33}]`}
            >
                <ul className="px-2">
                    {
                        items.map((elem, i) => {
                            return elem.type == "ACCORDION" ? (
                                <SidebarAccordion key={i} items={elem.children} label={elem.label}/>
                            ) : (
                                <Link key={i} to={elem.route}>
                                    <li className="p-3 cursor-pointer rounded-sm hover:bg-gray-200">
                                        <span className="mx-4"> {elem.label} </span>
                                    </li>
                                </Link>
                            )
                            
                        })
                    }
                </ul>
            </Transition>
        </div>
    )
}

export default SidebarAccordion
