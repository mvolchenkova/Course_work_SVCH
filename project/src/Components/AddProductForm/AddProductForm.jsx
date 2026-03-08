import React, { useState } from 'react';
import './AddProductForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToBase } from '../../slices/productSlice';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    fat: '',
    carbs: ''
  });

    const dispatch = useDispatch();
    const { status } = useSelector(state => state.products);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProductToBase(formData))
            .unwrap()
            .then(() => {
                alert('Успешно!');
                setFormData({ name: '', calories: '', protein: '', fat: '', carbs: '' });
            })
            .catch((err) => alert('Ошибка: ' + err));
    };

  return (
    <div className="add-product-card">
      <form onSubmit={handleSubmit} className="product-form">
        <input 
          type="text" 
          placeholder="Название продукта" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required 
        />
        <div className="kbju-inputs">
          <input 
            type="number" 
            placeholder="Ккал" 
            value={formData.calories}
            onChange={(e) => setFormData({...formData, calories: e.target.value})}
            required 
          />
          <input 
            type="number" 
            placeholder="Белки" 
            value={formData.protein}
            onChange={(e) => setFormData({...formData, protein: e.target.value})}
          />
          <input 
            type="number" 
            placeholder="Жиры" 
            value={formData.fat}
            onChange={(e) => setFormData({...formData, fat: e.target.value})}
          />
          <input 
            type="number" 
            placeholder="Углев." 
            value={formData.carbs}
            onChange={(e) => setFormData({...formData, carbs: e.target.value})}
          />
        </div>
        <button type="submit" className="save-btn">Сохранить в базу</button>
      </form>
    </div>
  );
};

export default AddProductForm;