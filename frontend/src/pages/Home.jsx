import React from 'react'
import Card from '../components/Card'
import { Hero } from '../components/Hero'

export const Home = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-200/55 blur-3xl" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rose-200/45 blur-3xl" />
        <div className="absolute bottom-16 left-1/3 h-80 w-80 rounded-full bg-cyan-100/55 blur-3xl" />
        <div className="absolute right-1/4 top-[54%] h-72 w-72 rounded-full bg-amber-100/45 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5)_0%,transparent_45%)]" />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl space-y-8 sm:space-y-10">
          <Hero />
          <Card />
        </div>
      </div>
    </div>
  )
}
