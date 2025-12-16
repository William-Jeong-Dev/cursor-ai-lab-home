import React from 'react'

export default function Navbar() {
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
            zIndex: 1000,
            padding: '20px 50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            {/* Logo */}
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f5f5f7', letterSpacing: '-0.02em', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
                CursorModelLab.
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '40px' }}>
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
                            transition: 'color 0.2s'
                        }}
                        onMouseOver={e => e.target.style.color = '#fff'}
                        onMouseOut={e => e.target.style.color = '#86868b'}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* CTA */}
            <button onClick={() => scrollTo('contact')} style={{
                background: '#ff3b30',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer'
            }}>
                Talk to Sales
            </button>
        </nav>
    )
}
