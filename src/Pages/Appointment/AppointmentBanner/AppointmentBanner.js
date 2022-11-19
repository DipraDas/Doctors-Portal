import banner from '../../../assets/images/chair.png';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <div>
            <div className="hero py-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={banner} className="max-w-sm rounded-lg shadow-2xl" alt='' />
                    <div>
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                        <p>You picked {format(selectedDate, 'PP')}.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;