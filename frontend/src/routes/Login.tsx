import { Link } from 'react-router'
import { googleSignIn } from '../hooks/requests'

const Login = () => {

  return (
    <>
      {/* <button onClick={async() => await googleSignIn()}>try</button> */}
      <Link to={'https://localhost:9000/api/auth/google'}>Google Sign In</Link>
    </>

  )
}

export default Login
