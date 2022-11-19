import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOption from '../AppointmentOption/AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointments = ({ selectedDate }) => {
    const [appointmentOption, setAppointmentOption] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setAppointmentOption(data))
    }, [])
    return (
        <div>
            <p className='text-center'>You picked {format(selectedDate, 'PP')}.</p>
            <div className='grid gap-5 grid-cols-3'>
                {
                    appointmentOption.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;