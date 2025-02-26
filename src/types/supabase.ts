export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          content: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          content: string
          role: string
          created_at?: string
        }
      }
    }
  }
} 