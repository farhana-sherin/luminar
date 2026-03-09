import React from 'react'
import Dashboard from '../pages/Dashboard'
import SiderBar from '../components/SiderBar'

export default function DashboardLayout() {
  return (
    <div>
        <SiderBar />
      <Dashboard />
    </div>
  )
}
