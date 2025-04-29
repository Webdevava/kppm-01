'use client'
import { TeamHero } from '@/sections/contact/team-hero'
import { TeamMembers } from '@/sections/contact/team-members'
import { Footer } from '@/sections/landing/footer'
import { Navbar } from '@/sections/landing/navbar'
import React from 'react'

const Team = () => {
  return (
    <div className="min-h-screen w-full">
        <Navbar/>
        <TeamHero/>
        <TeamMembers/>
        <Footer/>
    </div>
  )
}

export default Team