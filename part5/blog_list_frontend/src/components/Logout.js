const Logout = ({setUser}) => {

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout