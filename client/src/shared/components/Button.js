import React from 'react'

const Button = ({ color, outline, children, ...props }) => {
    return outline ? (
        <button {...props} className={`text-${color}-500 border border-${color}-500 hover:bg-${color}-50 font-bold uppercase text-xs px-3 py-3 rounded-full shadow-lg hover:shadow-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`} type="button">
            {children}
        </button>
    ) : (
        <button {...props} className={`bg-${color}-400 text-white hover:bg-${color}-500 font-bold uppercase text-xs px-3 py-3 rounded-full shadow-lg hover:shadow-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`} type="button">
            {children}
        </button>
    )
}

export default Button
