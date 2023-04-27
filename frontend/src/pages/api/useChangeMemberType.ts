import { useState } from 'react'
import axios from 'axios'

const useChangeMemberType = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<{ message: string } | null>(null)
  const [data, setData] = useState(null)

  const changeMemberType = async (memberId: string | undefined) => {
    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await axios.post(
        `http://localhost:8000/api/members/${memberId}/change-type/`,
      )
      setData(response.data)
    } catch (error: any) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  return { changeMemberType, isLoading, error, data }
}

export default useChangeMemberType
