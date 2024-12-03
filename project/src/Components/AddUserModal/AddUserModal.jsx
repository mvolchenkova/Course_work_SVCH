// AddUserModal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminAddUser } from '../../slices/userSlice';
import '../AddUserModal/AddUserModal.css'

const AddUserModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        surname: '',
        name: '',
        phone: '',
        password: '',
        birthdate: '',
        sex: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(adminAddUser(userData));
        onClose(); 
        setUserData({ surname: '', name: '', phone: '', password: '', birthdate: '', sex: '', role: '' }); // Reset form
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
                    <input name="surname" type="text" placeholder="Surname" value={userData.surname} onChange={handleChange} required />
                    <input name="name" type="text" placeholder="Name" value={userData.name} onChange={handleChange} required />
                    <input name="phone" type="tel" placeholder="Phone" value={userData.phone} onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
                    <input name="birthdate" type="date" value={userData.birthdate} onChange={handleChange} required />
                    <select name="sex" value={userData.sex} onChange={handleChange} required>
                        <option value="">Select Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input name="role" type="text" placeholder="Role" value={userData.role} onChange={handleChange} required />
                    <button type="submit">Add User</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;