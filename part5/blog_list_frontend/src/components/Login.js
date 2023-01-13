import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { createNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { setUser } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('text', 'username')
  const { reset: resetPassword, ...password } = useField('password', 'password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      dispatch(setUser(user))
      resetUsername('')
      resetPassword('')

    } catch (error) {
      dispatch(createNotification('Wrong username or password', 'red', 5))
    }
  }

  return(
    <div>
      <h1>Application Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input {...username} id='username-input' />
        </div>
        <div>
          password:
          <input {...password} id='password-input' />
        </div>
        <div>
          <button type="submit" id='login-button'>Login</button>
        </div>
      </form>
    </div>
  )
}
export default Login