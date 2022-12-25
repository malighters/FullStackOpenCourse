const Header = ({ course }) => <h3>{course}</h3>

const Total = ({ sum }) => <b>Total of exercises {sum}</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key = {part.id} part = {part}/>)}   
  </>

const Course = ({course}) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  )
} 

export default Course;