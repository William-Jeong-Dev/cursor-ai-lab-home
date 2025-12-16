import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
                trigger: ".features-container",
                start: "top 60%",
            }
        })
    }, [text])

    return <span>{displayedText}<span className="cursor">|</span></span>
}

export default function FeaturesSection() {
    const containerRef = useRef()
    const docRef = useRef()

    useGSAP(() => {
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
        <section ref={containerRef} className="features-container" style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 0' }}>
            <div className="content-container" style={{ maxWidth: '1200px', width: '100%', padding: '0 20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#ff3b30', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Intelligent Workflow</h2>
                <h3 style={{ textAlign: 'center', marginBottom: '100px', color: '#fff', fontSize: '4rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
                    데이터와 동료처럼 <br /> 대화하십시오.
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>

                    <div className="feature-card" style={{
                        background: '#1d1d1f',
                        padding: '50px',
                        borderRadius: '30px',
                        textAlign: 'left'
                    }}>
                        <h4 style={{ color: '#fff', marginBottom: '30px', fontSize: '1.8rem', fontWeight: 600 }}>영업 인사이트</h4>

                        <div style={{ marginBottom: '15px', color: '#86868b', fontSize: '0.8rem', letterSpacing: '1px' }}>USER QUERY</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '40px', minHeight: '60px' }}>
                            <Typewriter text="A사의 최근 매출 추이와 기술 이슈 리포트 보여줘." startDelay={0.5} />
                        </div>

                        <div style={{ marginBottom: '15px', color: '#ff3b30', fontSize: '0.8rem', letterSpacing: '1px' }}>AI ANSWER</div>
                        <div style={{
                            padding: '30px',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 59, 48, 0.05)',
                            color: '#f5f5f7',
                            lineHeight: '1.6'
                        }}>
                            <p style={{ margin: 0 }}>
                                <strong>매출:</strong> 전년 대비 15% 성장.<br />
                                <strong>이슈:</strong> 지난달 '서버 지연' 리포트.<br />
                                <span style={{ fontSize: '0.9rem', color: '#86868b', display: 'block', marginTop: '15px' }}>Source: 2024_매출장부.xlsx</span>
                            </p>
                        </div>
                    </div>

                    <div className="feature-card automation-card" style={{
                        background: '#1d1d1f',
                        padding: '50px',
                        borderRadius: '30px',
                        textAlign: 'left',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <h4 style={{ color: '#fff', marginBottom: '30px', fontSize: '1.8rem', fontWeight: 600 }}>자동화</h4>

                        <div style={{ marginBottom: '15px', color: '#86868b', fontSize: '0.8rem', letterSpacing: '1px' }}>USER QUERY</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '40px' }}>
                            "프로젝트 B 견적서 초안 작성해줘."
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '200px',
                            background: '#0a0a0a',
                            borderRadius: '20px'
                        }}>
                            <div ref={docRef} style={{
                                width: '120px',
                                height: '160px',
                                background: '#fff',
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 30px rgba(255, 59, 48, 0.3)'
                            }}>
                                <div style={{ fontSize: '3rem' }}>📄</div>
                                <div style={{ fontSize: '0.8rem', color: '#000', marginTop: '10px', fontWeight: 'bold' }}>견적서.pdf</div>
                                <div style={{ width: '40px', height: '4px', background: '#ff3b30', marginTop: '10px', borderRadius: '2px' }}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
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
