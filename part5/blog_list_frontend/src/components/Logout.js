const Logout = ({ setUser }) => {

  // eslint-disable-next-line no-unused-vars
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout