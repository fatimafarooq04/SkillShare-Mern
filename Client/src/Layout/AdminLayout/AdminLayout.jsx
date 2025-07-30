import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import './AdminLayout.css'

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </>
  )
}

export default AdminLayout