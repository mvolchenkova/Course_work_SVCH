
import '../BodyMassIndex/BodyMassIndex.css';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BodyMassIndex() {
    const [weightValue, setWeightValue] = useState('');
    const [heightValue, setHeightValue] = useState('');
    const [BMI, setBMI] = useState(null);

    const handleWeightChange = (event) => {
        setWeightValue(event.target.value);
        console.log("Weight Value:", event.target.value);
    };

    const handleHeightChange = (event) => {
        setHeightValue(event.target.value);
        console.log("Height Value:", event.target.value);
    };

    const handleCalculate = () => {
        const weightNumber = parseFloat(weightValue);
        const heightNumber = parseFloat(heightValue) / 100;

        if (!isNaN(weightNumber) && !isNaN(heightNumber) && weightNumber > 0 && heightNumber > 0) {
            const calculatedBMI = weightNumber / (heightNumber * heightNumber);
            setBMI(calculatedBMI);
        } else {
            setBMI(null);
            alert("Please enter a valid weight and height.");
        }
    };

    return (
        <>
            <main className='bodyMassIndexMain'>
                <p className='bmiTitle'>ONLINE BODY MASS INDEX CALCULATOR</p>
                <div className="BMIinfo">
                    <p className='BMItext'>
                        BMI or body mass index (BMI - Body Mass Index) is one of the most well-known methods for measuring obesity. The result of BMI is a number that determines the likelihood of health risks based on your weight and height.
                    </p>
                    <p className='BMItext'>Formula for calculating BMI:</p>
                    <p className='formulaBMI'>BMI = your body mass(kg) / (height(m))^2</p>
                </div>
                <div className='whBMIdiv'>
                    <div className='weightInputBMI'>
                        <p>Enter your weight (kg):</p>
                        <input className='kgInputBMI'
                            type="number"
                            value={weightValue}
                            onChange={handleWeightChange}
                            placeholder="YOUR WEIGHT (kg)"
                        />
                    </div>
                    <div className='heightInputBMI'>
                        <p>Enter your height (cm):</p>
                        <input className='cmInputBMI'
                            type="number"
                            value={heightValue}
                            onChange={handleHeightChange}
                            placeholder="YOUR HEIGHT (cm)"
                        />
                    </div>
                    <button onClick={handleCalculate}>CALCULATE</button>
                </div>
                {BMI !== null && (
                    <p className='BMIresult'>
                        Your BMI is {BMI.toFixed(2)}
                    </p>
                )}
                <div className="tableBMIdiv">
                    <TableContainer component={Paper} sx={{ width: '90%'}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>BMI</TableCell>
                                    <TableCell align="center">CLASSIFICATION</TableCell>
                                    <TableCell align="center">RISK OF RELATED DISEASES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>less 18.5</TableCell>
                                    <TableCell align="center">Underweight</TableCell>
                                    <TableCell align="center">Medium to High</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>18.5 – 24.9</TableCell>
                                    <TableCell align="center">Normal weight</TableCell>
                                    <TableCell align="center">Low</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>25.0 – 29.9</TableCell>
                                    <TableCell align="center">Overweight</TableCell>
                                    <TableCell align="center">Medium</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>30.0 and above</TableCell>
                                    <TableCell align="center">Obesity</TableCell>
                                    <TableCell align="center">High</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <p className="BMItext">BMI is a value that reflects the ratio of a person’s weight to his height. It helps determine how much body weight is normal. Both its excess and deficiency are harmful to health. Excess weight increases the likelihood of developing diabetes, cardiovascular and cancer diseases, and joint problems. Lack of body weight leads to decreased immunity, frequent lung diseases, and menstrual irregularities. Therefore, BMI is widely used in medicine to assess the risk of chronic diseases.</p>
                <p className="BMItext">The formula can only be used for an approximate assessment of physical condition. There are several reasons for this:</p>
                <p className="BMItext">- The index does not take muscle mass into account. In people with good muscles, such as weightlifters, it may be increased, although they do not have excess fat.</p>
                <p className="BMItext">- The indicator does not reflect the distribution of adipose tissue. In some people, fat accumulates primarily in the abdomen around the organs (abdominal obesity). This is more dangerous to health than fat deposition in the buttocks and thighs.</p>
                <p className="BMItext">- The value may increase with edema.</p>
                <p className="bmiTitle">How to Use BMI to Plan Your Diet and Exercise</p>
                <p className="BMItext">Although the index is not suitable for making an accurate diagnosis, it can help in correcting body weight. It can be used to determine the starting point and progress of changes.</p>
                <p className="BMItext">- If the indicator is less than 18.5, it is recommended to increase the calorie content of the daily diet by 300-500 kcal.</p>
                <p className="BMItext">- With a BMI over 25, the number of kilocalories consumed per day must be reduced by 500.</p>
                <p className="BMItext">- For values ​greater than 40, the doctor may recommend a calorie reduction of 700 kcal or more.</p>
            </main>
        </>
    );
}