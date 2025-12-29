import React, { useState } from 'react'

export default function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Please fill in all fields.')
    setLoading(true)
    // Simulate auth request. Replace with real API call.
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    // Very simple demo validation
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    onLogin({ email })
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Sign in to Veda</p>
      </div>

      <form className="auth-form" onSubmit={submit}>
        <div className="input-group">
          <input
            className="auth-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-actions">
          <button className="btn primary full-width" type="submit" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
          <div className="divider">or</div>
          <button type="button" className="btn ghost full-width" onClick={switchToSignup}>
            Create an Account
          </button>
        </div>
      </form>
    </div>
  )
}
