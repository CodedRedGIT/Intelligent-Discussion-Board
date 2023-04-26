import { useState } from 'react'
import axios from 'axios'

export const useSaveFileForClass = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const saveFileForClass = async (classId: string, file: File) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('class_id', classId)

      const response = await axios.post(
        `http://localhost:8000/api/classes/save_file/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (!response.data.success) {
        throw new Error(response.data.error)
      }

      setSuccess(true)
      setError(null)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    success,
    saveFileForClass,
  }
}
