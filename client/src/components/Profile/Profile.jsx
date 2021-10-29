import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
    <div>
      <h1>Hello {user.name}</h1>
      {JSON.stringify(user, null, 2)}
    </div>
    )
  )
}

export default Profile
