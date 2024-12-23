import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { adminAddRecipe } from '../../slices/recipeSlice';
import '../AddRecipeModal/AddRecipeModal.css';
import axios from 'axios';
import ImageSelectionModal from '../ImageSelectionModal/ImageSelectionModal'; 

const AddRecipeModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [availableImages, setAvailableImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        img: '',
        ingredients: [],
        instructions: [] 
    });

    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [ingredientInput, setIngredientInput] = useState('');
    const [instructionInput, setInstructionInput] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/recipeImages'); 
                setAvailableImages(response.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recipeData.img) {
            return alert('Please select an image.');
        }

        if (recipeData.title.length < 10 || recipeData.title.length > 50) {
            return alert('Title should have between 10 and 50 characters.');
        }

        // const formData = new FormData();
        // formData.set("title", recipeData.title);
        // formData.set("time", recipeData.time);
        // if (selectedImageFile) {
        //     formData.set("img", selectedImageFile);
        // }
        // formData.set("ingredients", JSON.stringify(recipeData.ingredients));
        // formData.set("instructions", JSON.stringify(recipeData.instructions));
        const data = {
            'title': recipeData.title,
            'time': recipeData.time,
            'ingredients': JSON.stringify(recipeData.ingredients),
            'instructions': JSON.stringify(recipeData.instructions)
        }
        var formData = {}
        if(selectedImageFile){
        
            formData = {...data,
                'img': selectedImageFile}
        }
        else{
            formData = {...data}
        }

        console.log("formdata", formData)

        try {
            await dispatch(adminAddRecipe(formData));
            onClose(); 
        } catch (error) {
            console.error("Error creating recipe:", error);
            alert("Error creating recipe. Please try again."); // Example alert
        }
    };
    
    const resetForm = () => {
        setRecipeData({
            title: '',
            time: '',
            img: '',
            ingredients: [],
            instructions: [] 
        });
        setIngredientInput('');
        setInstructionInput('');
    };
    
    const handleClose = () => {
        resetForm(); 
        onClose(); 
    };

    if (!isOpen) return null;

    const handleImageSelect = async (image) => { 
        setSelectedImage(image);
        console.log(image)
        try {
            const response = await axios.get(image, { responseType: 'blob' }); 
            const file = new File([response.data], image.split('/').pop(), { type: response.data.type });
            setSelectedImageFile(file);
            setRecipeData((prevState) => ({
                ...prevState,
                img: file 
            }));
        } catch (error) {
            console.error("Error fetching image file:", error);
        }
        setImageModalOpen(false);
    };

    const handleAddIngredient = () => {
        if (ingredientInput.trim()) {
            setRecipeData(prevData => ({
                ...prevData,
                ingredients: [...prevData.ingredients, ingredientInput.trim()]
            }));
            setIngredientInput('');
        }
    };
    
    const handleAddInstruction = () => {
        if (instructionInput.trim()) {
            setRecipeData(prevData => ({
                ...prevData,
                instructions: [...prevData.instructions, instructionInput.trim()]
            }));
            setInstructionInput('');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <input name="title" type="text" placeholder="Title" value={recipeData.title} onChange={handleChange} required />
                    <input name="time" type="text" placeholder="Time" value={recipeData.time} onChange={handleChange} required />

                    <div>
                        <button type="button" onClick={() => setImageModalOpen(true)}>Select Image</button>
                        {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '100px', height: '100px', margin: '5px' }} />}
                    </div>

                    <div>
                        <div className='inputAndButton'>
                            <input 
                                type="text" 
                                placeholder="Add Ingredient" 
                                value={ingredientInput} 
                                onChange={(e) => setIngredientInput(e.target.value)} 
                            />
                            <button type="button" onClick={handleAddIngredient}>+</button>
                        </div>
                        
                        <ul>
                            {recipeData.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className='inputAndButton'>
                            <input 
                                type="text" 
                                placeholder="Add Instruction" 
                                value={instructionInput} 
                                onChange={(e) => setInstructionInput(e.target.value)} 
                            />
                            <button type="button" onClick={handleAddInstruction}>+</button>
                        </div>
                        
                        <ul>
                            {recipeData.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit">Add Recipe</button>
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

export default AddRecipeModal;