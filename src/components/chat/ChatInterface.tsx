'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
  id: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input, id: Date.now().toString() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [userMessage] }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const data = await response.json()
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.choices[0].message.content,
        id: Date.now().toString()
      }])
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#93939e]">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`mb-6 ${
                  message.role === 'assistant' ? 'bg-white shadow-sm p-6 rounded-2xl' : ''
                }`}
              >
                <div className={`flex items-start gap-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-indigo-600 text-white'
                      : 'bg-teal-600 text-white'
                  }`}>
                    {message.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`px-4 py-2 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <div className="prose prose-lg max-w-none">
                      {message.content}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 bg-white shadow-sm p-6 rounded-2xl"
            >
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center">
                🤖
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl px-4 py-3 bg-[#f7f7f8] focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 