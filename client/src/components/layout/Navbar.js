import React, { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FaBars } from 'react-icons/fa'
import { AuthContext } from '../../contexts/AuthContext'
import { userImage } from '../../utils/file-path/imagePath'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = ({ openSidebar, isLargeScreen }) => {

    const { user, logout } = useContext(AuthContext);
    const imge = "https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/241566094_1675822865945941_1790686832498347812_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=VQWyoCXgWAUAX8VCtnf&tn=N2c7axIQ3ZpazqKv&_nc_ht=scontent.ftun16-1.fna&oh=a17dd24b692f9f6f1580b319dee2aa9a&oe=6198B0D2";
    const userNavigation = [
        { name: 'Your Profile', click: logout },
        { name: 'Settings', click: logout },
        { name: 'Sign out', click: logout },
    ]
    return (
        <header className="bg-primary-400 border-b h-14 flex items-center justify-center">
            <div className="flex flex-grow items-center justify-between px-3">
                {
                    !isLargeScreen ? (
                        <button className="w-10 p-1"
                            onClick={openSidebar}
                            title="Toggle menu"
                            tabIndex="1"
                        >
                            <FaBars className="text-white" size="25px" />
                        </button>) :
                        (<i></i>)
                }
                <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={userImage(user.imagePath)} alt="" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <a
                                            onClick={item.click}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    )
}

export default Navbar
