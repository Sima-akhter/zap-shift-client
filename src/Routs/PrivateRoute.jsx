import React from 'react'
import useAuth from '../Hooks/UseAuth'
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    console.log('location', location)

   if(loading){
    return <Loading></Loading>
   }

   if(!user){
    return <Navigate state={location.pathname} to="/login"></Navigate>
   }

  return children;
}

export default PrivateRoute