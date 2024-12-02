import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import '../CalendarPage/CalendarPage.css'

export default function CalendarPage() {
    const [value, setValue] = useState(new Date());
    const [plans, setPlans] = useState([]);
    const [selectedDatePlans, setSelectedDatePlans] = useState([]);

    // Function to fetch plans from the server
    const fetchPlans = async () => {
        try {
            const response = await axios.get('/api/plans', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    };

    // Effect to fetch plans on component mount
    useEffect(() => {
        fetchPlans();
    }, []);

    // Handle date change
    const onChange = (date) => {
        setValue(date);
        // Filter plans for the selected date
        const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        const filteredPlans = plans.filter(plan => plan.date === formattedDate);
        setSelectedDatePlans(filteredPlans);
    };

    return (
        <>
            <HeaderLog />
            <div className="calMain ">
            
                <div className="calendar PixelFont">
                    <Calendar onChange={onChange} value={value} />
                    <h2>Plans for {value.toDateString()}</h2>
                    {selectedDatePlans.length > 0 ? (
                        <ul>
                            {selectedDatePlans.map(plan => (
                                <li key={plan.id}>
                                    {plan.title} - {plan.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No plans for this date.</p>
                    )}
                    <button className="PixelFont addDel">ADD</button>
                    <button className="PixelFont addDel">DELETE</button>
                </div>
                <Footer />
            </div>
        </>
        
    );
}