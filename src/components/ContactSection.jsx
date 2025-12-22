import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactSection() {
    const [formData, setFormData] = useState({
        managerName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        content: ''
    })

    // 모달 상태 통합 관리
    const [modal, setModal] = useState({
        show: false,
        title: '',
        message: '',
        isError: false
    });

    const openModal = (title, message, isError = false) => {
        setModal({ show: true, title, message, isError });
    };

    const formatPhoneNumber = (value) => {
        const nums = value.replace(/[^\d]/g, "");
        if (nums.length <= 3) return nums;
        if (nums.length <= 7) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
        return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber') {
            setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return { valid: false, message: "올바른 이메일 형식이 아닙니다." };

        const commonTypos = {
            'gmil.com': 'gmail.com', 'gmial.com': 'gmail.com',
            'nver.com': 'naver.com', 'naver.co': 'naver.com',
            'daum.n': 'daum.net', 'hotmial.com': 'hotmail.com'
        };

        const domain = email.split('@')[1];
        if (commonTypos[domain]) {
            return { valid: false, message: `이메일 도메인이 '${domain}' 맞나요?\n'${commonTypos[domain]}'의 오타인지 확인해주세요.` };
        }
        return { valid: true };
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // 연락처 검증
        const pureNumbers = formData.phoneNumber.replace(/[^\d]/g, "");
        if (pureNumbers.length !== 11) {
            openModal("입력 오류", "연락처 11자리를 정확히 입력해주세요.", true);
            return;
        }

        // 이메일 검증
        const emailCheck = validateEmail(formData.email);
        if (!emailCheck.valid) {
            openModal("이메일 확인", emailCheck.message, true);
            return;
        }

        const templateParams = {
            title: `[홈페이지 문의] ${formData.companyName}`,
            name: formData.managerName,
            email: formData.email,
            phone: formData.phoneNumber,
            message: formData.content
        };

        emailjs.send('service_milglct', 'template_fmu58t4', templateParams, 'F0S62Or_YwG9s0r9d')
            .then(() => {
                openModal("접수 완료", "담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.");
                setFormData({ managerName: '', companyName: '', email: '', phoneNumber: '', content: '' });
            })
            .catch((err) => {
                openModal("전송 실패", "오류가 발생했습니다. 잠시 후 다시 시도해주세요.", true);
                console.error(err);
            });
    }

    const inputStyle = {
        width: '100%', padding: '1rem', background: '#1d1d1f', border: '1px solid #333',
        borderRadius: '12px', color: '#f5f5f7', fontSize: '1rem', marginBottom: '1rem',
        outline: 'none', boxSizing: 'border-box'
    }

    return (
        <section id="contact" style={{ padding: '150px 5vw', background: '#000', textAlign: 'center', position: 'relative' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 700, color: '#f5f5f7', marginBottom: '40px' }}>
                    Ready to <span style={{ color: '#ff3b30' }}>Flow?</span>
                </h2>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input type="text" name="managerName" placeholder="담당자명" value={formData.managerName} onChange={handleChange} required style={inputStyle} />
                        <input type="text" name="companyName" placeholder="회사명" value={formData.companyName} onChange={handleChange} required style={inputStyle} />
                    </div>
                    <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} required style={inputStyle} />
                    <input type="tel" name="phoneNumber" placeholder="연락처 (010-0000-0000)" value={formData.phoneNumber} onChange={handleChange} maxLength={13} required style={inputStyle} />
                    <textarea name="content" placeholder="문의내용" value={formData.content} onChange={handleChange} required rows={5} style={{ ...inputStyle, resize: 'vertical' }} />

                    <button type="submit" style={{
                        width: '100%', padding: '20px', background: '#ff3b30', color: '#fff', fontSize: '1.2rem', fontWeight: 600, borderRadius: '40px', border: 'none', cursor: 'pointer'
                    }}>
                        문의하기 (Send)
                    </button>
                </form>
            </div>

            {/* --- 통합 커스텀 모달 --- */}
            {modal.show && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: 'rgba(30, 30, 30, 0.9)', padding: '40px', borderRadius: '24px',
                        border: `1px solid ${modal.isError ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 59, 48, 0.3)'}`,
                        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)', textAlign: 'center', maxWidth: '400px', width: '90%'
                    }}>
                        <div style={{ fontSize: '1.2rem', color: '#86868b', marginBottom: '10px' }}>
                            {modal.isError ? 'Notice' : 'Success'}
                        </div>
                        <h3 style={{ fontSize: '1.8rem', color: '#f5f5f7', marginBottom: '15px' }}>{modal.title}</h3>
                        <p style={{ color: '#86868b', marginBottom: '30px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {modal.message}
                        </p>
                        <button
                            onClick={() => setModal({ ...modal, show: false })}
                            style={{
                                background: '#ff3b30', color: '#fff', border: 'none',
                                padding: '12px 40px', borderRadius: '30px', fontSize: '1.1rem',
                                fontWeight: 600, cursor: 'pointer'
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