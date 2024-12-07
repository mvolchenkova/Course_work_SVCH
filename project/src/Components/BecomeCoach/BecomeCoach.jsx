import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserThunk } from '../../slices/userSlice';
import '../BecomeCoach/BecomeCoach.css';
import axios from 'axios';
import { local } from 'd3';

export default function BecomeCoach() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [formData, setFormData] = useState({ diploma: null });
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const userId = currentUser.userId;
    const [selectedFile, setSelectedFile] = useState(null);

    const [isLoading, setIsLoading] = useState(false); // Loading state

    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate('/login'); // Or display an appropriate message
    //     }
    // }, [currentUser, navigate]);

    // const handleFileChange = async(e) => {

    //     setSelectedFile(e.target.files[0])
    //     console.log(e.target.files)

    //     // if (!selectedFile) {
    //     //     alert("Пожалуйста, загрузите файл формата PDF.");
    //     //     return;
    //     // }    
    //     const userData = new FormData();
    //     userData.append('diplomaFile', selectedFile)
    //     const res = await axios.put(`http://localhost:5000/api/users/becomecoach/${userId}`, userData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })

    // };



    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        console.log('Выбранный файл:', selectedFile);

        if (!selectedFile) {
            alert("Пожалуйста, загрузите файл.");
            return;
        }

        const userData = new FormData();
        userData.append('file', selectedFile); // Используем имя 'file'
        userData.append('userId', userId); // Добавляем userId

        try {
            setIsLoading(true);
            const res = await axios.put(`http://localhost:5000/api/users/becomecoach`, userData);
            console.log('Файл успешно загружен:', res.data);
            // Обработка успешного ответа от сервера
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
    };


    // const handleSubmit = async (e) => {
        // e.preventDefault();
        
        // if (!formData.diploma) {
        //     alert("Please upload your diploma.");
        //     return;
        // }

        // if (!currentUser || !currentUser.userId) {
        //     alert("You must be logged in to become a coach.");
        //     return; // Prevent further execution
        // }

        // setIsLoading(true); // Set loading state

        // try {
            
        //     const userData = new FormData();
        //     const UserData = {
        //         'idUser': userId,
        //         'role' : 'trainer',
        //         'diploma': formData.diploma,
        //     }
        //     userData.append('role', 'trainer');
        //     userData.append('diploma', formData.diploma);
        //     const response = await axios.put(`http://localhost:5000/api/users/${userId}`, UserData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
                
        //     });

        //     // Update Redux store after successful API call
        //     await dispatch(updateUserThunk(response.data)).unwrap();

        //     navigate('/homePage');
        // } catch (error) {
        //     console.error('Error registering:', error);
        //     alert('Registration failed. Please try again.');
        // } finally {
        //     setIsLoading(false); // Reset loading state
        // }
    // };

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