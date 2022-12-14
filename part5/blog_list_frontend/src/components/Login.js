import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setNotificationMessage }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setNotificationMessage({
        message: 'Wrong username or password',
        color: 'red'
      })
      setTimeout(() => {
        setNotificationMessage({
          message: null,
          color: 'white' })
      }, 5000)
    }
  }

  return(
    <div>
      <h1>Application Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input type="text" id='username-input' value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password:
          <input type="password" id='password-input' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button type="submit" id='login-button'>Login</button>
        </div>
      </form>
    </div>
  )
}
export default Login