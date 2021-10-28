import React from 'react'

const UserForm = () => {
    return (
        <form action="" className="space-y-6">
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Identifiant
                </label>
                <input type="text" name="username"
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Mot de passe
                </label>
                <input type="password" name="password"
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            {/* <div className="flex items-center justify-between">
                <div>
                    <a href="#" className="font-medium text-sm text-blue-500">
                        Mot de passe oublié ?
                    </a>
                </div>
            </div> */}
        </form>
    )
}

export default UserForm
