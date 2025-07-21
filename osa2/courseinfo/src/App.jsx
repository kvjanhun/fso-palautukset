const Header = ({ text }) => <h1>{text}</h1>
const SubHeader = ({ text }) => <h2>{text}</h2>
const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    <Total total={getTotalExercises(props.parts)} />
  </div>
)
const Course = ({ course }) => (
    <div>
      <SubHeader text={course.name} />
      <Content parts={course.parts} />
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
  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <Header text="Web development curriculum" />
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  )
}

export default App
