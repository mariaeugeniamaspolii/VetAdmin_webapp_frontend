import { useState } from 'react'

import useAuth from '../hooks/useAuth';

import AdminNav from '../components/AdminNav';
import Alert from '../components/Alert';




const ChangePassword = () => {

    const {savePassword } = useAuth()

    const [alert, setAlert] = useState({})
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: ''
    })


    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some( val => val === '')){

            setAlert({
                msg: "All fields are required",
                type: 'error'
            })
            return 
        }
        if(password.newPassword.length < 6) {
            setAlert({
                msg: "Password must be at least 6 characters",
                type: 'error'
            })
            return
        }

        const response = await savePassword(password);
        setAlert(response);
    }
    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Change your {''}
                <span className="text-indigo-600 font-bold">Password here</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {alert && alert.msg && <Alert alert={alert} />}
                    <form
                        onSubmit={handleSubmit}>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="currentPassword"
                                placeholder="Enter your old password"
                                autoComplete="current-password"
                                onChange={e => setPassword({
                                    ...password, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">New Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="newPassword"
                                placeholder="Enter your new password"
                                autoComplete="new-password"
                                onChange={e => setPassword({
                                    ...password, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="update password"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword