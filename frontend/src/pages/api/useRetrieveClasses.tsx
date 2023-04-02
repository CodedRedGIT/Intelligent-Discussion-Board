import { useState, useEffect } from 'react'

interface Class {
  id: string
  class_section: string
}

interface UseRetrieveClassesByMemberResult {
  classes: Class[]
  loading: boolean
  error: string | null
}

const useRetrieveClassesByMember = (
  memberId: string,
): UseRetrieveClassesByMemberResult => {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `http://localhost:8000/api/members/${memberId}/classes/`,
        )
        const data = await response.json()
        setClasses(data)
      } catch (error) {
        setError('Error retrieving classes')
      }

      setLoading(false)
    }

    fetchClasses()
  }, [memberId])

  return { classes, loading, error }
}

export default useRetrieveClassesByMember
