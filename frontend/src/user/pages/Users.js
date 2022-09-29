import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: Math.random.toString(),
      image: 'Jack',
      name: 'https://pcdn.hu/articles/images-xl/o/l/a/olaszorszag-firenze-360624.jpg',
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
