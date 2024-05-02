import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const NavBar = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('user')
  }

  return (
    <div>
      <hr />
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-blog-app"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar-blog-app" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/blogs">
              Blogs
            </Link>
            <Link className="navbar-item" to="/users">
              Users
            </Link>
            {!user && (
              <Link className="navbar-item" to="/login">
                Log in
              </Link>
            )}
            {!user && (
              <Link className="navbar-item" to="/signup">
                Sign Up
              </Link>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {user && (
                <div className="buttons">
                  <i>Logged in as {user ? user.name : 'not logged in'} </i>
                  <button
                    onClick={logout}
                    className="button is-info is-light is-rounded"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </div>
  )
}

export default NavBar
