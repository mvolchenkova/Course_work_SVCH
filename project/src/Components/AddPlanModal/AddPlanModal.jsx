import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { adminAddPlan } from '../../slices/tplanSlice';
import '../AddPlanModal/AddPlanModal.css';
import axios from 'axios';
import ImageSelectionModal from '../ImageSelectionModal/ImageSelectionModal'; 

const AddPlanModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [availableImages, setAvailableImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [planData, setPlanData] = useState({
        author: '',
        title: '',
        amount: '',
        img: '', // Store the image URL instead of a file
        description: '',
        lessons: [] // Store video files here
    });

    const [isImageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/images'); 
                setAvailableImages(response.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
    
        fetchImages();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlanData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); 
        setPlanData((prevState) => ({
            ...prevState,
            lessons: [...prevState.lessons, ...files] 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!planData.img) {
            return alert('Please select an image.');
        }
    
        if (planData.lessons.length === 0) {
            return alert('Please select at least one video file.');
        }
    
        // Check title length
        if (planData.title.length < 10 || planData.title.length > 50) {
            return alert('Title should have between 10 and 50 characters.');
        }
    
        const formData = new FormData();
        formData.append("author", planData.author);
        formData.append("title", planData.title);
        formData.append("amount", planData.amount);
        formData.append("description", planData.description);
        if (selectedImageFile) { // Check if an image file is selected
            formData.append("img", selectedImageFile); // Append the File object
        }
        planData.lessons.forEach((lesson) => {
            formData.append("lesson", lesson); // Add each video file to formData
        });
    
        await dispatch(adminAddPlan(formData));
        onClose(); 
    };
    
    const resetForm = () => {
        setPlanData({
            author: '',
            title: '',
            amount: '',
            img: '', // Reset img to an empty string
            description: '',
            lessons: [] // Reset lessons
        });
    };
    
    const handleClose = () => {
        resetForm(); 
        onClose(); 
    };

    if (!isOpen) return null;

    const handleImageSelect = async (image) => {  // Make this async
        setSelectedImage(image);
        try {
            const response = await axios.get(image, { responseType: 'blob' }); // Fetch image as blob
            const file = new File([response.data], image.split('/').pop(), { type: response.data.type }); // Create a File object
            setSelectedImageFile(file);
            setPlanData((prevState) => ({
                ...prevState,
                img: file // Store the File object in planData
            }));
        } catch (error) {
            console.error("Error fetching image file:", error);
        }
        setImageModalOpen(false);

    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Plan</h2>
                <form onSubmit={handleSubmit}>
                    <input name="author" type="text" placeholder="Author" value={planData.author} onChange={handleChange} required />
                    <input name="title" type="text" placeholder="Title" value={planData.title} onChange={handleChange} required />
                    <input name="amount" type="text" placeholder="Amount" value={planData.amount} onChange={handleChange} required />
                    <input name="description" type="text" placeholder="Description" value={planData.description} onChange={handleChange} required />

                    <div>
                        <button type="button" onClick={() => setImageModalOpen(true)}>Select Image</button>
                        {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '100px', height: '100px', margin: '5px' }} />}
                    </div>

{/* 
                    <select value={selectedImage} onChange={handleImageSelect} required>
                        <option value="">Select an image</option>
                        {availableImages.map((image) => (
                            <option key={image} value={image}>
                                {image}
                            </option>
                        ))}
                    </select> */}

                    <input
                        name="lesson"
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleFileChange}
                        required
                    />

                    <button type="submit">Add Plan</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                </form>
            </div>
            <ImageSelectionModal 
                isOpen={isImageModalOpen} 
                onClose={() => setImageModalOpen(false)} 
                images={availableImages} 
                onSelect={handleImageSelect}
            />
        </div>
    );
};

export default AddPlanModal;