"use client"

import { useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface HeroProps {
  onVideoLoaded?: () => void
  className?: string
}

const Hero = ({ onVideoLoaded, className }: HeroProps) => {
  const hasLoadedRef = useRef(false)

  const markHeroReady = useCallback(() => {
    if (hasLoadedRef.current) return
    hasLoadedRef.current = true
    onVideoLoaded?.()
  }, [onVideoLoaded])

  useEffect(() => {
    const fallback = window.setTimeout(markHeroReady, 2500)
    return () => window.clearTimeout(fallback)
  }, [markHeroReady])

  return (
    <section className={`aura-home-hero ${className || ""}`} id="home" aria-labelledby="hero-heading">
      <div className="aura-home-hero-inner">
        <div className="aura-home-hero-copy">
          <p className="aura-home-hero-eyebrow">
            <span aria-hidden="true" />
            The Aura collection
          </p>

          <h1 id="hero-heading" className="aura-home-hero-title">
            Elevate
            <span>your Aura.</span>
          </h1>

          <p className="aura-home-hero-description">
            Discover the full collection and find the experience that fits your mood.
          </p>

          <div className="aura-home-hero-actions">
            <Link href="/store" className="aura-home-hero-primary">
              Shop Now
              <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="aura-home-product-stage">
          <div className="aura-home-product-disc" aria-hidden="true" />
          <div className="aura-home-product-orbits" aria-hidden="true">
            <span className="aura-home-product-orbit aura-home-product-orbit-wide" />
            <span className="aura-home-product-orbit aura-home-product-orbit-tall" />
          </div>
          <div className="aura-home-product-lineup">
            <Image
              src="/images/aura-hero-collection.png"
              alt="Four Aura disposable vapes with fruit-inspired flavors"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 58vw"
              className="aura-home-hero-image"
              onLoad={markHeroReady}
              onError={markHeroReady}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
