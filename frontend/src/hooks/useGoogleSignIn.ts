import { useCallback, useState, useEffect } from 'react'
import { googleSignIn } from './requests'

export const useGoogleSignIn = () => {
  const [user, setUser] = useState<{ verified: boolean, url: string }>({
    verified: false,
    url: '/api/auth/google'
  })

  const signIn = useCallback(async() => {
    const user = await googleSignIn()

    setUser(prev => {
      return {
        url: prev.url,
        verified: user.verified
      }
    })
  }, [])

  useEffect(() => {
    signIn()

    return
  }, [])

  return {
    user
  }
}
