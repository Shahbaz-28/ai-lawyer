'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import DocumentEditor from './DocumentEditor'

interface Document {
  id: string
  title: string
  content: string
  document_type: string
  created_at: string
}

export default function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  useEffect(() => {
    loadDocuments()
  }, [])

  async function loadDocuments() {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDocuments(data || [])
    } catch (error) {
      console.error('Error loading documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDocument = () => {
    setSelectedDocument({
      id: '',
      title: 'New Document',
      content: '',
      document_type: 'other',
      created_at: new Date().toISOString()
    })
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Documents</h2>
        <button
          onClick={handleCreateDocument}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create New Document
        </button>
      </div>

      {loading ? (
        <div>Loading documents...</div>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDocument(doc)}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <h3 className="font-medium">{doc.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(doc.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedDocument && (
        <DocumentEditor
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onSave={() => {
            loadDocuments()
            setSelectedDocument(null)
          }}
        />
      )}
    </div>
  )
} 