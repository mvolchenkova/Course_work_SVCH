import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalorieSearch.css'; // Создаем отдельный файл для стилей

export default function CalorieSearch({ availableMeals, onAddProduct }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [grams, setGrams] = useState(100);
  const [selectedMeal, setSelectedMeal] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          params: { search: query, limit: 10 },
        });
        setResults(response.data.products || []);
      } catch (err) {
        console.error(err);
      }
    };

    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedMeal(availableMeals[0]?.title.toLowerCase());
    }
  }, [selectedProduct, availableMeals]);

  const handleAdd = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const idUser = user?.userId;

    if (!idUser) {
      alert('Нет ID пользователя');
      return;
    }

    const ratio = grams / 100;

    const mealData = {
      idUser,
      productId: selectedProduct.productId,
      mealType: selectedMeal,
      grams: Number(grams),
      recordedCalories: Math.round(selectedProduct.calories * ratio),
      recordedProtein: Number((selectedProduct.protein * ratio).toFixed(1)),
      recordedFat: Number((selectedProduct.fat * ratio).toFixed(1)),
      recordedCarbs: Number((selectedProduct.carbs * ratio).toFixed(1)),
    };

    onAddProduct(mealData);
    setSelectedProduct(null);
    setQuery('');
    setGrams(100);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Введите продукт..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.length >= 2 && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((p) => (
            <div
              key={p.productId}
              className="search-item"
              onClick={() => setSelectedProduct(p)}
            >
              <div className="item-left">
                <strong>{p.productName}</strong>
                <small>
                  Б: {p.protein} | Ж: {p.fat} | У: {p.carbs}
                </small>
              </div>
              <div className="item-right">{p.calories} ккал</div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedProduct.productName}</h3>

            <div className="bju-row">
              <span>Б: {selectedProduct.protein}</span>
              <span>Ж: {selectedProduct.fat}</span>
              <span>У: {selectedProduct.carbs}</span>
            </div>

            <div className="input-group">
              <label>Вес (г):</label>
              <input
                type="number"
                value={grams}
                onChange={(e) => setGrams(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Прием пищи:</label>
              <select
                value={selectedMeal}
                onChange={(e) => setSelectedMeal(e.target.value)}
              >
                {availableMeals.map((m) => (
                  <option key={m.id} value={m.title.toLowerCase()}>
                    {m.icon} {m.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-buttons">
              <button className="btn-add" onClick={handleAdd}>
                Добавить {Math.round((selectedProduct.calories * grams) / 100)} ккал
              </button>
              <button
                className="btn-cancel"
                onClick={() => setSelectedProduct(null)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
