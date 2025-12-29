import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { Shield, Send, ArrowRight, CheckCircle, Lock, LayoutGrid, TrendingUp, Users, Bell } from 'lucide-react'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Products from './Products'
import Chat from './Chat'

// Paste your n8n webhook URL here:
// const WEBHOOK_URL = 'https://YOUR_N8N_WEBHOOK_URL';
const WEBHOOK_URL = 'https://YOUR_N8N_WEBHOOK_URL'

function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState(null) // 'login' | 'signup' | null
  const [page, setPage] = useState('home') // 'home' | 'products' | 'chat'

  function handleLogin(u) {
    setUser(u)
    setView(null)
    setPage('chat')
  }
  function handleSignup(u) {
    setUser(u)
    setView(null)
    setPage('chat')
  }

  function openProducts() {
    setPage('products')
  }
  function openProduct(item) {
    setPage('chat')
    // We would ideally pass the product context to the chat here
  }

  return (
    <div className="app-root">
      {/* Background Ambience */}
      <div className="blobs" aria-hidden />

      {/* Main Container */}
      <div className="container" role="main">
        {/* Header / Brand (Top Left) */}
        <header className="header">
          <div className="brand" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
            <div>
              <h1 className="title">Veda</h1>
            </div>
          </div>
          <div className="header-actions">
            {!user ? (
              <button className="btn ghost small" onClick={() => setView('login')}>Sign In</button>
            ) : (
              <button className="btn ghost small" onClick={() => { setUser(null); setPage('home') }}>Logout</button>
            )}
          </div>
        </header>

        {/* Auth Forms */}
        {view === 'login' && !user && (
          <div className="modal-overlay">
            <div className="auth-wrap"><Login onLogin={handleLogin} switchToSignup={() => setView('signup')} /></div>
            <button className="close-modal" onClick={() => setView(null)}>Close</button>
          </div>
        )}
        {view === 'signup' && !user && (
          <div className="modal-overlay">
            <div className="auth-wrap"><Signup onSignup={handleSignup} switchToLogin={() => setView('login')} /></div>
            <button className="close-modal" onClick={() => setView(null)}>Close</button>
          </div>
        )}

        {/* Content */}
        <main className="content-area">
          {page === 'home' && <HomeBento openProducts={openProducts} />}
          {page === 'products' && <Products openProduct={openProduct} />}
          {page === 'chat' && user ? <Chat /> : page === 'chat' && <LoginPrompt setView={setView} />}
        </main>
      </div>

      {/* Floating Navbar (Bottom Center) */}
      <div className="floating-nav-container">
        <nav className="floating-nav">
          <button className={`nav-item ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>
            Home
          </button>
          <button className={`nav-item ${page === 'products' ? 'active' : ''}`} onClick={() => setPage('products')}>
            Schemes
          </button>
          <button className={`nav-item ${page === 'chat' ? 'active' : ''}`} onClick={() => setPage('chat')}>
            Assistant
          </button>
        </nav>
      </div>
    </div>
  )
}

function HomeBento({ openProducts }) {
  return (
    <div className="bento-grid">
      {/* Hero Cell (Span 2 col, 2 row) */}
      <div className="bento-cell hero-cell">
        <div className="hero-content">
          <div className="badge">AI-Powered Welfare</div>
          <h1 className="hero-title">Social Welfare<br />Reimagined.</h1>
          <p className="hero-sub">Direct access to thousands of government schemes. No bureaucracy, just results.</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={openProducts}>Browse Schemes <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Stat Cell */}
      <div className="bento-cell stat-cell">
        <h3>10,000+</h3>
        <p>Schemes Indexed</p>
      </div>

      {/* Feature Cell 1 */}
      <div className="bento-cell feature-cell">
        <LayoutGrid className="cell-icon" />
        <h4>Smart Match</h4>
        <p>Instant eligibility checks.</p>
      </div>

      {/* Trending Cell (New) */}
      <div className="bento-cell trending-cell">
        <div className="cell-header">
          <TrendingUp className="cell-icon-small" size={20} />
          <h4>Trending</h4>
        </div>
        <ul className="trending-list">
          <li>PM Kisan Samman</li>
          <li>Ayushman Bharat</li>
          <li>Digital India</li>
        </ul>
      </div>

      {/* Impact Cell (New) */}
      <div className="bento-cell impact-cell">
        <Users className="cell-icon" />
        <h3>5M+</h3>
        <p>Citizens Helped</p>
      </div>

      {/* Large Graphic Cell (Span 2) */}
      <div className="bento-cell graphic-cell">
        <div className="graphic-content">
          <h2>Your Rights,<br />Simplified.</h2>
          <div className="checklist">
            <div className="check-item"><CheckCircle size={16} /> Real-time Updates</div>
            <div className="check-item"><CheckCircle size={16} /> Multilingual Support</div>
            <div className="check-item"><CheckCircle size={16} /> 100% Privacy</div>
          </div>
        </div>
      </div>

      {/* Feature Cell 2 */}
      <div className="bento-cell feature-cell">
        <Lock className="cell-icon" />
        <h4>Secure</h4>
        <p>Your data stays yours.</p>
      </div>

      {/* Updates Cell (New) */}
      <div className="bento-cell updates-cell">
        <div className="update-content">
          <Bell size={16} className="shake-icon" />
          <span>New: <strong>Solar Roof Subsidy 2025</strong></span>
        </div>
      </div>
    </div>
  )
}

function LoginPrompt({ setView }) {
  return (
    <div className="login-prompt">
      <h2>Access Denied</h2>
      <p>Please sign in to access the AI Assistant.</p>
      <button className="btn primary" onClick={() => setView('login')}>Sign In</button>
    </div>
  )
}

export default App
