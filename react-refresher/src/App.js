import React, { useState } from 'react';

import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

import './App.css';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
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
  ]);

  const addNewGoalHandler = newGoal => {
    /**
     * setCourseGoals is executed in async mode, thats why this approach
     * is needed to update the data and make sure that the application
     * is rendered with the latest data state.
     */
    setCourseGoals(prevCourseGoals => [...prevCourseGoals, newGoal]);
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
