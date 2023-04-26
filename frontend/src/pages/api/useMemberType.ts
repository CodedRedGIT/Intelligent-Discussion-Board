import { useState, useEffect } from 'react'

interface MemberTypeResponse {
  memberType: string | null
  error: string | null
}

const useRetrieveMemberType = (
  memberId: string | undefined,
): MemberTypeResponse => {
  const [memberTypeInfo, setMemberTypeInfo] = useState<MemberTypeResponse>({
    memberType: null,
    error: null,
  })

  useEffect(() => {
    if (!memberId) return
    const fetchMemberTypeInfo = async () => {
      try {
        const memberTypeResponse = await fetch(
          `http://localhost:8000/api/members/${memberId}/type/`,
        )
        const memberTypeData = await memberTypeResponse.json()

        setMemberTypeInfo({ memberType: memberTypeData, error: null })
      } catch (error) {
        console.error(error)
        setMemberTypeInfo({
          memberType: null,
          error: 'Failed to retrieve member type information',
        })
      }
    }

    fetchMemberTypeInfo()
  }, [memberId])

  return memberTypeInfo
}

export default useRetrieveMemberType
