import React, { useState } from 'react';
import '../CaloriesPage/CaloriesPage.css';
import Button from '../../Components/Button/Button';

export default function CaloriesPage() {
    
    const optionsPercentage = [
        { value: 4, label: '3-4%' },
        { value: 7, label: '6-7%' },
        { value: 11, label: '10-12%' },
        { value: 16, label: '15-17%' },
        { value: 21, label: '20-22%' },
        { value: 25, label: '25%' },
        { value: 30, label: '30%' },
        { value: 35, label: '35%' },
        { value: 40, label: '40%' },
        { value: 45, label: '45%' },
        { value: 50, label: '50%' }
    ];

    const [weightValue, setWeightValue] = useState('');
    const [fatPercentage, setFatPercentage] = useState('');
    const [leanBodyMass, setLeanBodyMass] = useState(null);

    const handleWeightChange = (event) => {
        setWeightValue(event.target.value);
        console.log("Weight Value:", event.target.value);
    };
    
    const handlePercentageChange = (event) => {
        setFatPercentage(event.target.value);
        console.log("Fat Percentage from Select:", event.target.value);
    };
    
    const handleCalculate = () => {
        const weightNumber = parseFloat(weightValue);
        const percentageNumber = parseFloat(fatPercentage);

        console.log("Weight Number:", weightNumber);
        console.log("Percentage Number:", percentageNumber);

        if (!isNaN(weightNumber) && !isNaN(percentageNumber) && weightNumber > 0 && percentageNumber > 0) {
            const calculatedLeanBodyMass = weightNumber - (weightNumber * (percentageNumber / 100));
            setLeanBodyMass(calculatedLeanBodyMass);
            console.log("Calculated Lean Body Mass:", calculatedLeanBodyMass);
        } else {
            setLeanBodyMass(null);
            alert("Please enter a valid weight and select a fat percentage.");
        }
    };

    return (
        <div className='caloriesCalculatorMain'>
            <p className="titlecal">
                HERE YOU CAN CALCULATE PROTEINS, FATS AND CARBOHYDRATES FOR YOUR DIET
            </p>
            <div className='imagesDiv'>
                <p className="chooseFat">
                    LOOK AT THE PICTURES AND CHOOSE YOUR FAT PERCENTAGE
                </p>
                <div className="weightImgs">
                    <img src="/data/images/womenWeights.jpg" alt="Women Weights" />
                    <img src="/data/images/menWeights.jpg" alt="Men Weights" />
                </div>
            </div>
            <div className='chooseFatDiv'>
                <p className='chooseFat'>Select your fat percentage:</p>
                <select className="percentageSelect" value={fatPercentage} onChange={handlePercentageChange}>
                    <option value="">-- Select --</option>
                    {optionsPercentage.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className='weightInput'>
                <p>Enter your weight (kg):</p>
                <input className='kgInput'
                    type="number" 
                    value={weightValue} 
                    onChange={handleWeightChange} 
                    placeholder="YOUR WEIGHT (kg)" 
                />
            </div>
            <button onClick={handleCalculate}>CALCULATE</button>
            {leanBodyMass !== null && (
                <div className='results'>
                    <p className='leanMass'>Your Lean Body Mass: {leanBodyMass} kg</p>
                    <div className='resultsFor'>
                        <div className='forDiv'>
                            <p className='titleFor'>FOR CUT</p>
                            <p>Proteins: {(2 * leanBodyMass).toFixed(0)} g and more</p>
                            <p>Fats: {(0.8 * leanBodyMass).toFixed(0)}-{leanBodyMass.toFixed(0)} g</p>
                            <p>Carbohydrates: {(3 * leanBodyMass).toFixed(0)}-{(5 * leanBodyMass).toFixed(0)} g</p>
                        </div>
                        <div className='forDiv'>
                            <p className='titleFor'>FOR BULK</p>
                            <p>Proteins: {(1.6 * leanBodyMass).toFixed(0)}-{(2 * leanBodyMass).toFixed(0)} g</p>
                            <p>Fats: {leanBodyMass.toFixed(0)} g</p>
                            <p>Carbohydrates: {(5 * leanBodyMass).toFixed(0)} g and more</p>
                        </div>
                    </div>
                    <p className='comment'>It all depends on a person’s activity, a specific values cannot just be taken and GIVEN to someone, for this you need to work and test everything on yourself, we are all individual. And also if you have a fairly low percentage of fat, in general you can count everything on the total body weight, and not on the lean body mass, this is more for those who are very overweight and have a small percentage of muscle mass.</p>
                    <div className='recommFor'>
                        <p className='titleFor'>RECOMMENDATIONS FOR COUNTING PROTEINS, FATS AND CARBOHYDRATES</p>
                        <p>You need to weigh the food BEFORE cooking, weighed the cereal, cooked it, weighed the meat, fried it.</p>
                        <p>The actual calorie content is not always indicated on the products; this applies to processed foods and semi-finished products, for example, filled rolls, frozen pizzas, sandwiches, etc. This also applies to food in restaurants and other fast food.</p>
                        <p>In addition to PFC, pay attention to the composition of the product, for example, if you buy minced chicken, it may contain pork, but if you buy regular cheese, it will contain soy protein and vegetable oils, so I recommend keeping an eye on this.</p>
                    </div>
                </div>
                
            )}
        </div>
        
    );
}