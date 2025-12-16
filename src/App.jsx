import React from 'react'
import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ChallengeSection from './components/ChallengeSection'
import SolutionSection from './components/SolutionSection'
import FeaturesSection from './components/FeaturesSection'
import WhySMBSection from './components/WhySMBSection'
import ScalabilitySection from './components/ScalabilitySection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            <Navbar />
            <div className="App">
                <div id="hero"><HeroSection /></div>
                <div id="challenge"><ChallengeSection /></div>
                <div id="solution"><SolutionSection /></div>
                <div id="why-smb"><WhySMBSection /></div>
                <FeaturesSection />
                <div id="scalability"><ScalabilitySection /></div>
                <div id="contact"><ContactSection /></div>
                <Footer />
            </div>
        </ReactLenis>
    )
}

export default App
