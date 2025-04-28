'use client'
import { AllArticles } from '@/sections/contact/all-articles'
import { BlogsPage } from '@/sections/contact/blogs-page'
import { Navbar } from '@/sections/landing/navbar'
import React from 'react'

const Blogs = () => {
  return (
    <div>
      <Navbar/>
      <BlogsPage/>
      <AllArticles/>
    </div>
  )
}

export default Blogs