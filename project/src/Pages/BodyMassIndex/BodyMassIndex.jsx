import '../BodyMassIndex/BodyMassIndex.css';
import { useState } from "react";
import i18n from '../../i18n';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BodyMassIndex() {
    const t = (key) => i18n.t(key);
    const [weightValue, setWeightValue] = useState('');
    const [heightValue, setHeightValue] = useState('');
    const [BMI, setBMI] = useState(null);

    const handleCalculate = () => {
        const weightNumber = parseFloat(weightValue);
        const heightNumber = parseFloat(heightValue) / 100;

        if (!isNaN(weightNumber) && !isNaN(heightNumber) && weightNumber > 0 && heightNumber > 0) {
            const calculatedBMI = weightNumber / (heightNumber * heightNumber);
            setBMI(calculatedBMI);
        } else {
            setBMI(null);
            alert(t('alert_bmi_error'));
        }
    };

    return (
        <main className='bodyMassIndexMain smalle'>
            <p className='bmiTitle'>{t('bmi_main_title')}</p>
            
            <div className="BMIinfo">
                <p className='BMItext'>{t('bmi_description')}</p>
                <p className='BMItext'>{t('bmi_formula_label')}:</p>
                <p className='formulaBMI'>{t('bmi_formula_text')}</p>
            </div>

            <div className='whBMIdiv'>
                <div className='weightInputBMI'>
                    <p>{t('cal_enter_weight')}:</p>
                    <input className='kgInputBMI select'
                        type="number"
                        value={weightValue}
                        onChange={(e) => setWeightValue(e.target.value)}
                        placeholder={t('cal_weight_placeholder')}
                    />
                </div>
                <div className='heightInputBMI'>
                    <p>{t('bmi_enter_height')}:</p>
                    <input className='cmInputBMI select'
                        type="number"
                        value={heightValue}
                        onChange={(e) => setHeightValue(e.target.value)}
                        placeholder={t('bmi_height_placeholder')}
                    />
                </div>
                <button onClick={handleCalculate}>{t('cal_btn_calculate')}</button>
            </div>

            {BMI !== null && (
                <p className='BMIresult'>
                    {t('bmi_your_result')} {BMI.toFixed(2)}
                </p>
            )}

            <div className="tableBMIdiv">
                <TableContainer component={Paper} sx={{ width: '90%', borderRadius: '15px', overflow: 'hidden' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="bmi table">
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>BMI</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('bmi_table_class')}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('bmi_table_risk')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[
                                { range: t('bmi_range_1'), class: t('bmi_class_1'), risk: t('bmi_risk_1') },
                                { range: '18.5 – 24.9', class: t('bmi_class_2'), risk: t('bmi_risk_2') },
                                { range: '25.0 – 29.9', class: t('bmi_class_3'), risk: t('bmi_risk_3') },
                                { range: t('bmi_range_4'), class: t('bmi_class_4'), risk: t('bmi_risk_4') }
                            ].map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.range}</TableCell>
                                    <TableCell align="center">{row.class}</TableCell>
                                    <TableCell align="center">{row.risk}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="BMItext-container">
                <p className="BMItext">{t('bmi_info_long_1')}</p>
                <p className="BMItext">{t('bmi_info_long_2')}</p>
                <p className="BMItext">• {t('bmi_limit_1')}</p>
                <p className="BMItext">• {t('bmi_limit_2')}</p>
                <p className="BMItext">• {t('bmi_limit_3')}</p>
                
                <p className="bmiTitle">{t('bmi_plan_title')}</p>
                <p className="BMItext">{t('bmi_plan_desc')}</p>
                <p className="BMItext">• {t('bmi_recomm_1')}</p>
                <p className="BMItext">• {t('bmi_recomm_2')}</p>
                <p className="BMItext">• {t('bmi_recomm_3')}</p>
            </div>
        </main>
    );
}