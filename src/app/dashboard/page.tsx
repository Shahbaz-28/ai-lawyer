import ChatInterface from '@/components/chat/ChatInterface'

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">AI Legal Assistant</h1>
      <ChatInterface />
    </div>
  )
} 