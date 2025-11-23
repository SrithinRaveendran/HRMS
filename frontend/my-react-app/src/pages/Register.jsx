import React, { useState } from 'react'
import { register as apiRegister } from '../services/auth'
import { useAuth } from '../context/authContext'
export default function Register() {
    const [orgName, setOrgName] = useState('')
    const [adminName, setAdminName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const submit = async (e) => {
        e.preventDefault()
        try {
            const data = await apiRegister({
                orgName, adminName, email,
                password
            }); login(data.token, data.user)
        }
        catch (err) { alert(err?.response?.data?.message || 'Register failed') }
    }
    return (
        <div className="container">
            <div className="card" style={{ maxWidth: 520, margin: '40px auto' }}>
                <h2>Create organisation</h2>
                <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
                    <input className="input" placeholder="Organisation name"
                        value={orgName} onChange={e => setOrgName(e.target.value)} />
                    <input className="input" placeholder="Admin name" value={adminName}
                        onChange={e => setAdminName(e.target.value)} />
                    <input className="input" placeholder="Email" value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input className="input" placeholder="Password" type="password"
                        value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn">Create</button>
                </form>
            </div>
        </div>
    )
}
