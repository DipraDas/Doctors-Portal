import React from 'react';

const AppointmentOption = ({ appointmentOption , setTreatment}) => {
    const { name, slots } = appointmentOption;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                    <p>{slots.length}{slots.length > 1 ? ' spaces' : ' space'} available</p>
                    <div className="card-actions justify-start">
                        <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(appointmentOption)} 
                        htmlFor="my-modal"
                        className="btn btn-primary">Buy Now</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;