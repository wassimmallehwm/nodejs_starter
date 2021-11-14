import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Navbar from './Navbar'
import Overlay from './Overlay'
import Sidebar from './sidebar/Sidebar'

const Layout = ({
    sideBarOpen,
    openSidebar,
    closeSidebar,
    isLargeScreen,
    children
}) => {
    const { user } = useContext(AuthContext);
    return user ? (
        <>
            <div className="flex bg-gray-50">
                <Sidebar isOpen={sideBarOpen} closeSidebar={closeSidebar} isLargeScreen={isLargeScreen} />
                <Overlay isOpen={sideBarOpen} isLargeScreen={isLargeScreen} closeSidebar={closeSidebar} />
                <main className="flex-grow flex-col min-h-screen">
                    <Navbar openSidebar={openSidebar} isLargeScreen={isLargeScreen} />
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </>
    ) : children
}

export default Layout
