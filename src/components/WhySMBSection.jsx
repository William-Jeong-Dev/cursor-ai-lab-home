import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WhySMBSection() {
    const container = useRef()

    useGSAP(() => {
        gsap.from(".advantage-card", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%"
            }
        })
    }, { scope: container })

    return (
        <section id="why-smb" ref={container} style={{ minHeight: '100vh', background: '#050505', padding: '150px 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ textAlign: 'center', marginBottom: '100px', maxWidth: '800px' }}>
                <span style={{ color: '#ff3b30', fontSize: '1rem', letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
                    Why SMB?
                </span>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 700, color: '#f5f5f7', lineHeight: 1.2, marginBottom: '40px', wordBreak: 'keep-all' }}>
                    대기업보다 중소기업이<br />
                    <span style={{ color: '#86868b' }}>AI 도입에 유리한 역설적인 이유.</span>
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#86868b', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                    데이터가 고여있는 거대 조직과 달리, <br />
                    우리는 <strong>물 흐르듯(Fluid)</strong> 연결된 민첩한 조직이기 때문입니다.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', maxWidth: '1200px', width: '100%' }}>

                {/* Comparison Card: Enterprise */}
                <div className="advantage-card" style={{ padding: '50px', borderRadius: '30px', background: '#111', border: '1px solid #222', opacity: 0.6 }}>
                    <h3 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '20px' }}>Giant Enterprise</h3>
                    <div style={{ fontSize: '1.1rem', color: '#888', lineHeight: 1.8 }}>
                        ❌ <strong>복잡한 결재 라인</strong>으로 인한 둔화<br />
                        ❌ <strong>부서간 데이터 장벽(Silos)</strong>이 견고함<br />
                        ❌ 레거시 시스템 교체 비용 과다<br />
                    </div>
                </div>

                {/* Comparison Card: SMB (Hero) */}
                <div className="advantage-card" style={{ padding: '50px', borderRadius: '30px', background: '#1d1d1f', border: '1px solid #ff3b30', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-15px', right: '30px', background: '#ff3b30', color: '#fff', padding: '5px 15px', borderRadius: '15px', fontSize: '0.9rem', fontWeight: 600 }}>SMB Advantage</div>
                    <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '20px' }}>Agile SMB</h3>
                    <div style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.8 }}>
                        ✅ <strong>즉각적인 데이터 흐름</strong>과 의사결정<br />
                        ✅ <strong>유연한 조직 구조</strong>로 AI 전면 도입 가능<br />
                        ✅ <strong>가벼운 시스템</strong>으로 빠른 혁신 속도<br />
                    </div>
                    <p style={{ marginTop: '30px', color: '#ff3b30', fontWeight: 600 }}>
                        "규모가 작을수록, 지능은 더 빠르게 연결됩니다."
                    </p>
                </div>

            </div>
        </section>
    )
}
