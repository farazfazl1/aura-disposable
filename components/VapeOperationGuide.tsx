"use client"

import { useState } from "react"
import Image from "next/image"
import { Flame, Gauge, Play, Power, Wind } from "lucide-react"

const operationSteps = [
  {
    number: "01",
    label: "Power",
    action: "5 clicks",
    description: "Turn the device on or off.",
    icon: Power,
  },
  {
    number: "02",
    label: "Voltage",
    action: "3 clicks",
    description: "Move through the four voltage modes.",
    icon: Gauge,
  },
  {
    number: "03",
    label: "Preheat",
    action: "2 clicks",
    description: "Start the low-voltage preheat cycle.",
    icon: Flame,
  },
  {
    number: "04",
    label: "Draw",
    action: "Inhale",
    description: "Draw gently from the mouthpiece to activate.",
    icon: Wind,
  },
]

const voltageModes = [
  { label: "High", value: "4.2V", color: "#62d84e" },
  { label: "Medium", value: "3.7V", color: "#ff9b1a" },
  { label: "Low", value: "3.2V", color: "#ff4048" },
  { label: "Preheat", value: "1.8V", color: "#43a9ff" },
]

export default function VapeOperationGuide() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="aura-operation-guide" id="how-it-works" aria-labelledby="operation-guide-heading">
      <div className="aura-operation-guide-inner">
        <div className="aura-operation-intro">
          <div>
            <p className="aura-operation-eyebrow">
              <span aria-hidden="true" />
              Quick guide / 24 seconds
            </p>
            <h2 id="operation-guide-heading" className="aura-operation-title">
              Know every
              <span>click.</span>
            </h2>
          </div>

          <div className="aura-operation-intro-copy">
            <p>
              One button controls the complete Aura experience. Learn the click sequence, choose your voltage, and
              start with confidence.
            </p>
            <p className="aura-operation-note">Use only as directed and keep the device away from children.</p>
          </div>
        </div>

        <div className="aura-operation-console">
          <div className="aura-operation-media">
            {isPlaying ? (
              <video
                className="aura-operation-video"
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster="/images/aura-operation-guide-poster.png"
                onEnded={() => setIsPlaying(false)}
                aria-label="Aura vape operation tutorial"
              >
                <source src="/videos/aura-operation-guide.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            ) : (
              <>
                <Image
                  src="/images/aura-operation-guide-poster.png"
                  alt="Aura vape quick guide showing four voltage modes"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(100vw - 64px), 1216px"
                  className="aura-operation-poster"
                />
                <button
                  type="button"
                  className="aura-operation-play-button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play the 24-second Aura operation tutorial"
                >
                  <Play size={30} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
                  <span className="sr-only">Play tutorial</span>
                </button>
              </>
            )}
          </div>

          <div className="aura-operation-modebar" aria-label="Aura voltage modes">
            <p>Four voltage modes</p>
            <div className="aura-operation-modes">
              {voltageModes.map((mode) => (
                <span key={mode.label} className="aura-operation-mode">
                  <span className="aura-operation-mode-dot" style={{ backgroundColor: mode.color }} aria-hidden="true" />
                  <span>{mode.label}</span>
                  <strong>{mode.value}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        <ol className="aura-operation-steps" aria-label="Aura device operation steps">
          {operationSteps.map((step) => {
            const Icon = step.icon

            return (
              <li key={step.number} className="aura-operation-step">
                <div className="aura-operation-step-topline">
                  <span className="aura-operation-step-number">{step.number}</span>
                  <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p>{step.label}</p>
                <strong>{step.action}</strong>
                <span>{step.description}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
