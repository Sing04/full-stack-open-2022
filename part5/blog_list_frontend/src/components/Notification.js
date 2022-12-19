const Notification = (props) => {
  const notification = props.message;

  const notificationStyle = {
    fontSize: 20,
    color: notification.color,
    border: `2px solid ${notification.color}`,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#CCCCCC'
  }
  if (notification.message === null){
    return <div></div>
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification