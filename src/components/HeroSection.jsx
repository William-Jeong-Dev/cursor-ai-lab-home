import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'

// --- 3D Components ---

function DataVein({ points, speed = 1, thickness = 0.2, color = '#ff3b30' }) {
    const materialRef = useRef()
    const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
    const geometry = useMemo(() => new THREE.TubeGeometry(curve, 64, thickness, 8, false), [curve, thickness])

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.map.offset.x -= 0.002 * speed
        }
    })

    const flowTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 1024, 0);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(0.3, '#330000');
        gradient.addColorStop(0.5, color);
        gradient.addColorStop(0.7, '#330000');
        gradient.addColorStop(1, '#000000');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 1024, 1024);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }, [color]);

    return (
        <mesh geometry={geometry}>
            <meshBasicMaterial
                ref={materialRef}
                map={flowTexture}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

function VeinSystem() {
    // Cinematic wide curves
    const mainCurve = [new THREE.Vector3(-15, -5, -5), new THREE.Vector3(-5, 5, 0), new THREE.Vector3(5, -2, 2), new THREE.Vector3(15, 5, -5)]
    const subCurve1 = [new THREE.Vector3(-10, 8, -10), new THREE.Vector3(0, 0, -5), new THREE.Vector3(10, -8, 0)]

    return (
        <group rotation={[0, 0, 0.1]}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <DataVein points={mainCurve} thickness={0.6} speed={1.2} color="#ff3b30" />
                <DataVein points={subCurve1} thickness={0.3} speed={0.8} color="#cc0000" />
            </Float>
        </group>
    )
}

function Rig() {
    const { camera, mouse } = useThree()
    useFrame(() => {
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05
        camera.lookAt(0, 0, 0)
    })
    return null
}

// --- Main Component ---

export default function HeroSection() {
    const container = useRef()

    useGSAP(() => {
        gsap.fromTo(".hero-title",
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
        )
        gsap.fromTo(".hero-sub",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power2.out" }
        )
    }, { scope: container })

    return (
        <section ref={container} style={{ height: '100vh', position: 'relative', background: '#000', overflow: 'hidden' }}>

            {/* 3D Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={35} />
                    <Rig />
                    <VeinSystem />
                </Canvas>
            </div>

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none',
                textAlign: 'center'
            }}>
                <h1 className="hero-title" style={{
                    fontSize: 'clamp(3rem, 10vw, 8rem)',
                    fontWeight: 700,
                    color: '#f5f5f7',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.95,
                    marginBottom: '30px',
                    textShadow: '0 0 50px rgba(0,0,0,0.5)'
                }}>
                    DEFY GRAVITY.
                </h1>
                <p className="hero-sub" style={{
                    fontSize: '1.5rem',
                    color: '#86868b',
                    fontWeight: 400,
                    maxWidth: '600px',
                    lineHeight: 1.6,
                    wordBreak: 'keep-all'
                }}>
                    데이터가 흩어지지 않게.<br />
                    기업의 지능을 하나로 묶는 중력장(Gravity Field).
                </p>
            </div>

            {/* Scroll Hint */}
            <div style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, color: '#86868b' }}>
                <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #86868b, transparent)', margin: '0 auto' }}></div>
            </div>
        </section>
    )
}
