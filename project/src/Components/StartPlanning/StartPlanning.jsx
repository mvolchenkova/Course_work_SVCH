import '../StartPlanning/StartPlanning.css';
import Popup from 'reactjs-popup';
import Button from '../Button/Button.jsx'
import React, {Link, useState } from 'react';

export default function StartPlanning() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
   
    

    return (
        <div className="startPlanningDiv">
            <p className="changeTitle PixelFont">CHANGE YOUR LIFESTYLE NOW</p>
            <p className="changeText PixelFont">
                You deserve to be the best version of yourself. Let's create this miracle together! Keep moving forward, never stop, and one day you'll look in the mirror and see your proudest victory staring back at you – the victory over yourself.
            </p>
                <Button text="START PLANNING" link="/registration"/>
            {/* <Popup trigger={<button className="ArchivoBlackFont startPlanningButton">START PLANNING</button>} modal nested>
                {close => (
                    <div className="modal">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder="Mobile Phone"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password"
                        />
                        <button onClick={() => { logIn(phone, password); close(); }}>Log in</button>
                    </div>
                )}
            </Popup> */}
        </div>
    );
}