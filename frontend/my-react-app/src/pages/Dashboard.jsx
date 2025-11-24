import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Employees from './Employees'
import EmployeeForm from './EmployeeForm'
import Teams from './Teams'
import TeamForm from './TeamForm'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    const Navigate = useNavigate()
    
    return (
        <Routes>
            <Route path="" element={<Layout />}>
                <Route index element={<div className="card">
                    <h2>Human Resource Management System</h2>
                    <ul>
                        <li onClick={()=>Navigate('teams')}>GO To Teams </li>
                        <li onClick={()=>Navigate('employees')}>Go To Employees</li>
                    </ul>
                </div>} />
                
                <Route path="employees" element={<Employees />} />
                
                <Route path="employees/new" element={<EmployeeForm />} />
                <Route path="employees/:id" element={<EmployeeForm />} />
                <Route path="teams" element={<Teams />} />
                <Route path="teams/new" element={<TeamForm />} />
                <Route path="teams/:id" element={<TeamForm />} />
            </Route>
        </Routes>
    )
}