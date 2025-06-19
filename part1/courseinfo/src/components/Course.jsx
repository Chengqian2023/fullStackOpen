const Course = ({ course }) => {
  return (
    <ul>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </ul>
  );
};

const Header = ({ header }) => <h2>{header}</h2>;
const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

export default Course;
