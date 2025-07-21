const Course = ({ course }) => (
  <div>
    <SubHeader text={course.name} />
    <Content parts={course.parts} />
  </div>
)
const SubHeader = ({ text }) => <h2>{text}</h2>
const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
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

export default Course