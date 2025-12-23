import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'

// 3D 요소들은 기존과 동일 (공간 제약을 위해 생략 가능하나 구조 유지)
function DataVein({ points, speed = 1, thickness = 0.2, color = '#ff3b30' }) {
    const materialRef = useRef()
    const curve = React.useMemo(() => new THREE.CatmullRomCurve3(points), [points])
    const geometry = React.useMemo(() => new THREE.TubeGeometry(curve, 64, thickness, 8, false), [curve, thickness])
    useFrame(() => { if (materialRef.current) materialRef.current.map.offset.x -= 0.002 * speed })
    const flowTexture = React.useMemo(() => {
        const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 1024;
        const ctx = canvas.getContext('2d'); const grad = ctx.createLinearGradient(0, 0, 1024, 0);
        grad.addColorStop(0, '#000'); grad.addColorStop(0.5, color); grad.addColorStop(1, '#000');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 1024, 1024);
        const tex = new THREE.CanvasTexture(canvas); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; return tex;
    }, [color]);
    return (<mesh geometry={geometry}><meshBasicMaterial ref={materialRef} map={flowTexture} transparent opacity={0.6} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} /></mesh>)
}

export default function HeroSection() {
    const container = useRef()
    useGSAP(() => {
        gsap.fromTo(".hero-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" })
    }, { scope: container })

    return (
        <section ref={container} style={{ height: '100vh', position: 'relative', background: '#000', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <Canvas><PerspectiveCamera makeDefault position={[0, 0, 15]} fov={35} />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <DataVein points={[new THREE.Vector3(-15, -5, -5), new THREE.Vector3(15, 5, -5)]} thickness={0.5} color="#ff3b30" />
                    </Float>
                </Canvas>
            </div>

            <div className="content-container" style={{ textAlign: 'center', pointerEvents: 'none' }}>
                <h1 className="hero-title" style={{
                    fontSize: 'clamp(2.8rem, 12vw, 8rem)', // 반응형 크기
                    fontWeight: 800,
                    color: '#f5f5f7',
                    lineHeight: 1,
                    marginBottom: '20px',
                    wordBreak: 'keep-all'
                }}>
                    GRAVITY.
                </h1>
                <p style={{
                    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                    color: '#86868b',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                    wordBreak: 'keep-all'
                }}>
                    데이터가 흩어지지 않게.<br />
                    기업의 지능을 하나로 묶는 중력장(Gravity Field).
                </p>
            </div>
        </section>
    )
}