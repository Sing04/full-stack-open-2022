import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notifications

  const style = notification.show !== true
    ? { display: 'none' }
    : { border: 'solid', padding: 10, borderWidth: 1 }
  
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications