import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Protected Route Component
function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
