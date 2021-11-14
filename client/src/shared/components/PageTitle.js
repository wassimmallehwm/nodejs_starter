import React from 'react'

const PageTitle = ({color = 'primary', children}) => {
    return (
        <div className={`bg-${color}-300 rounded-md w-11/12 h-12 mx-auto my-4 flex justify-center items-center`}>
            <h4 className="text-white">
                {children}
            </h4>
        </div>
    )
}

export default PageTitle
