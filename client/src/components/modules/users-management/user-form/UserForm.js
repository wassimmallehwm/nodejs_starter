import React from 'react'

const UserForm = ({
    userData,
    onChange
}) => {
    const {username, firstname, lastname, email} = userData;
    return (
        <form action="" className="space-y-6">
        <div>
            <label className="text-sm font-bold text-gray-600 block">
                Username
            </label>
            <input type="text" name="username" value={username} onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Firstname
                </label>
                <input type="text" name="firstname" value={firstname} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Lastname
                </label>
                <input type="text" name="lastname" value={lastname} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Email
                </label>
                <input type="email" name="email" value={email} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
        </form>
    )
}

export default UserForm
