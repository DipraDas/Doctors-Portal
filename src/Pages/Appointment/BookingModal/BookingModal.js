import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
    const { name, slots } = treatment;
    const date = format(selectedDate, 'PP');
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking ={
            appointmentDate : date,
            treatment: treatment.name,
            name,
            slot,
            email,
            phone
        }
        console.log(booking);
        setTreatment(null);
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
                        <input name='name' type="text" placeholder="Enter Name" className="input input-bordered w-full mb-4" />
                        <input name='email' type="email" placeholder="Enter Email" className="input input-bordered w-full mb-4" />
                        <input name='phone' type="text" placeholder="Enter Phone" className="input input-bordered w-full mb-4" />
                        <input className='btn btn-primary' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;