import { Button } from 'react-bootstrap'
const BlogButton = ({ handleClick, className, buttonText }) => {

  return (
    <Button variant='outline-primary' size='sm' onClick={handleClick} className={className}>{buttonText}</Button>
  )
}

export default BlogButton