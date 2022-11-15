const Course = ({course}) => {

    const sum = course.parts.reduce((sum, exercises) => sum + exercises.exercises, 0)
  
    return(
      <div>
        <Header title={course.name} />
        {course.parts.map(part => <Content key={part.id} name={part.name} exercises={part.exercises} />)}
        <Total sum={sum} />
      </div>
    )
}

const Header = (header) => (<h2>{header.title}</h2>)
  
const Content = (content) => (<p>{content.name} {content.exercises}</p>)

const Total = (total) => (<strong>total of {total.sum} exercises</strong>)

export default Course