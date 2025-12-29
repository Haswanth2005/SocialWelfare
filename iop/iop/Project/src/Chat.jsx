import React, { useEffect, useRef, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'

const WEBHOOK_URL = 'https://YOUR_N8N_WEBHOOK_URL'

const SUGGESTIONS = [
  "Check my eligibility for PM Kisan",
  "List scholarships for students",
  "How to apply for Ration Card?",
  "Schemes for women entrepreneurs"
]

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hey! I\'m Veda, your social welfare eligibility assistant. Ask me about any government schemes, and I\'ll help you check if you qualify.' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  async function handleSendMessage(e, customText) {
    e?.preventDefault()
    const text = customText || input.trim()
    if (!text) return

    const userMsg = { id: Date.now(), sender: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      let botText = ''
      try {
        const data = await res.json()
        botText = data?.reply || data?.message || data?.result || JSON.stringify(data)
      } catch (err) {
        try {
          botText = await res.text()
        } catch (err2) {
          botText = 'Sorry, I could not parse the response.'
        }
      }

      const botMsg = { id: Date.now() + 1, sender: 'bot', text: botText }
      setMessages((m) => [...m, botMsg])
    } catch (err) {
      const errorMsg = { id: Date.now() + 1, sender: 'bot', text: 'Network error. Please try again.' }
      setMessages((m) => [...m, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-title-row">
          <Sparkles size={18} className="chat-icon" />
          <h2>Veda Assistant</h2>
        </div>
        <p>AI-powered government scheme guidance</p>
      </div>

      <div className="messages" role="log" aria-atomic="false">
        {messages.map((m) => (
          <div key={m.id} className={`message-row ${m.sender}`}>
            {m.sender === 'bot' && <div className="avatar bot-avatar" aria-hidden>V</div>}
            <div className={`bubble ${m.sender}`}>
              <div className="bubble-text">{m.text}</div>
            </div>
            {m.sender === 'user' && <div className="avatar user-avatar" aria-hidden>U</div>}
          </div>
        ))}

        {isLoading && (
          <div className="message-row bot">
            <div className="avatar bot-avatar" aria-hidden>V</div>
            <div className="bubble bot typing-bubble">
              <div className="typing-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        {messages.length < 3 && !isLoading && (
          <div className="suggestions">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className="suggestion-chip" onClick={(e) => handleSendMessage(e, s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <form className="input-bar" onSubmit={handleSendMessage} aria-label="Send message form">
          <input
            id="chat-input"
            className="input-pill"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
          />
          <button className="send-btn" type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
