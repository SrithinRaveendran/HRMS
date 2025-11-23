import api from '../api/api'
export const listTeams = () => api.get('/api/teams').then(r=>r.data)
export const getTeam = (id) => api.get(`/api/teams/${id}`).then(r=>r.data)
export const createTeam = (payload) => api.post('/api/teams', payload).then(r=>r.data)
export const updateTeam = (id, payload) => api.put(`/api/teams/${id}`, payload).then(r=>r.data)
export const deleteTeam = (id) => api.delete(`/api/teams/${id}`).then(r=>r.data)
export const assignToTeam = (teamId, body) => api.post(`/api/teams/${teamId}/assign`, body).then(r=>r.data)
export const unassignFromTeam = (teamId, body) => api.delete(`/api/teams/${teamId}/unassign`, { data: body }).then(r=>r.data)