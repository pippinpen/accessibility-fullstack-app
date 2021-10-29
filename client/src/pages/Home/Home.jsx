import React from 'react';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Profile from '../../components/Profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h1>Home</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </>
  );
}

export default Home;
