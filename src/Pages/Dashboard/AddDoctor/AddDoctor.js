import React from 'react';
import { useForm } from 'react-hook-form';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleAddDoctor = data => {
        console.log(data)
    }
    return (
        <div>
            <div className="text-3xl">Add Doctor</div>
            <div className='w-96 px-7'>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
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
                            <span className="label-text">Specialty</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Pick a Specialty</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>
                    <input className='btn btn-accent w-full my-5' value="Sign Up" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;