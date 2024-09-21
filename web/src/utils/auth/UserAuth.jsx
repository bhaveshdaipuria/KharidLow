import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

let authenticated = true;

function UserAuthRoute() {
  return (
    authenticated ? <Outlet /> : <Navigate to='/login' />
  )
}

export default UserAuthRoute;
