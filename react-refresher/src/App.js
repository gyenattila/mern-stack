import React from 'react';

import GoalList from './components/GoalList';

import './App.css';

const App = () => {
  return (
    <div className='course-goals'>
      <h2>Goals</h2>
      <GoalList />
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
