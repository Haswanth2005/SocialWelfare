import React, { useState } from 'react'

export default function Signup({ onSignup, switchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password || !confirm) return setError('Please fill in all fields.')
    if (password !== confirm) return setError('Passwords do not match.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    // Simulate signup. Replace with real API call.
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    onSignup({ email })
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Join Veda</h2>
        <p className="auth-sub">Start your journey today</p>
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
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            className="auth-input"
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-actions">
          <button className="btn primary full-width" type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <div className="divider">or</div>
          <button type="button" className="btn ghost full-width" onClick={switchToLogin}>
            Already have an account? Log In
          </button>
        </div>
      </form>
    </div>
  )
}
