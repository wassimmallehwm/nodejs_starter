import React from 'react'

const Button = ({ color, children, ...props }) => {
    return (
        <button {...props} className={`bg-${color}-500 text-white active:bg-${color}-600 font-bold uppercase text-xs px-3 py-3 rounded-full shadow-lg hover:shadow-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`} type="button">
            {children}
        </button>
    )
}

export default Button
