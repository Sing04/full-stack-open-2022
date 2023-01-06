import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  const style = notification.show !== true
    ? { display: 'none' }
    : { border: 'solid', padding: 10, borderWidth: 1 }
  
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification