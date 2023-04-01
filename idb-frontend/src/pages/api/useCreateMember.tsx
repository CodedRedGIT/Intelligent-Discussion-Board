import { useState } from 'react'
import axios from 'axios'

interface CreateMemberOptions {
  email: string
  password: string
}

interface CreateMemberResult {
  data: any
  error: string | null
}

const useCreateMember = (): [
  (options: CreateMemberOptions) => Promise<CreateMemberResult>,
  boolean,
] => {
  const [loading, setLoading] = useState<boolean>(false)

  const createMember = async ({
    email,
    password,
  }: CreateMemberOptions): Promise<CreateMemberResult> => {
    setLoading(true)

    try {
      const response = await axios.post('/api/members/create/', {
        email,
        password,
      })

      setLoading(false)

      return { data: response.data, error: null }
    } catch (error: any) {
      setLoading(false)

      if (error.response && error.response.data && error.response.data.error) {
        return { data: null, error: error.response.data.error }
      } else {
        return { data: null, error: 'An unknown error occurred.' }
      }
    }
  }

  return [createMember, loading]
}

export default useCreateMember
