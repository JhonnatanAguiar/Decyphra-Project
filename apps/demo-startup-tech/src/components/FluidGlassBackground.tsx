'use client'

import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'

function GlassBar() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Oscila levemente em Y para dar sensação de fluidez
    ref.current.position.y = -0.5 + Math.sin(t * 0.5) * 0.05
  })

  return (
    <mesh ref={ref} position={[0, -0.5, 0]} scale={[3.6, 0.45, 1]}>
      <boxGeometry args={[1, 1, 0.2]} />
      <MeshTransmissionMaterial
        samples={6}
        resolution={256}
        thickness={4}
        roughness={0.12}
        anisotropy={0.12}
        distortion={0.35}
        distortionScale={0.45}
        temporalDistortion={0.25}
        iridescence={0.45}
        iridescenceIOR={1.25}
        color="#ffffff"
        attenuationColor="#6366F1"
        attenuationDistance={0.7}
        background={new THREE.Color('#020617')}
      />
    </mesh>
  )
}

function FloatingParticles() {
  const group = useRef<THREE.Group>(null!)
  const { viewport } = useThree()

  const particles = useMemo(() => {
    const points: Array<{ position: [number, number, number]; radius: number }> =
      []
    const count = 45

    for (let i = 0; i < count; i += 1) {
      const x = (Math.random() - 0.5) * viewport.width * 1.8
      const y = (Math.random() - 0.5) * viewport.height * 1.8
      const z = -1 - Math.random() * 2
      const radius = 0.06 + Math.random() * 0.14
      points.push({ position: [x, y, z], radius })
    }

    return points
  }, [viewport.height, viewport.width])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return

    group.current.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh
      const speed = 0.15 + (index % 5) * 0.03
      mesh.position.y += speed * 0.01

      if (mesh.position.y > viewport.height) {
        mesh.position.y = -viewport.height
      }

      mesh.position.x += Math.sin(t * 0.3 + index) * 0.0008
    })
  })

  return (
    <group ref={group}>
      {particles.map((particle) => (
        <mesh key={`${particle.position.join('-')}`} position={particle.position}>
          <sphereGeometry args={[particle.radius, 16, 16]} />
          <meshBasicMaterial
            color="#94a3b8"
            transparent
            opacity={0.14}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function ParallaxLayer() {
  const group = useRef<THREE.Group>(null!)
  const { viewport } = useThree()

  useFrame((state) => {
    const { pointer } = state
    if (!group.current) return

    const parallaxStrength = 0.35
    const targetX = (pointer.x * viewport.width * parallaxStrength) / 8
    const targetY = (pointer.y * viewport.height * parallaxStrength) / 8

    group.current.position.x += (targetX - group.current.position.x) * 0.08
    group.current.position.y += (targetY - group.current.position.y) * 0.08

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.1,
      0.08,
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.15,
      0.08,
    )
  })

  return (
    <group ref={group}>
      <FloatingParticles />
      <GlassBar />
    </group>
  )
}

export default function FluidGlassBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={['transparent']} />
      <ParallaxLayer />
    </Canvas>
  )
}


