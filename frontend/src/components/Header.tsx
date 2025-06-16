import { Link } from 'react-router'

const Header = () => {

  return (
    <nav className='navigation'>
      <Link className='' to="/">
        <i className="material-icons">home</i>
      </Link>
      <Link className='' to="/launch">
        <i className="material-icons">launch</i>
      </Link>
      <Link className='' to="/upcoming">
        <i className="material-icons">update</i>
      </Link>
      <Link className='' to="/history">
        <i className="material-icons">history</i>
      </Link>
    </nav>
  )

}

export default Header
