
const BlogButton = ({ handleClick, className, buttonText }) => {

  return (
    <button onClick={handleClick} className={className}>{buttonText}</button>
  )
}

export default BlogButton