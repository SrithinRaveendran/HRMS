import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listTeams, deleteTeam } from '../services/teams'
import Loading from '../components/Loading'

export default function Teams(){
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{(async ()=>{try{const data=await listTeams(); setItems(data)}catch(e){console.error(e)}finally{setLoading(false)}})()},[])

  if(loading) return <Loading />

  return (
    <div>
      <div className="header">
        <h2>Teams</h2>
        <Link to="/dashboard/teams/new" className="btn">New</Link>
      </div>
      <div className="card">
        <table className="table">
          <thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(t=>(
              <tr key={t.id}><td>{t.name}</td><td>{t.description}</td><td><Link to={`/dashboard/teams/${t.id}`} className="link">Edit</Link>{' | '}<button onClick={async()=>{if(confirm('Delete?')){await deleteTeam(t.id); location.reload()}}} className="btn ghost">Delete</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}