import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { messages } = await req.json()
    console.log('Received messages:', messages)

    // Initialize Gemini AI with Gemini 2.0 Flash model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    try {
      // Format messages for Gemini
      const result = await model.generateContent({
        contents: [{
          parts: [{ text: messages[messages.length - 1].content }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      })

      const response = await result.response.text()

      // Create completion format similar to OpenAI for consistency
      const completion = {
        choices: [
          {
            message: {
              role: 'assistant',
              content: response
            }
          }
        ]
      }

      // Store conversation in database
      if (response) {
        try {
          const { data: conversation, error: convError } = await supabase
            .from('conversations')
            .insert({
              user_id: session.user.id,
              title: messages[0].content.slice(0, 50) + '...',
              status: 'active'
            })
            .select()
            .single()

          if (convError) {
            console.error('Database error storing conversation:', convError)
          } else if (conversation) {
            const { error: msgError } = await supabase.from('messages').insert([
              {
                conversation_id: conversation.id,
                content: messages[messages.length - 1].content,
                role: messages[messages.length - 1].role
              },
              {
                conversation_id: conversation.id,
                content: response,
                role: 'assistant'
              }
            ])

            if (msgError) {
              console.error('Database error storing messages:', msgError)
            }
          }
        } catch (dbError) {
          console.error('Database operation failed:', dbError)
        }
      }

      return NextResponse.json(completion)
    } catch (apiError: any) {
      console.error('Gemini API error:', apiError)
      throw new Error(`API error: ${apiError.message}`)
    }
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return new NextResponse(
      JSON.stringify({ error: error.message || 'Internal Server Error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    )
  }
} 