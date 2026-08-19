"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link as ScrollLink } from "react-scroll"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onVideoLoaded?: () => void
  className?: string
}

const Hero = ({ onVideoLoaded, className }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasLoadedRef = useRef(false)

  const handleVideoReady = () => {
    if (!hasLoadedRef.current && onVideoLoaded) {
      hasLoadedRef.current = true
      onVideoLoaded()
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      if (ctaRef.current) {
        gsap.from(Array.from(ctaRef.current.children), {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 1,
          ease: "power3.out",
        })
      }

      if (videoRef.current && heroRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className={`relative h-screen flex items-center justify-center overflow-hidden ${className || ""}`}
      id="home"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={handleVideoReady}
          onCanPlayThrough={handleVideoReady}
          className="object-cover w-full h-full"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SmokeCompressed-1wsRMBi7xKOFt6YHlqsvrlq1GVnboO.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-[#f7f6f2]/70 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f6f2]/50 via-[#f7f6f2]/80 to-[#f7f6f2]"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 text-[#17201b]">
          ELEVATE YOUR AURA
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-[#536057] mb-12">
          Experience the art of premium disposable vaping
        </p>
        <div ref={ctaRef} className="flex justify-center">
          <Link
            href="/store"
            className="inline-flex items-center justify-center rounded-full bg-[#17201b] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#33423a]"
          >
            Explore the Store
          </Link>
        </div>
      </div>
      <ScrollLink
        to="products"
        smooth={true}
        duration={500}
        offset={-96}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <svg
          className="animate-bounce w-6 h-6 text-[#17201b]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7-7-7"></path>
        </svg>
      </ScrollLink>
    </section>
  )
}

export default Hero
