import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TechTicker = () => (
    <div style={{ width: '100%', overflow: 'hidden', borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '20px 0', marginTop: '100px', background: '#050505' }}>
        <div className="ticker-track" style={{ display: 'flex', gap: '60px', whiteSpace: 'nowrap', color: '#444', fontSize: '1.2rem', fontWeight: 600 }}>
            {/* Repeated Items for seamless loop */}
            <span>PYTHON</span><span>PYTORCH</span><span>TENSORFLOW</span><span>KAFKA</span><span>ELASTICSEARCH</span><span>FAISS</span><span>REDIS</span><span>DOCKER</span><span>KUBERNETES</span>
            <span>PYTHON</span><span>PYTORCH</span><span>TENSORFLOW</span><span>KAFKA</span><span>ELASTICSEARCH</span><span>FAISS</span><span>REDIS</span><span>DOCKER</span><span>KUBERNETES</span>
        </div>
        <style>{`
            .ticker-track { animation: ticker 20s linear infinite; }
            @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
    </div>
)

export default function ScalabilitySection() {
    const container = useRef()

    useGSAP(() => {
        gsap.to(".parallax-num", {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        })
    }, { scope: container })

    return (
        <section ref={container} style={{ minHeight: '100vh', background: '#000', padding: '120px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '60px' }}>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2 style={{ fontSize: '1rem', color: '#ff3b30', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase' }}>Zone 4: Scalability</h2>
                    <h3 style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.2, color: '#f5f5f7', marginBottom: '40px', wordBreak: 'keep-all' }}>
                        멈추지 않는 <br />
                        성장 엔진.
                    </h3>
                    <p style={{ fontSize: '1.2rem', color: '#86868b', maxWidth: '450px', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                        최소기능제품(MVP)부터 엔터프라이즈 레벨까지.<br />
                        비즈니스가 성장해도 시스템은 언제나 안정적입니다. 수백만 건의 데이터도 흔들림 없이 처리합니다.
                    </p>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'flex-end', minWidth: '300px' }}>

                    <div style={{ textAlign: 'right' }}>
                        <div className="parallax-num" style={{ fontSize: '6rem', fontWeight: 800, color: '#ff3b30', lineHeight: 1 }}>99.9<span style={{ fontSize: '3rem' }}>%</span></div>
                        <div style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 600, marginTop: '10px' }}>시스템 가동률 (SLA)</div>
                        <div style={{ color: '#555', fontSize: '0.9rem', marginTop: '5px' }}>중단 없는 고가용성 아키텍처</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <div className="parallax-num" style={{ fontSize: '6rem', fontWeight: 800, color: '#1d1d1f', webkitTextStroke: '2px #ff3b30', lineHeight: 1 }}>200<span style={{ fontSize: '3rem' }}>ms</span></div>
                        <div style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 600, marginTop: '10px' }}>평균 검색 속도</div>
                        <div style={{ color: '#555', fontSize: '0.9rem', marginTop: '5px' }}>최적화된 벡터 검색 엔진</div>
                    </div>

                </div>
            </div>

            <TechTicker />

        </section>
    )
}
