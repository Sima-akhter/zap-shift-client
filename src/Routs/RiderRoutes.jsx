import React from 'react'
import useAuth from '../Hooks/UseAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Components/Loading';

const RiderRoutes = ({children}) => {
  const { loading, user} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || !user || roleLoading){
    return <Loading></Loading>
   }

  if(role !== 'rider'){
    return <Forbidden></Forbidden>
  }
  return children;
}

export default RiderRoutes