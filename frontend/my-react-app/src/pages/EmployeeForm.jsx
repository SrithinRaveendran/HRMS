import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createEmployee, getEmployee, updateEmployee } from '../services/employees'
import Loading from '../components/Loading'
export default function EmployeeForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(!!id)
    const [form, setForm] = useState({
        first_name: '', last_name: '', email: '',
        phone: ''
    })
    useEffect(() => {
        if (!id) return; (async () => {
            try {
                const data = await
                    getEmployee(Number(id)); setForm(data)
            } catch (e) { console.error(e) }
            finally { setLoading(false) }
        })()
    }, [id])
    if (loading) return <Loading />
    const submit = async (e) => {
        e.preventDefault(); try {
            if (id) await
                updateEmployee(Number(id), form); else await createEmployee(form); navigate('/dashboard / employees')
        } catch (e) { alert('Error') }
    }
    return (
        <div className="card" style={{ maxWidth: 600 }}>
            <h3>{id ? 'Edit' : 'New'} Employee</h3>
            <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
                <input className="input" placeholder="First name"
                    value={form.first_name || ''} onChange={e => setForm({
                        ...form,
                        first_name: e.target.value
                    })} />
                <input className="input" placeholder="Last name"
                    value={form.last_name || ''} onChange={e => setForm({
                        ...form,
                        last_name: e.target.value
                    })} />
                <input className="input" placeholder="Email" value={form.email || ''}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                <input className="input" placeholder="Phone" value={form.phone || ''}
                    onChange={e => setForm({ ...form, phone: e.target.value })} />
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn">Save</button>
                    <button type="button" className="btn ghost" onClick={() => navigate('/dashboard / employees')}>Cancel</button>
                </div>
            </form>
        </div>
    )
}