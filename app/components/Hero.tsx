"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MoonIcon, SunIcon } from "./Icons"
import { Link as ScrollLink } from "react-scroll"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onVideoLoaded?: () => void
}

const Hero = ({ onVideoLoaded }: HeroProps) => {
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

      gsap.from(ctaRef.current?.children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 1,
        ease: "power3.out",
      })

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
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
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
        <div className="absolute inset-0 bg-black opacity-85"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 text-white">
          ELEVATE YOUR AURA
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-12">
          Experience the art of premium disposable vaping
        </p>
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link
            href="/indica"
            className="px-8 py-3 bg-transparent border border-purple-600 text-purple-600 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
          >
            <MoonIcon className="mr-2" width={18} height={18} />
            Discover Indica
          </Link>
          <Link
            href="/sativa"
            className="px-8 py-3 bg-transparent border border-yellow-500 text-yellow-500 rounded-full text-lg font-semibold hover:bg-yellow-500 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
          >
            <SunIcon className="mr-2" width={18} height={18} />
            Explore Sativa
          </Link>
        </div>
      </div>
      <ScrollLink
        to="products"
        smooth={true}
        duration={500}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <svg
          className="animate-bounce w-6 h-6 text-white"
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

