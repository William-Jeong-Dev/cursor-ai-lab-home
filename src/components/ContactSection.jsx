import React, { useState } from 'react'

export default function ContactSection() {
    const [formData, setFormData] = useState({
        managerName: '',
        companyName: '',
        contactInfo: '',
        content: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { managerName, companyName, contactInfo, content } = formData

        const subject = `[문의] ${companyName} - ${managerName}님`
        const body = `
담당자명: ${managerName}
회사명: ${companyName}
연락처: ${contactInfo}

문의내용:
${content}
        `.trim()

        window.location.href = `mailto:jsy1379@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
        <section id="contact" style={{ padding: '150px 5vw', background: '#000', borderTop: '1px solid #111', textAlign: 'center' }}>
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
                        <input
                            type="text"
                            name="managerName"
                            placeholder="담당자명 (Manager Name)"
                            value={formData.managerName}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            name="companyName"
                            placeholder="회사명 (Company Name)"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <input
                        type="text"
                        name="contactInfo"
                        placeholder="연락처 (Phone/Email)"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <textarea
                        name="content"
                        placeholder="문의내용을 자유롭게 입력해주세요."
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={5}
                        style={{ ...inputStyle, resize: 'vertical' }}
                    />

                    <button type="submit" style={{
                        width: '100%',
                        padding: '20px',
                        background: '#ff3b30',
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        borderRadius: '40px',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '1rem',
                        transition: 'transform 0.2s',
                    }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        문의하기 (Send)
                    </button>
                </form>
            </div>
        </section>
    )
}
