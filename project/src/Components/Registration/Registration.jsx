import '../Registration/Registration.css'
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom'


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Registration(){
    return(
        <div className="regAuthDiv PixelFont">
            <img src="data/images/regBoy.png" alt="Registration" className="regImg" />
            <form className="regAuthForm">
            <h2>Registration</h2>
                <div className="formGroup">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" required />
                </div>

                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required />
                </div>

                <div className="formGroup">
                    <label htmlFor="birthdate">Birth date</label>
                    <input type="text" id="birthdate" required />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">Repeat password</label>
                    <input type="password" id="repeatpassword" required />
                </div>

                <div className="formGroup">
                    <label htmlFor="sex">Sex</label>
                    <input type="text" id="sex" required />
                </div>

                <button type="submit" className="btnReg PixelFont">Registration</button>
                <div className='checkboxDiv'>
                    <Checkbox {...label} />
                    <p>I agree to the terms of <Link to="/userAgreement"><span className="yellowText">USER AGREEMENT</span></Link></p>
                </div>
            </form>
            
        </div>
    )
}