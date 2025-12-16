export default function Footer() {
    return (
        <footer style={{
            background: '#0a0a0a',
            padding: '80px 5vw 40px',
            borderTop: '1px solid #1d1d1f',
            color: '#86868b',
            fontSize: '0.9rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>

                    {/* Brand / Main Info */}
                    <div>
                        <h4 style={{ color: '#f5f5f7', fontSize: '1.2rem', marginBottom: '20px' }}>CursorModelLab</h4>
                        <p style={{ lineHeight: '1.6' }}>
                            법인명: 커서뭐될랩 <br />
                            대표자: 장성윤 <br />
                            주소: 경기도 양주시 독바위로 46-121
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: '#f5f5f7', fontSize: '1rem', marginBottom: '20px' }}>Contact</h4>
                        <a href="mailto:jsy1379@gmail.com" style={{ color: '#86868b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = '#86868b'}>
                            jsy1379@gmail.com
                        </a>
                    </div>
                </div>

                <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #1d1d1f', textAlign: 'center', fontSize: '0.8rem' }}>
                    &copy; {new Date().getFullYear()} CursorModelLab. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
