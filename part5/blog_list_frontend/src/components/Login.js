import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { createNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { setUser } from '../reducers/loginUserReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      navigate('/')

    } catch (error) {
      dispatch(createNotification('Wrong username or password', 'red', 5))
    }
  }

  const header = {
    marginTop: 30,
    marginBottom: 15
  }

  return(
    <div>
      <h1 style={header}>Application Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            {...username} id='username-input'
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            {...password} id='password-input'
          />
          <Button variant='primary' type="submit" id='login-button'>
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default Login