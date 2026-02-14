import { Navigate } from 'react-router-dom';

interface ProtectedCustomerRouteProps {
  children: React.ReactNode;
}

export default function ProtectedCustomerRoute({ children }: ProtectedCustomerRouteProps) {
  const userToken = localStorage.getItem('userToken');
  const user = localStorage.getItem('user');

  if (!userToken || !user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
