const User = ({ user }) => {

  const header = {
    marginTop: 30,
    marginBottom: 15
  }

  if(!user) {
    return null
  }

  return (
    <div>
      <h2 style={header}>{user.name}</h2>
      <h5 style={header}>Added Blogs</h5>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.title}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User