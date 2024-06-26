import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/messageReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const success = await performLogin(username, password)

    if (success) {
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

  return (
    <div className="container is-max-desktop">
      <br />
      <h2 className="title">Log in:</h2>
      <form className="form">
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              id="login-username"
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
              id="login-password"
              className="input"
            />
          </div>
        </div>
        <button
          className="button"
          type="submit"
          onClick={handleSubmit}
          id="login-button"
        >
          Log in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
