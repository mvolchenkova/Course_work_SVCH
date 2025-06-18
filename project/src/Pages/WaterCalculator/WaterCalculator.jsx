import '../WaterCalculator/WaterCalculator.css'
import React, { useState } from 'react';

export default function WaterCalculator(){
    const optionsSex = [
        { value: 'male', label: 'male' },
        { value: 'female', label: 'female' }
    ]

    const [weightValue, setWeightValue] = useState('');
    const [sex, setSex] = useState('');
    const [timeValue, setTime] = useState('');
    const [waterAmount, setWaterAmount] = useState(null);

    const handleWeightChange = (event) => {
        setWeightValue(event.target.value);
    };
    const handleSexChange = (event) => {
        setSex(event.target.value);
    };
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleCalculate = () => {
        const weightNumber = parseFloat(weightValue);
        const timeNumber = parseFloat(timeValue);

        if (!isNaN(weightNumber) && !isNaN(timeNumber) && weightNumber > 0 && timeNumber > 0) {
            if(sex=='female'){
                const calculatedWaterAmount = 0.03*weightNumber + timeNumber*0.4;
                setWaterAmount(calculatedWaterAmount);
            }
            if(sex=='male'){
                const calculatedWaterAmount = 0.04*weightNumber + timeNumber*0.6;
                setWaterAmount(calculatedWaterAmount);
            }
            
        } else {
            setWaterAmount(null);
            alert("Please enter a valid parameters.");
        }
    };

    return(
        <main className='waterCalcMain'>
            <p className='wcrTitle'>WATER COSUMPTION RATE</p>
            <div className='wcrTextBlock'>
                <p className='miniTitle'>Why do you need to know the required amount of water?</p>
                <p className='wcrText'>The benefits of drinking water include the normal and healthy functioning of systems including the immune, cardiovascular and nervous systems, and can also prevent health problems such as kidney stones and urinary tract infections. Adequate water intake is vital to preventing dehydration-related headaches and maintaining regular bowel movements.</p>
            </div>
            <p className='wcrTitle'>CALCULATE THE AMOUNT OF WATER</p>
            <div className='WCRcalcDiv'>
                <div className='chooseSexDiv'>
                    <p className='chooseSex'>Select your sex:</p>
                    <select className="sexSelect" value={sex} onChange={handleSexChange}>
                        <option value="">-- Select --</option>
                        {optionsSex.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='weightInputWCR'>
                    <p>Enter your weight (kg):</p>
                    <input className='kgInputWCR'
                        type="number"
                        value={weightValue}
                        onChange={handleWeightChange}
                        placeholder="YOUR WEIGHT (kg)"
                    />
                </div>
                <div className='activityInputWCR'>
                    <p>Enter your physical activity time (hours):</p>
                    <input className='timeInputWCR'
                        type="number"
                        value={timeValue}
                        onChange={handleTimeChange}
                        placeholder="YOUR ACTIVITY TIME"
                    />
                </div>
                <button onClick={handleCalculate} className='buttonWCR'>CALCULATE</button>
            </div>
            {waterAmount !== null && (
                <>
                    <p className='miniTitle waterResult'>Amount of water, which you need: {waterAmount} l</p>
                </>
            )}
            <div className='wcrTextBlock'>
                <p className='miniTitle'>Risks of under- or over-hydration</p>
                <p className='wcrText'>NOT DRINKING ENOUGH WATER can lead to dehydration, which can cause various health problems:</p>
                <p>- Thirst</p>
                <p>- Dark yellow urine</p>
                <p>- Fatigue</p>
                <p>- Dizziness</p>
                <p>- Dry mouth</p>
                <p>Conversely, DRINKING TOO MUCH WATER can lead to a condition called hyponatremia, in which sodium levels in the blood become dangerously low</p>
                <p>- Nausea</p>
                <p>- Headaches</p>
                <p>- Muscle weakness</p>
                <p>- Convulsions</p>
                <p>Proper hydration is critical to maintaining energy, supporting body functions, and improving overall health. Our Water Consumption Rate Calculator makes it easy to determine how much water you should consume each day. By understanding your hydration needs, you can make informed choices that will promote a healthier lifestyle.</p>
            </div>
        </main>
    )
}