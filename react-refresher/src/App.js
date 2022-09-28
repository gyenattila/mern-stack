import React from 'react';

import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

import './App.css';

const App = () => {
  const courseGoals = [
    {
      id: 'cg1',
      text: 'Finish',
    },
    {
      id: 'cg2',
      text: 'All about React',
    },
    {
      id: 'cg3',
      text: 'Help others',
    },
  ];

  const addNewGoalHandler = NewGoal => {
    courseGoals.push(NewGoal);
    console.log(courseGoals);
  };

  return (
    <div className='course-goals'>
      <h2>Goals</h2>
      <NewGoal onAddNewGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

/**
 * Class based
 */
/**
class App extends React.Component {
  render() {
    return <h1>Hello React</h1>
  }
}
 */

export default App;
