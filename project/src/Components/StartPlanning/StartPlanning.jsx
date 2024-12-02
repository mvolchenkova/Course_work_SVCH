import '../StartPlanning/StartPlanning.css';

import Button from '../Button/Button.jsx'
import React, {Link, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function StartPlanning() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
   
    const currentUser = useSelector((state) => state.users.currentUser);

    return (
        <div className="startPlanningDiv">
            {currentUser ? (
                <>
                <p className="changeTitle PixelFont">CHANGE YOUR LIFESTYLE NOW</p>
                <p className="changeText PixelFont">
                    You deserve to be the best version of yourself. Let's create this miracle together! Keep moving forward, never stop, and one day you'll look in the mirror and see your proudest victory staring back at you – the victory over yourself.
                </p>
                </>
                
            ):
            (
                <>
                    <p className="changeTitle PixelFont">CHANGE YOUR LIFESTYLE NOW</p>
                <p className="changeText PixelFont">
                    You deserve to be the best version of yourself. Let's create this miracle together! Keep moving forward, never stop, and one day you'll look in the mirror and see your proudest victory staring back at you – the victory over yourself.
                </p>
                <Button text="START PLANNING" link="/authorization"/>
                </>
            )}
            
               
            
        </div>
    );
}