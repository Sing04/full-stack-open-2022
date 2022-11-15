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

const Header = (header) => (<h1>{header.title}</h1>)
  
const Content = (content) => (<p>{content.name} {content.exercises}</p>)

const Total = (total) => (<strong>total of {total.sum} exercises</strong>)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
