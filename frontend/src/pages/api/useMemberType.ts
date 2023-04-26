import { useState } from 'react'
import axios from 'axios'

export const useGetMemberType = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [memberType, setMemberType] = useState<string>('')

  const getMemberType = async (memberId: string) => {
    setIsLoading(true)

    try {
      const response = await axios.get(
        `http://localhost:8000/api/members/${memberId}/type/`,
      )

      if (!response.data.memberType) {
        throw new Error('No member type found')
      }

      setMemberType(response.data.memberType)
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
    memberType,
    getMemberType,
  }
}
