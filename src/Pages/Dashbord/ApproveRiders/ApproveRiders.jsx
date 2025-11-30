import React from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })
    
   const handleApprovel = id =>{

   }


    return (
        <div>
            <h1 className='text-5xl'>Ridres Pending Approvel: {riders.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>
                                <td>{rider.status}</td>
                                <td>
                                    <button onClick={()=> handleApprovel(rider._id)} className='btn'>
                                        <FaUserCheck />
                                    </button>
                                    <button className='btn'>
                                        <IoPersonRemove />
                                    </button>
                                    <button className='btn'>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ApproveRiders