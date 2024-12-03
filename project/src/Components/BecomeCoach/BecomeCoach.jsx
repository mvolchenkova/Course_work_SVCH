import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserThunk } from '../../slices/userSlice';
import '../BecomeCoach/BecomeCoach.css';
import axios from 'axios';

export default function BecomeCoach() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ diploma: null });
    const currentUser = useSelector((state) => state.users.currentUser);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        if (!currentUser) {
            // Redirect or handle the case where the user is not logged in
            navigate('/login'); // Or display an appropriate message
        }
    }, [currentUser, navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData({ ...formData, diploma: file });
        } else {
            alert("Пожалуйста, загрузите файл формата PDF.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.diploma) {
            alert("Please upload your diploma.");
            return;
        }

        // if (!currentUser || !currentUser.userId) {
        //     alert("You must be logged in to become a coach.");
        //     return; // Prevent further execution
        // }

        setIsLoading(true); // Set loading state

        try {
            
            const userData = new FormData();
            userData.append('role', 'trainer');
            userData.append('diploma', formData.diploma);
            const response = await axios.put(`http://localhost:5000/api/users/${currentUser.userId}`, currentUser.userId, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update Redux store after successful API call
            await dispatch(updateUserThunk(response.data)).unwrap();

            navigate('/homePage');
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Conditionally render the form
    if (!currentUser) {
        return <div>Loading...</div>; // Or a more informative message
    }

    return (
        <div className="becomeDiv">
            <form className="becomeForm" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Welcome to our team!</h2>
                <div className="formGroup1">
                    <label htmlFor="diploma">Diploma (PDF)</label>
                    <input 
                        type="file" 
                        id="diploma" 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btnBecCoach" disabled={isLoading}>
                    {isLoading ? "Becoming a Coach..." : "Become a Coach"}
                </button>
            </form>
        </div>
    );
}