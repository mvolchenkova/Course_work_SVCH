import React from 'react';
import '../RegAuth/RegAuth.css';
import {Link} from 'react-router-dom'

export default function RegAuth() {
    return (
            <div className="regAuthDiv PixelFont">
                <img src="data/images/regGirl.png" alt="Registration" className="regImg" />
                <form className="regAuthForm">
                <h2>Sign In</h2>
                    <div className="formGroup">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" required />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required />
                    </div>

                    <button type="submit" className="btn PixelFont">Sign In</button>
                    <p className="registerPrompt ">or <Link to="/registr"><span className="yellowText ">register</span> </Link>if you don't have an account</p>
                </form>
                
            </div>
    );
}