import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  const header = {
    marginTop: 30,
    marginBottom: 15
  }

  const style = {
    minWidth: 60,
    textAlign: 'center',
    padding: 5,
    margin: 5
  }

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h2 style={header}>Users</h2>
      <div>
        <Table striped bordered hover responsive size="sm" className='w-auto'>
          <thead>
            <tr>
              <th style={style}>User Name</th>
              <th style={style}>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.id}>
                <td style={style}>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td style={style}>{user.blogs.length}</td>
              </tr>)
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Users