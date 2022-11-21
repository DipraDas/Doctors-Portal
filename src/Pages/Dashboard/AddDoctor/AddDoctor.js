import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbbKey;
    console.log(imageHostKey);

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                }
                console.log(imgData);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }
                fetch('http://localhost:5000/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        toast.success(`${data.name} is added successfully`);
                        navigate('/dashboard/managedoctors');
                    })
            })
    }

    if (isLoading) {
        return <Loading></Loading>
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
                        <select className="select select-bordered w-full max-w-xs"
                            {...register("specialty", {
                                required: true
                            })}
                        >
                            <option disabled>Select a Specialty</option>
                            {
                                specialties.map(speciality => <option
                                    key={speciality._id}
                                    value={speciality.name}
                                >
                                    {speciality.name}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" className="input input-bordered w-full max-w-xs"
                            {...register("image")}
                        />
                    </div>
                    <input className='btn btn-accent w-full my-5' value="Add Doctor" type="submit" />
                    {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;