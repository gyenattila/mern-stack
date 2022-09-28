import React from 'react';

import './NewGoal.css';

const NewGoal = props => {
  const { onAddNewGoal } = props;
  const addGoalHandler = event => {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: 'New goal',
    };

    onAddNewGoal(newGoal);
  };

  return (
    <form className='new-goal' onSubmit={addGoalHandler}>
      <input type='text' />
      <button type='submit'>Add Goal</button>
    </form>
  );
};

export default NewGoal;
