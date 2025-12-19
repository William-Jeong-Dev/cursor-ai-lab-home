import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 반응형 BentoCard 컴포넌트
const BentoCard = ({ title, subTitle, desc, colSpan = 1, rowSpan = 1, children, labels = [] }) => {
    // 화면 너비에 따라 패딩 조절
    const [isSmallMobile, setIsSmallMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallMobile(window.innerWidth < 480);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="bento-card" style={{
            // 모바일에서는 colSpan 무시하고 1개씩 쌓이게 설정
            gridColumn: window.innerWidth < 768 ? 'span 1' : `span ${colSpan}`,
            gridRow: `span ${rowSpan}`,
            background: '#1d1d1f',
            borderRadius: '24px',
            padding: isSmallMobile ? '24px' : '36px', // 모바일 여백 축소
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxSizing: 'border-box'
        }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '0.85rem', color: '#ff3b30', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>{subTitle}</span>
                <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 700, color: '#f5f5f7', marginBottom: '12px', letterSpacing: '-0.02em', wordBreak: 'keep-all' }}>{title}</h3>
                <p style={{ fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', color: '#86868b', lineHeight: 1.6, marginBottom: '20px', wordBreak: 'keep-all' }}>{desc}</p>

                {labels.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {labels.map((l, i) => (
                            <span key={i} style={{
                                fontSize: '0.75rem', color: '#ccc',
                                background: 'rgba(255,255,255,0.1)',
                                padding: '4px 10px', borderRadius: '4px'
                            }}>{l}</span>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ marginTop: '20px', zIndex: 1, width: '100%' }}>{children}</div>
        </div>
    );
};

export default function SolutionSection() {
    const container = useRef()

    useGSAP(() => {
        gsap.from(".bento-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%"
            }
        })
    }, { scope: container })

    return (
        <section ref={container} id="solution" style={{ minHeight: '100vh', background: '#000', padding: '80px 20px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '0.9rem', color: '#ff3b30', marginBottom: '15px', letterSpacing: '2px', textTransform: 'uppercase' }}>Zone 3: Architecture</h2>
                    <h3 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', fontWeight: 700, color: '#f5f5f7', lineHeight: 1.1, wordBreak: 'keep-all' }}>
                        Enterprise AI <br />
                        <span style={{ color: '#86868b' }}>Full-Stack Integration.</span>
                    </h3>
                </div>

                <div style={{
                    display: 'grid',
                    // 모바일에서는 한 줄에 하나씩(1fr), PC에서는 화면에 맞게 배치
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                    gap: '20px',
                    autoRows: 'auto'
                }}>

                    {/* 카드 1 */}
                    <BentoCard
                        colSpan={2}
                        subTitle="Data Ingestion"
                        title="Hybrid Data Lakehouse"
                        desc="ERP, CRM 같은 정형 데이터와 NAS의 비정형 문서를 통합하여 단일 진실 공급원(SSOT)을 구축합니다."
                        labels={['ETL Pipeline', 'Vector Embeddings']}
                    >
                        <div style={{
                            width: '100%',
                            padding: '15px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            display: 'flex',
                            flexWrap: 'wrap', // 모바일에서 줄바꿈 허용
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'monospace',
                            color: '#555',
                            fontSize: '0.75rem',
                            gap: '10px'
                        }}>
                            <span>ERP</span> <span style={{color:'#ff3b30'}}>➔</span> <span>LAKE</span> <span style={{color:'#ff3b30'}}>➔</span> <span>VECTOR DB</span>
                        </div>
                    </BentoCard>

                    {/* 카드 2 */}
                    <BentoCard
                        subTitle="Cognitive Engine"
                        title="LLM RAG Orchestration"
                        desc="GPT-4, Claude 등 최신 모델을 기업 데이터와 실시간 연동하여 할루시네이션을 방지합니다."
                        labels={['RAG Opt', 'Hallucination Control']}
                    >
                        <div style={{ fontSize: '2.5rem', color: '#ff3b30', textAlign: 'right', opacity: 0.8 }}>⚡️</div>
                    </BentoCard>

                    {/* 카드 3 */}
                    <BentoCard
                        subTitle="Governance"
                        title="Zero-Trust Security"
                        desc="모든 데이터에 대한 암호화 및 역할 기반 접근 제어(RBAC)로 강력한 보안을 보장합니다."
                        labels={['SSO', 'RBAC']}
                    >
                        <div style={{ fontSize: '2.5rem', color: '#86868b', textAlign: 'right', opacity: 0.8 }}>🛡️</div>
                    </BentoCard>

                    {/* 카드 4 */}
                    <BentoCard
                        colSpan={2}
                        subTitle="Actionable AI"
                        title="Autonomous Workflow Agent"
                        desc="자연어 명령만으로 보고서를 생성하고 사내 API를 호출하여 복잡한 워크플로우를 수행합니다."
                        labels={['API Integration', 'Doc Gen']}
                    >
                        <div style={{
                            width: '100%',
                            border: '1px dashed #444',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column', // 모바일에서 세로로 정렬
                            alignItems: 'flex-start',
                            padding: '15px',
                            color: '#666',
                            fontSize: '0.8rem',
                            gap: '8px'
                        }}>
                            <div>Input: "보고서 써줘"</div>
                            <div style={{ color: '#ff3b30', fontWeight: 'bold' }}>➔ Processing...</div>
                            <div>Output: "Report.pdf"</div>
                        </div>
                    </BentoCard>

                </div>
            </div>
        </section>
    )
}