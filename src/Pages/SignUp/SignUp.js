import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSignUp = data => {
        console.log(data);
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Register</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs"
                            {...register("name")}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: true
                            })}
                        />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: "Password is required", minLength: {value: 6, message: 'Password must be 6 character longer'}
                            })}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full' value="Login" type="submit" />
                </form>
                <p>
                    Already registered? <Link className='text-secondary' to="/login">Login</Link>
                </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;