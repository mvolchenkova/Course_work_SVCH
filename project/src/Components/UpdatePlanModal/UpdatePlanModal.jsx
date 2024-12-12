import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTrainingPlan } from '../../slices/tplanSlice'; 
import '../UpdatePlanModal/UpdatePlanModal.css'

const UpdatePlanModal = ({ isOpen, onClose, currentPlan }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(currentPlan.title);
    const [description, setDescription] = useState(currentPlan.description);
    const [img, setImg] = useState(currentPlan.img);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPlan = { title, description, img };
        await dispatch(updateTrainingPlan({ id: currentPlan.idTplan, ...updatedPlan }));
        onClose(); // Close the modal after submitting
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Training Plan</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                    />
                    <button type="submit">Update Plan</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePlanModal;