import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: Math.random.toString(),
      image:
        'https://pcdn.hu/articles/images-xl/o/l/a/olaszorszag-firenze-360624.jpg',
      name: 'Jack',
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
