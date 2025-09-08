import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from '@/store/slices/usersSlice';
import { useEffect } from 'react';
const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(selectUsers);
  console.log('Users component rendered', users);
  useEffect(() => {
    dispatch(fetchUsers(100)); // fetch 100 users
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>Users</div>;
};

export default Users;
