import React, { useState, useEffect } from 'react'

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 9999,
            // PC에서는 80px 고정, 모바일은 2단이므로 자동(auto)
            height: isMobile ? 'auto' : '80px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: isMobile ? '15px 0 10px 0' : '0 5%',
            boxSizing: 'border-box',
            display: 'flex',
            // PC에서는 row(한 줄), 모바일은 column(두 줄)
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center' // 모든 요소를 수직 중앙 정렬
        }}>

            {/* [1] 로고와 버튼을 감싸는 컨테이너 (모바일에서만 상단 배치용) */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: isMobile ? '100%' : 'auto', // PC에서는 필요한 만큼만 차지
                padding: isMobile ? '0 20px' : '0',
                marginBottom: isMobile ? '15px' : '0'
            }}>
                <div style={{
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    fontWeight: 700,
                    color: '#fff',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                    CursorModelLab.
                </div>

                {/* 모바일일 때만 로고 옆에 버튼 배치 */}
                {isMobile && (
                    <button onClick={() => scrollTo('contact')} style={{
                        background: '#ff3b30',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        Talk to Sales
                    </button>
                )}
            </div>

            {/* [2] 메뉴 슬라이딩 영역 */}
            <div style={{
                display: 'flex',
                gap: isMobile ? '25px' : 'clamp(20px, 3vw, 40px)',
                width: isMobile ? '100%' : 'auto',
                overflowX: isMobile ? 'auto' : 'visible',
                whiteSpace: 'nowrap',
                padding: isMobile ? '0 20px 5px 20px' : '0',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
                // PC에서는 로고와 버튼 사이 정중앙에 위치하도록 설정
                position: isMobile ? 'static' : 'absolute',
                left: isMobile ? 'auto' : '50%',
                transform: isMobile ? 'none' : 'translateX(-50%)',
                alignItems: 'center'
            }}>
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                {['Challenge', 'Solution', 'Why SMB', 'Scalability', 'Contact'].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollTo(item.replace(' ', '-').toLowerCase())}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#86868b',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#fff'}
                        onMouseLeave={(e) => e.target.style.color = '#86868b'}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* [3] PC 전용 버튼 (PC에서만 오른쪽 끝에 배치) */}
            {!isMobile && (
                <button onClick={() => scrollTo('contact')} style={{
                    background: '#ff3b30',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 22px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}>
                    Talk to Sales
                </button>
            )}
        </nav>
    )
}