import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { Float } from '@react-three/drei'

gsap.registerPlugin(ScrollTrigger)

function DataVein({ points, speed = 1, thickness = 0.1 }) {
    const materialRef = useRef()
    const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
    const geometry = useMemo(() => new THREE.TubeGeometry(curve, 64, thickness, 8, false), [curve, thickness])

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.map.offset.x -= 0.005 * speed
        }
    })

    const flowTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 1024, 0);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(0.5, '#8a0000'); // Blood Red
        gradient.addColorStop(0.8, '#ff3b30'); // Bright Crimson
        gradient.addColorStop(1, '#000000');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 1024, 1024);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }, []);

    return (
        <mesh geometry={geometry}>
            <meshBasicMaterial
                ref={materialRef}
                map={flowTexture}
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

function VeinSystem() {
    const mainVeinPoints = [
        new THREE.Vector3(-8, -5, 0),
        new THREE.Vector3(-4, 2, 2),
        new THREE.Vector3(0, -2, -2),
        new THREE.Vector3(4, 3, 0),
        new THREE.Vector3(8, -4, 2)
    ]
    const branch1Points = [
        new THREE.Vector3(-2, 1, 1),
        new THREE.Vector3(0, 4, 0),
        new THREE.Vector3(2, 6, -2)
    ]
    const branch2Points = [
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(4, -5, 3),
        new THREE.Vector3(6, -8, 0)
    ]

    return (
        <group>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <DataVein points={mainVeinPoints} thickness={0.4} speed={1.2} />
                <DataVein points={branch1Points} thickness={0.2} speed={0.8} />
                <DataVein points={branch2Points} thickness={0.15} speed={0.6} />
                <Points />
            </Float>
        </group>
    )
}

function Points() {
    const count = 300
    const points = useMemo(() => {
        const p = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15
            p[i * 3 + 1] = (Math.random() - 0.5) * 15
            p[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        return p
    }, [])

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#ff3b30" transparent opacity={0.6} sizeAttenuation />
        </points>
    )
}

const ChallengeItem = ({ title, sub, desc }) => (
    <div className="challenge-item" style={{
        marginBottom: '60px',
        paddingLeft: '30px',
        borderLeft: '4px solid #1a1a1a',
        position: 'relative'
    }}>
        <div style={{ position: 'absolute', left: '-9px', top: '0', width: '14px', height: '14px', background: '#ff3b30', borderRadius: '50%', boxShadow: '0 0 15px #ff3b30' }}></div>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>{title}</h3>
        <span style={{ display: 'block', fontSize: '1.2rem', color: '#ff3b30', marginBottom: '15px', fontWeight: 600 }}>{sub}</span>
        <p style={{ color: '#86868b', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>{desc}</p>
    </div>
)

export default function ChallengeSection() {
    const container = useRef()

    useGSAP(() => {
        gsap.from(".challenge-item", {
            x: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%"
            }
        })
        gsap.to(".challenge-item", {
            borderLeftColor: '#ff3b30', // Red Flow on Scroll
            duration: 1,
            stagger: 0.5,
            scrollTrigger: {
                trigger: container.current,
                start: "top 40%",
                scrub: true
            }
        })
    }, { scope: container })

    return (
        <section ref={container} style={{ minHeight: '100vh', background: '#000', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8 }}>
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                    <VeinSystem />
                </Canvas>
            </div>

            <div className="content-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '0 5vw', display: 'flex' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '1rem', color: '#ff3b30', marginBottom: '40px', letterSpacing: '2px', textTransform: 'uppercase' }}>The Reality</h2>
                    <h3 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '20px', color: '#fff' }}>
                        DEAD<br /><span style={{ color: '#ff3b30' }}>DATA.</span>
                    </h3>
                </div>

                <div style={{ flex: 1, paddingTop: '100px' }}>
                    <ChallengeItem title="SILOED SYSTEM" sub="단절된 혈관, 막힌 데이터" desc="분리된 ERP와 CRM. 흐르지 않는 데이터는 조직의 동맥경화를 유발합니다." />
                    <ChallengeItem title="MANUAL LABOR" sub="비효율의 독소" desc="수동 취합 과정은 조직의 에너지를 낭비하고 창의성을 저하시킵니다." />
                    <ChallengeItem title="DARK DATA" sub="순환되지 않는 잠재력" desc="잠들어 있는 도면과 문서를 다시 심장으로 연결해야 합니다." />
                </div>
            </div>
        </section>
    )
}
