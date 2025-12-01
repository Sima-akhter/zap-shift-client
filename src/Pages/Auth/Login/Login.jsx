import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signInUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('in the login page', location)

    const handleLogin = (data) =>{

        console.log('form data', data);
        signInUser(data.email, data.password)
        .then(result =>{
            console.log(result.user)
            navigate(location?.state || '/')
        })
        .catch(error =>{
            console.log(error)
        })

    }

  return (
    <div>
         <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h2 className='text-3xl text-center'>Welcome back</h2>
            <p className='text-center'>please login</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
            {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />

          {
            errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>
          }


          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password', {required: true, minLength: 6})} className="input" placeholder="Password" />

         {
            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or linger</p>
         }


          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>New to zap shift <Link
        state={location.state}
         className='text-blue-500 underline' to="/register">Register</Link></p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
    </div>
  )
}

export default Login