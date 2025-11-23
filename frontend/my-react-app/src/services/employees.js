import api from '../api/api'
export const listEmployees = () => api.get('/api/employees').then(r=>r.data)
export const getEmployee = (id) => api.get(`/api/employees/${id}`).then(r=>r.data)
export const createEmployee = (payload) => api.post('/api/employees', payload).then(r=>r.data)
export const updateEmployee = (id, payload) => api.put(`/api/employees/${id}`, payload).then(r=>r.data)
export const deleteEmployee = (id) => api.delete(`/api/employees/${id}`).then(r=>r.data)