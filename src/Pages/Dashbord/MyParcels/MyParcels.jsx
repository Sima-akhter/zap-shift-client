import React from 'react'
import UseAuth from '../../../Hooks/UseAuth'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyParcels = () => {
  const {user} = UseAuth();
  const axiosSecure = useAxiosSecure();
  const {data: parcels = []} = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
     const res = await axiosSecure.get(`/parcels?email=${user.email}`);
     return res.data;
    }
  })
  return (
    <div>
      <h1>All of my parcels : {parcels.length}</h1>
    </div>
  )
}

export default MyParcels