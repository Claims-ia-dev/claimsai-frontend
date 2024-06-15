import React from 'react';
import UserItem from '../components/UserItem';


const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Karla Urrea',      
      claims: 3
    }
  ];

  return <UserItem
  key={USERS[0].id}
  id={USERS[0].id}
  name={USERS[0].name}
  claimCount={USERS[0].claims}
/>;
};

export default Users;
