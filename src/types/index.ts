export interface User {
  id: string
  email: string
  full_name: string
  role: 'user' | 'admin'
  last_login: string
}

export interface Conversation {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
  status: 'active' | 'archived'
}

export interface Message {
  id: string
  conversation_id: string
  content: string
  role: 'user' | 'assistant'
  created_at: string
  tokens: number
}

export interface Document {
  id: string
  user_id: string
  title: string
  content: string
  document_type: 'contract' | 'brief' | 'letter' | 'other'
  created_at: string
  updated_at: string
} 