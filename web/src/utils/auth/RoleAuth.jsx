import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function RoleAuthRoute({ role }) {
    return (
        role === 'admin' ? <Outlet /> : <Navigate to='/' />
    )
}

export default RoleAuthRoute
