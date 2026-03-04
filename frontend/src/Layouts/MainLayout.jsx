import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'


export const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
