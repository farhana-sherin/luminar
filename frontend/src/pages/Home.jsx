import React from 'react'
import Card from '../components/card.JSX'

export const Home = () => {
  return (
    <div className=" min-h-screen p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}
