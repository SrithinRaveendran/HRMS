import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './authContext'


const AuthProvider = ({ children }) => {
const [token, setToken] = useState(localStorage.getItem('hrms_token'))
const [user, setUser] = useState(() => {
const raw = localStorage.getItem('hrms_user')
return raw ? JSON.parse(raw) : null
})
const navigate = useNavigate()


useEffect(() => { if (token) localStorage.setItem('hrms_token', token); else localStorage.removeItem('hrms_token') }, [token])
useEffect(() => { if (user) localStorage.setItem('hrms_user', JSON.stringify(user)); else localStorage.removeItem('hrms_user') }, [user])


const login = (t, u) => { setToken(t); setUser(u); navigate('/dashboard') }
const logout = () => { setToken(null); setUser(null); navigate('/login') }


return (
<AuthContext.Provider value={{ token, user, login, logout }}>
{children}
</AuthContext.Provider>
)
}


export default AuthProvider