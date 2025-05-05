import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ReactElement } from 'react';

type ProtectedRouteProps = {
    children : ReactElement;
}

const ProtectedRoute = (props : ProtectedRouteProps) => {
const {children } = props; 
const { isAuthenticated, isLoading} = useAuth();
    if(isLoading){
        return <>Loading...</>;
    }
  return (
    <>
    {
           isAuthenticated ? (
             <>{children}</>
           ) : (
             <Navigate to="/login" />
           )
    }
    </>
  )
}

export default ProtectedRoute