import api from '../api/api'
export function register(payload) { 
    return api.post('/api/auth/register', payload).then(r => r.data) }
export function login(payload) { 
    return api.post('/api/auth/login', payload).then(r => r.data) }