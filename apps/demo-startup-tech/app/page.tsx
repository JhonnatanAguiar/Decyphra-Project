'use client'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { BackToTopFloating } from '@/components/ui/BackToTopFloating'
import { CallToAction } from '@/components/sections/CallToAction'
import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Pricing } from '@/components/sections/Pricing'
import { Security } from '@/components/sections/Security'
import { SocialProof } from '@/components/sections/SocialProof'
import { ValueProp } from '@/components/sections/ValueProp'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_55%,_#000_100%)]">
        <Hero />
        <ValueProp />
        <Features />
        <HowItWorks />
        <Security />
        <SocialProof />
        <Pricing />
        <CallToAction />
      </main>
      <BackToTopFloating />
      <Footer />
    </>
  )
}

