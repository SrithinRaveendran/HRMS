import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listEmployees, deleteEmployee } from '../services/employees'
import Loading from '../components/Loading'

export default function Employees(){
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{(async ()=>{try{const data=await listEmployees(); setItems(data)}catch(e){console.error(e)}finally{setLoading(false)}})()},[])

  if(loading) return <Loading />

  return (
    <div>
      <div className="header">
        <h2>Employees</h2>
        <Link to="/dashboard/employees/new" className="btn">New</Link>
      </div>
      <div className="card">
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(emp=> (
              <tr key={emp.id}>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>
                  <Link to={`/dashboard/employees/${emp.id}`} className="link">Edit</Link>
                  {' | '}
                  <button className="btn ghost" onClick={async()=>{if(confirm('Delete?')){await deleteEmployee(emp.id); location.reload()}}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}