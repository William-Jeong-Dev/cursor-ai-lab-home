import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 타이핑 효과 컴포넌트 복구
const Typewriter = ({ text, startDelay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('')

    useGSAP(() => {
        let currentText = ''
        gsap.to({}, {
            duration: text.length * 0.05,
            delay: startDelay,
            repeat: 0,
            onUpdate: function () {
                const i = Math.floor(this.progress() * text.length)
                if (currentText.length !== i) {
                    setDisplayedText(text.substring(0, i))
                    currentText = text.substring(0, i)
                }
            },
            scrollTrigger: {
                trigger: ".features-container", // 트리거 클래스 확인
                start: "top 60%", // 화면 60% 지점에 도달하면 시작
            }
        })
    }, [text])

    return <span>{displayedText}<span className="cursor">|</span></span>
}

export default function FeaturesSection() {
    const containerRef = useRef()
    const docRef = useRef()

    useGSAP(() => {
        // 카드들이 위로 스르륵 올라오는 효과 복구
        gsap.from(".feature-card", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%"
            }
        })

        // 견적서 아이콘 애니메이션 복구
        gsap.fromTo(docRef.current,
            { scale: 0.8, opacity: 0, y: 20 },
            {
                scale: 1, opacity: 1, y: 0,
                duration: 0.8,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: ".automation-card",
                    start: "top 60%"
                }
            }
        )
    }, { scope: containerRef })

    return (
        <section ref={containerRef} className="features-container" style={{ background: '#000', padding: '100px 0' }}>
            <div className="content-container">
                <h2 style={{ color: '#ff3b30', fontSize: '1rem', letterSpacing: '2px', textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase' }}>
                    Intelligent Workflow
                </h2>
                <h3 style={{
                    color: '#fff',
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    fontWeight: 700,
                    textAlign: 'center',
                    marginBottom: '80px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em'
                }}>
                    데이터와 동료처럼 <br /> 대화하십시오.
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                    gap: '40px',
                    width: '100%'
                }}>

                    {/* 카드 1: 영업 인사이트 (타이핑 효과 적용) */}
                    <div className="feature-card" style={{ background: '#1d1d1f', padding: 'clamp(30px, 5vw, 50px)', borderRadius: '30px' }}>
                        <h4 style={{ color: '#fff', marginBottom: '30px', fontSize: '1.8rem', fontWeight: 600 }}>영업 인사이트</h4>

                        <div style={{ marginBottom: '15px', color: '#86868b', fontSize: '0.8rem', letterSpacing: '1px' }}>USER QUERY</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '40px', minHeight: '60px' }}>
                            <Typewriter text="A사의 최근 매출 추이와 기술 이슈 리포트 보여줘." startDelay={0.5} />
                        </div>

                        <div style={{ marginBottom: '15px', color: '#ff3b30', fontSize: '0.8rem', letterSpacing: '1px' }}>AI ANSWER</div>
                        <div style={{ padding: '30px', borderRadius: '20px', backgroundColor: 'rgba(255, 59, 48, 0.05)', color: '#f5f5f7', lineHeight: '1.6' }}>
                            <p style={{ margin: 0 }}>
                                <strong>매출:</strong> 전년 대비 15% 성장.<br />
                                <strong>이슈:</strong> 지난달 '서버 지연' 리포트.<br />
                                <span style={{ fontSize: '0.9rem', color: '#86868b', display: 'block', marginTop: '15px' }}>Source: 2024_매출장부.xlsx</span>
                            </p>
                        </div>
                    </div>

                    {/* 카드 2: 자동화 (견적서 애니메이션 적용) */}
                    <div className="feature-card automation-card" style={{ background: '#1d1d1f', padding: 'clamp(30px, 5vw, 50px)', borderRadius: '30px', position: 'relative', overflow: 'hidden' }}>
                        <h4 style={{ color: '#fff', marginBottom: '30px', fontSize: '1.8rem', fontWeight: 600 }}>자동화</h4>

                        <div style={{ marginBottom: '15px', color: '#86868b', fontSize: '0.8rem', letterSpacing: '1px' }}>USER QUERY</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '40px' }}>
                            "프로젝트 B 견적서 초안 작성해줘."
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', background: '#0a0a0a', borderRadius: '20px' }}>
                            <div ref={docRef} style={{
                                width: '120px', height: '160px', background: '#fff', borderRadius: '10px',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 30px rgba(255, 59, 48, 0.3)'
                            }}>
                                <div style={{ fontSize: '3.5rem' }}>📄</div>
                                <div style={{ fontSize: '0.8rem', color: '#000', marginTop: '10px', fontWeight: 'bold' }}>견적서.pdf</div>
                                <div style={{ width: '40px', height: '4px', background: '#ff3b30', marginTop: '10px', borderRadius: '2px' }}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 타이핑 커서 애니메이션 CSS */}
            <style>{`
                .cursor {
                    display: inline-block;
                    width: 2px;
                    height: 1.2em;
                    background: #ff3b30;
                    vertical-align: middle;
                    margin-left: 2px;
                    animation: blink 1s step-end infinite;
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }
            `}</style>
        </section>
    )
}