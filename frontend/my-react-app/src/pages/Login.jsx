import React, { useState } from 'react'
import { login as apiLogin } from '../services/auth'
import { useAuth } from '../context/authContext'


export default function Login(){
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [loading,setLoading] = useState(false)
const { login } = useAuth()


const submit = async (e) =>{
e.preventDefault(); setLoading(true)
try{ const data = await apiLogin({ email, password }); login(data.token, data.user) }
catch(err){ alert(err?.response?.data?.message || 'Login failed') }
finally{ setLoading(false) }
}


return (
<div className="container">
<div className="card" style={{maxWidth:420, margin:'40px auto'}}>
<h2>Login</h2>
<form onSubmit={submit} style={{display:'grid',gap:8}}>
<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="btn">{loading? 'Logging...' : 'Login'}</button>
</form>
</div>
</div>
)
}