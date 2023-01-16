import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hideWhenVisible} className='toggable-button'>
        <Button style={{ marginBottom: 10 }} variant='outline-secondary' size='sm' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className='toggableContent'>
        {props.children}
        <Button variant='outline-secondary' size='sm' style= {{ marginBottom: 10 }} onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
}

export default Toggable