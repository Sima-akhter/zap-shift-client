import React from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })


    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName}marked as admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleRemoveAdmin = user =>{
        const roleInfo = {role: 'user'}
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
        .then(res =>{
            if(res.data.modifiedCount){
                refetch();
                 Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} remove from admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
        })
    }


    return (
        <div>
            <h1 className='text-4xl'> Manage Users: {users.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                {user.rol === 'admin' ?
                                    <button 
                                    onClick={()=> handleRemoveAdmin(user)}
                                    className='btn bg-red-500'>
                                        <FiShieldOff />
                                    </button> : <button
                                    onClick={()=>  handleMakeAdmin(user)}
                                    className='btn bg-green-500'>
                                        <FaUserShield />
                                    </button>
                                }
                            </td>
                            <th>
                                Actions
                            </th>
                        </tr>)}



                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default UsersManagement