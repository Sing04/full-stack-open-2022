import { useEffect } from 'react'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginUserReducer'
import { Link, Routes, Route } from 'react-router-dom'
import Logout from './components/Logout'
import { useMatch } from 'react-router-dom'
import { Nav, Navbar, Container } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(user => user.id === blogMatch.params.id)
    : null

  const loginUser = useSelector(state => state.loginUser)

  const padding = {
    paddingRight: 8,
    textDecoration: 'none'
  }

  return (
    <div className='container'>
      <Navbar  expand='lg' bg='light' variant='light'>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand href="http://localhost:3000/">Blog App</Navbar.Brand>
          {loginUser &&
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to='/'>Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to='/users'>Users</Link>
              </Nav.Link>
              <em style={{ fontStyle: 'italic', marginTop: 8 }}>{loginUser.name} logged in</em> <Logout />
            </Nav>
          }
        </Container>
      </Navbar>

      <Notification />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} /> } />
        <Route path='/users' element={<Users /> } />
        <Route path='/users/:id' element={ <User user={user} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
