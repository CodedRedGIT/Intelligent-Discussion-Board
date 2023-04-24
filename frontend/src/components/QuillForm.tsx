import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { useCreateReply } from '@/pages/api/useCreateReply'
import { useSessionContext } from '@/pages/api/auth/session'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ReactDOM from 'react-dom'
import { Editor, EditorState } from 'draft-js'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditorCore from 'suneditor/src/lib/core'

interface Props {
  post_id: string
}
const Quill: React.FC<Props> = ({ post_id }) => {
  const SunEditor = dynamic(() => import('suneditor-react'), {
    //besure to import dynamically
    ssr: false,
  })

  const editor = useRef<SunEditorCore>()
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor
  }

  const [prompt, setPrompt] = useState('')
  const { sessionData } = useSessionContext()
  const member_id = sessionData?.user_id
  const {
    isLoading: isCreating,
    error: createError,
    success,
    createReply,
  } = useCreateReply()

  const handleChange = (e: string) => {
    setPrompt(e)
  }

  const handleSubmit = () => {
    createReply({ member_id, prompt, post_id })
    alert('Reply posted')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SunEditor
          getSunEditorInstance={getSunEditorInstance}
          onChange={handleChange}
        />
        <div style={{ textAlign: 'right' }}>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default Quill
