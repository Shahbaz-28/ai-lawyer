'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface Document {
  id: string
  title: string
  content: string
  document_type: string
  created_at: string
}

interface DocumentEditorProps {
  document: Document
  onClose: () => void
  onSave: () => void
}

export default function DocumentEditor({ document, onClose, onSave }: DocumentEditorProps) {
  const [title, setTitle] = useState(document.title)
  const [content, setContent] = useState(document.content)
  const [type, setType] = useState(document.document_type)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      if (document.id) {
        // Update existing document
        await supabase
          .from('documents')
          .update({
            title,
            content,
            document_type: type,
            updated_at: new Date().toISOString()
          })
          .eq('id', document.id)
      } else {
        // Create new document
        await supabase.from('documents').insert({
          title,
          content,
          document_type: type
        })
      }
      onSave()
    } catch (error) {
      console.error('Error saving document:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl font-bold border-b-2 border-gray-200 focus:border-blue-500 outline-none"
            placeholder="Document Title"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="contract">Contract</option>
          <option value="brief">Brief</option>
          <option value="letter">Letter</option>
          <option value="other">Other</option>
        </select>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your document content..."
        />

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
} 