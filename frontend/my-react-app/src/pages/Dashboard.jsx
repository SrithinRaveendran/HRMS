import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Employees from './Employees'
import EmployeeForm from './EmployeeForm'
import Teams from './Teams'
import TeamForm from './TeamForm'
export default function Dashboard() {
    return (
        <Routes>
            <Route path="" element={<Layout />}>
                <Route index element={<div className="card">Welcome to HRMS</div>} />
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