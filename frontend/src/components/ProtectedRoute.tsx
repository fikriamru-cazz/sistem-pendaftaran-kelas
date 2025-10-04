import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  role?: 'STUDENT' | 'ADMIN';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // User does not have the required role, redirect to home or an unauthorized page
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
