import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'


export default function Layout(){
const { user, logout } = useAuth()
return (
<div>
<header className="card header">
<div><strong>HRMS</strong></div>
<div style={{display:'flex',alignItems:'center',gap:12}}>
<div className="small">{user?.email}</div>
<button className="btn ghost" onClick={logout}>Logout</button>
</div>
</header>
<div className="container">
<Outlet />
</div>
</div>
)
}