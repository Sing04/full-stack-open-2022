import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

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
    <div className='notification' style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification