import axios from 'axios'
import { useState, useEffect } from 'react'

interface Class {
  id: string
  class_section: string
  // Add other properties here as needed
}

export const useGetAllClasses = () => {
  const [classes, setClasses] = useState<Class[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get('http://localhost:8000/api/classes/')

        if (!response.data) {
          throw new Error('Unable to fetch classes.')
        }

        setClasses(response.data)
        setError(null)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClasses()
  }, [])

  return {
    classes,
    isLoading,
    error,
  }
}
