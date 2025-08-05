import { useNavigate } from 'react-router'

const Login = ({ url }: { url: string }) => {

  const nav = useNavigate()

  return (
    <button onClick={() => {
      nav(url)
      // TODO: should be something better than this
      window.location.reload()
    }}>Google Sign In</button>
  )
}

export default Login
