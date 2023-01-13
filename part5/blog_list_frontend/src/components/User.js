const User = () => {
  const user = ''
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  )
}