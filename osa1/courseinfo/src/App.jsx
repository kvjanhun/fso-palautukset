const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = ({ course }) => {
    return (
      <h1>
        {course}
      </h1>
    )
}

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }

  const Content = ({ parts }) => {
    return (
      <div>
        <Part part={parts[0]} />
        <Part part={parts[1]} />
        <Part part={parts[2]} />
      </div>
    )
  }

  const Total = ({ parts }) => {
    return (
        <p>
          Number of exercises {
            parts.reduce((sum, part) => sum + part.exercises, 0)
            }
        </p>
      )
    }

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default App