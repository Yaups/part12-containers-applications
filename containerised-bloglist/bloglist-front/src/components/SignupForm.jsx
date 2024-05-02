import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/messageReducer'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const signupSuccess = await performSignup(username, password, name)

    let loginSuccess
    if (signupSuccess) {
      loginSuccess = await performLogin(username, password)
    }

    if (loginSuccess) {
      setName('')
      setUsername('')
      setPassword('')

      navigate('/')
    }
  }

  const performLogin = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password })

      if (response) {
        dispatch(setUser(response.data))
        window.localStorage.setItem('user', JSON.stringify(response.data))
        return true
      }
      return false
    } catch {
      dispatch(
        setNotification(
          'Login failed. Check username/password and connection to server.',
          5,
          true,
        ),
      )
      return false
    }
  }

  const performSignup = async (username, password) => {
    try {
      await axios.post('/api/users', { username, password, name })
      return true
    } catch {
      dispatch(setNotification('Signup failed. :(', 5, true))
      return false
    }
  }

  return (
    <div className="container is-max-desktop">
      <br />
      <h2 className="title">Sign up:</h2>
      <form className="form">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
              id="signup-name"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              id="signup-username"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id="signup-password"
              className="input"
            />
          </div>
        </div>
        <button
          className="button"
          type="submit"
          onClick={handleSubmit}
          id="signup-button"
        >
          Sign up
        </button>
      </form>
    </div>
  )
}

export default SignupForm
