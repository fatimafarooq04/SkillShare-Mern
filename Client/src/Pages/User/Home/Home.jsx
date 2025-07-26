import React from 'react'
import Hero from './Hero'
import Cards from './Cards'
import HowItWorks from './HowItWorks '
import TestimonialSection from './TestimonialSection'
import CTABanner from './CTABanner'

export const Home = () => {
  return (
    <>
      <Hero />
      <Cards />
      <HowItWorks/>
      <TestimonialSection/>
      <CTABanner/>
    </>
  )
}

