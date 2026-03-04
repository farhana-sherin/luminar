import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'


export const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
