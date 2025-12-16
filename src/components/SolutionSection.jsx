import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BentoCard = ({ title, subTitle, desc, colSpan = 1, rowSpan = 1, children, labels = [] }) => (
    <div className="bento-card" style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        background: '#1d1d1f',
        borderRadius: '24px',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)'
    }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ fontSize: '0.9rem', color: '#ff3b30', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>{subTitle}</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f5f5f7', marginBottom: '12px', letterSpacing: '-0.02em', wordBreak: 'keep-all' }}>{title}</h3>
            <p style={{ fontSize: '1.05rem', color: '#86868b', lineHeight: 1.6, marginBottom: '20px', wordBreak: 'keep-all' }}>{desc}</p>

            {labels.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {labels.map((l, i) => (
                        <span key={i} style={{
                            fontSize: '0.8rem', color: '#ccc',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '4px 10px', borderRadius: '4px'
                        }}>{l}</span>
                    ))}
                </div>
            )}
        </div>
        <div style={{ marginTop: '30px', zIndex: 1 }}>{children}</div>
    </div>
)

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
        <section ref={container} style={{ minHeight: '100vh', background: '#000', padding: '120px 5vw' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '1rem', color: '#ff3b30', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase' }}>Zone 3: Architecture</h2>
                    <h3 style={{ fontSize: '3.5rem', fontWeight: 700, color: '#f5f5f7', lineHeight: 1.1, wordBreak: 'keep-all' }}>
                        Enterprise AI <br />
                        <span style={{ color: '#86868b' }}>Full-Stack Integration.</span>
                    </h3>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                    gap: '24px',
                    autoRows: 'minmax(320px, auto)'
                }}>

                    {/* Card 1: Data Integration */}
                    <BentoCard
                        colSpan={2}
                        subTitle="Data Ingestion"
                        title="Hybrid Data Lakehouse"
                        desc="ERP, CRM 같은 정형 데이터와 NAS의 비정형 문서를 통합하여 단일 진실 공급원(SSOT)을 구축합니다. 온프레미스와 클라우드 환경을 모두 지원합니다."
                        labels={['ETL Pipeline', 'Vector Embeddings', 'Real-time Sync']}
                    >
                        <div style={{ width: '100%', height: '80px', background: 'linear-gradient(90deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontFamily: 'monospace', color: '#555', fontSize: '0.8rem' }}>
                            <span>ERP</span> ➔ <span>LAKE</span> ➔ <span>VECTOR DB</span>
                        </div>
                    </BentoCard>

                    {/* Card 2: Knowledge Engine */}
                    <BentoCard
                        subTitle="Cognitive Engine"
                        title="LLM RAG Orchestration"
                        desc="GPT-4, Claude 등 최신 거대 언어 모델을 기업 데이터와 실시간으로 연동하여, 할루시네이션 없는 정확한 업무용 답변을 생성합니다."
                        labels={['Context Window Opt', 'Prompt Engineering', 'Hallucination Control']}
                    >
                        <div style={{ fontSize: '3rem', color: '#ff3b30', textAlign: 'right', opacity: 0.8 }}>⚡️</div>
                    </BentoCard>

                    {/* Card 3: Security */}
                    <BentoCard
                        subTitle="Governance"
                        title="Zero-Trust Security"
                        desc="모든 데이터 벡터에 대한 엔드투엔드 암호화 및 역할 기반 접근 제어(RBAC)로, 금융권 수준의 강력한 데이터 보안을 보장합니다."
                        labels={['SSO', 'Audit Logs', 'ISO 27001 Ready']}
                    >
                        <div style={{ fontSize: '3rem', color: '#86868b', textAlign: 'right', opacity: 0.8 }}>🛡️</div>
                    </BentoCard>

                    {/* Card 4: Workflow Automation */}
                    <BentoCard
                        colSpan={2}
                        subTitle="Actionable AI"
                        title="Autonomous Workflow Agent"
                        desc="단순 질의응답을 넘어섭니다. 자연어 명령만으로 보고서를 생성하고, 사내 API를 호출하여 복잡한 워크플로우를 스스로 수행하는 자율 에이전트입니다."
                        labels={['API Integration', 'Doc Gen', 'Decision Support']}
                    >
                        <div style={{ width: '100%', height: '60px', border: '1px dashed #444', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 20px', color: '#666', fontSize: '0.9rem' }}>
                            Input: "보고서 써줘" &nbsp; <span style={{ color: '#ff3b30' }}>➔ Processing... ➔</span> &nbsp; Output: "Report.pdf"
                        </div>
                    </BentoCard>

                </div>

            </div>
        </section>
    )
}
