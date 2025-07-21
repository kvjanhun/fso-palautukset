const Header = (props) => <h1>{props.course}</h1>
const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    <hr />
    <Total total={getTotalExercises(props.parts)} />
  </div>
)
const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)
const Total = (props) => <p><strong>Total of {props.total} exercises</strong></p>

const getTotalExercises = (parts) =>
  parts.reduce((sum, part) => sum + part.exercises, 0)

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
        name: 'Nonsense for testing',
        exercises: 69,
        id: 5
      }
    ],
  }

  const Course = () => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )

  return (
    <>
      <Course course={course} />
    </>
  )
}

export default App
