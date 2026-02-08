import React, { useState, useEffect } from 'react';

export default function CalorieSearch({ onAddProduct }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); // Сюда приходят данные из БД
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [grams, setGrams] = useState(100);

  // Имитация поиска по базе
  const handleSearch = (e) => {
    setQuery(e.target.value);
    // В реальности: axios.get(`/api/products?search=${e.target.value}`)
    // .then(res => setResults(res.data))
  };

  const submitEntry = () => {
    const ratio = grams / 100;
    const entry = {
        ...selectedProduct,
        grams,
        calculatedCalories: Math.round(selectedProduct.calories * ratio)
    };
    onAddProduct(entry); 
    setSelectedProduct(null);
    setQuery('');
  };

  return (
    <div className="search-container" style={{ width: '100%', marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Поиск продукта (курица, яблоко...)"
        value={query}
        onChange={handleSearch}
        style={{ width: '100%', padding: '15px', borderRadius: '15px', border: '2px solid #eee' }}
      />

      {/* Выпадающий список результатов */}
      {query && (
        <div className="search-results" style={{ background: 'white', borderRadius: '15px', marginTop: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          {results.map(prod => (
            <div 
              key={prod.productId} 
              onClick={() => setSelectedProduct(prod)}
              style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
            >
              {prod.productName} — {prod.calories} ккал/100г
            </div>
          ))}
        </div>
      )}

      {/* Модалка ввода граммов (ваши стили modal-overlay) */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedProduct.productName}</h3>
            <p>КБЖУ на 100г: {selectedProduct.calories} / {selectedProduct.protein} / {selectedProduct.fat} / {selectedProduct.carbs}</p>
            
            <label>Сколько грамм съели?</label>
            <input 
              type="number" 
              value={grams} 
              onChange={(e) => setGrams(e.target.value)}
              style={{ padding: '10px', fontSize: '1.2rem' }}
            />
            
            <button onClick={submitEntry}>ДОБАВИТЬ В ДНЕВНИК</button>
            <button onClick={() => setSelectedProduct(null)} style={{ background: '#ccc' }}>ОТМЕНА</button>
          </div>
        </div>
      )}
    </div>
  );
}