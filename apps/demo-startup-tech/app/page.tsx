'use client'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { CallToAction } from '@/components/sections/CallToAction'
import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { Pricing } from '@/components/sections/Pricing'
import { SocialProof } from '@/components/sections/SocialProof'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_55%,_#000_100%)]">
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

