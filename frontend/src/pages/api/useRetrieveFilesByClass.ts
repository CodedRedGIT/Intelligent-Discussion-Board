import { useState, useEffect } from 'react'

interface File {
  id: string
  name: string
  size: number
  type: string
  created_at: string
}

interface Class {
  id: string
  class_section: string
  files: File[]
}

interface UseRetrieveFilesByClassResult {
  classesWithFiles: Class[]
  loading: boolean
  error: string | null
}

const useRetrieveFilesByClass = (
  memberId: string,
): UseRetrieveFilesByClassResult => {
  const [classesWithFiles, setClassesWithFiles] = useState<Class[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClassesWithFiles = async () => {
      setLoading(true)

      if (!memberId) return

      try {
        const response = await fetch(
          `http://localhost:8000/api/classes/${memberId}/files/`,
        )
        const data = await response.json()
        setClassesWithFiles(data)
      } catch (error) {
        setError('Error retrieving classes with files')
      }

      setLoading(false)
    }

    fetchClassesWithFiles()
  }, [memberId])

  return { classesWithFiles, loading, error }
}

export default useRetrieveFilesByClass
