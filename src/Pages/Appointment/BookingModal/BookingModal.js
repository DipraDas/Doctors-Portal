import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment ,refetch}) => {
    const { name, slots } = treatment;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            treatment: treatment.name,
            name,
            slot,
            email,
            phone
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirmed');
                    refetch();
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{name}</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder={format(selectedDate, 'PP')} className="input input-bordered w-full mb-4" disabled />
                        <select name='slot' className="select select-bordered w-full mb-5">
                            {
                                slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Enter Name" className="input input-bordered w-full mb-4" />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Enter Email" className="input input-bordered w-full mb-4" />
                        <input name='phone' type="text" placeholder="Enter Phone" className="input input-bordered w-full mb-4" />
                        <input className='btn btn-primary' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;