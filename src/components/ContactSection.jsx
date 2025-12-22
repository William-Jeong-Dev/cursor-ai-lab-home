import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactSection() {
    const [formData, setFormData] = useState({
        managerName: '',
        companyName: '',
        contactInfo: '',
        content: ''
    })

    // 모달 상태 관리
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const templateParams = {
            title: `[홈페이지 문의] ${formData.companyName}`,
            name: formData.managerName,
            email: formData.contactInfo,
            message: formData.content
        };

        emailjs.send(
            'service_milglct',
            'template_fmu58t4', // 본인의 템플릿 ID로 교체
            templateParams,
            'F0S62Or_YwG9s0r9d'   // 본인의 퍼블릭 키로 교체
        )
            .then(() => {
                // 전송 성공 시 커스텀 모달 띄우기
                setShowModal(true);
                setFormData({
                    managerName: '',
                    companyName: '',
                    contactInfo: '',
                    content: ''
                })
            })
            .catch((err) => {
                alert("전송 중 오류가 발생했습니다.")
                console.error(err)
            })
    }

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        background: '#1d1d1f',
        border: '1px solid #333',
        borderRadius: '12px',
        color: '#f5f5f7',
        fontSize: '1rem',
        marginBottom: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    }

    return (
        <section id="contact" style={{ padding: '150px 5vw', background: '#000', borderTop: '1px solid #111', textAlign: 'center', position: 'relative' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 700, color: '#f5f5f7', marginBottom: '40px', letterSpacing: '-0.02em' }}>
                    Ready to <span style={{ color: '#ff3b30' }}>Flow?</span>
                </h2>
                <p style={{ fontSize: '1.5rem', color: '#86868b', marginBottom: '60px' }}>
                    문의 내용을 남겨주시면<br />
                    담당자가 빠르게 확인 후 연락드리겠습니다.
                </p>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input type="text" name="managerName" placeholder="담당자명 (Manager Name)" value={formData.managerName} onChange={handleChange} required style={inputStyle} />
                        <input type="text" name="companyName" placeholder="회사명 (Company Name)" value={formData.companyName} onChange={handleChange} required style={inputStyle} />
                    </div>
                    <input type="text" name="contactInfo" placeholder="연락처 (Phone/Email)" value={formData.contactInfo} onChange={handleChange} required style={inputStyle} />
                    <textarea name="content" placeholder="문의내용을 자유롭게 입력해주세요." value={formData.content} onChange={handleChange} required rows={5} style={{ ...inputStyle, resize: 'vertical' }} />

                    <button type="submit" style={{
                        width: '100%', padding: '20px', background: '#ff3b30', color: '#fff', fontSize: '1.2rem', fontWeight: 600, borderRadius: '40px', border: 'none', cursor: 'pointer', marginTop: '1rem', transition: 'transform 0.2s',
                    }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        문의하기 (Send)
                    </button>
                </form>
            </div>

            {/* --- 커스텀 모달 (팝업창) --- */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: 'rgba(30, 30, 30, 0.8)',
                        padding: '40px',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 59, 48, 0.3)',
                        boxShadow: '0 0 30px rgba(255, 59, 48, 0.2)',
                        textAlign: 'center',
                        maxWidth: '400px',
                        width: '90%'
                    }}>
                        <div style={{ fontSize: '1.2rem', color: '#86868b', marginBottom: '10px' }}>Contact Us</div>
                        <h3 style={{ fontSize: '2rem', color: '#f5f5f7', marginBottom: '20px', lineHeight: '1.4' }}>
                            접수가 완료되었습니다.
                        </h3>
                        <p style={{ color: '#86868b', marginBottom: '30px', lineHeight: '1.6' }}>
                            담당자가 확인 후<br />빠른 시일 내에 연락드리겠습니다.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                background: '#ff3b30', color: '#fff', border: 'none',
                                padding: '12px 40px', borderRadius: '30px', fontSize: '1.1rem',
                                fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 59, 48, 0.4)'
                            }}
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}