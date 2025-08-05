import { useGoogleSignIn } from './hooks/useGoogleSignIn'
import Layout from './routes/Layout'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const App = () => {
  const navigate = useNavigate()
  const { user } = useGoogleSignIn()

  useEffect(() => {
    if (!user?.verified) navigate('/login')
    if (user?.verified) navigate('/launch')
  }, [user.verified])

  return (
    <Layout user={user}/>
  )
}

export default App
