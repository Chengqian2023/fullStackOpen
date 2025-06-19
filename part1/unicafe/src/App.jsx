import { use } from "react";
import { useState } from "react";
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td> {props.value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  if (good == 0 && bad == 0 && neutral == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + bad + neutral} />
        <StatisticLine
          text="average"
          value={((good - bad) / (good + bad + neutral)).toFixed(1)}
        />
        <StatisticLine
          text="positive"
          value={`${((good / (good + bad + neutral)) * 100).toFixed(1)}%`}
        />
      </tbody>
    </table>
  );
};
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
