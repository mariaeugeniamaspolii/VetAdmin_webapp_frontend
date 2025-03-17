import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('apv_token')
            if (!token) {
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }

            try {
                const { data } = await axiosClient('/veterinarians/profile', config)
                setAuth(data)
            } catch (error) {
                console.log('error: ', error);
                setAuth({})
            }
            setLoading(false)
        }
        authenticateUser()
    }, [])

    const logout = () => {
        localStorage.removeItem('apv_token')
        setAuth({})
    }

    const updateProfile = async data => {
        const token = localStorage.getItem('apv_token')
        if (!token) {
            setLoading(false)
            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        try {
            const url = `/veterinarians/profile/${data._id}`
            // console.log('data: ', data);
            // console.log('url: ', url);
            const response = await axiosClient.put(url, data, config)
            return {
                msg: 'Changes saved successfully',
                type: 'success'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                type: "error"
            }
        }
    }

    const savePassword = async (data) => {
        const token = localStorage.getItem('apv_token')
        if (!token) {
            setLoading(false)
            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }

        try {
            const url = 'veterinarians/update-password'

            const resp  = await axiosClient.put(url, data, config)
            console.log("Success", data)
            console.log("Success", data.msg)
            return {
                msg: resp.data.msg,
                type: 'success'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                type: 'error'

            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logout,
                updateProfile,
                savePassword
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;