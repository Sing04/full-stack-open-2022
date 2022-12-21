
const BlogButton = ({ handleClick, className, buttonText }) => {

  return (
    <div>
      <button onClick={handleClick} className={className}>{buttonText}</button>
    </div>
  )
}

export default BlogButton