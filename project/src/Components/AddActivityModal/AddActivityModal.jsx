import React from 'react';
import { useDispatch } from 'react-redux';
import '../AddActivityModal/AddActivityModal.css';
import axios from 'axios';

export default function AddActivityModal({ isOpen, onClose }) {
    const dispatch = useDispatch();

    const handleClose = () => {
        onClose(); 
    };

    return (
        <>
            {isOpen && ( 
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add Activity</h2>
                        <div className='addAcitivityBlock'>
                            <div className='activities'>
                                <div className='activityBlock'>
                                    <p>DRUNK WATER</p>
                                    <button>ADD</button>
                                </div>
                                <div className='activityBlock'>
                                    <p>STRENGTH TRAINING</p>
                                    <button>ADD</button>
                                </div>
                                <div className='activityBlock'>
                                    <p>CARDIO TRAINING</p>
                                    <button>ADD</button>
                                </div>
                                <div className='activityBlock'>
                                    <p>WALK</p>
                                    <button>ADD</button>
                                </div>
                                <div className='activityBlock'>
                                    <p>STRETCHING</p>
                                    <button>ADD</button>
                                </div>
                                <div className='activityBlock'>
                                    <p>ACTIVE GAMES</p>
                                    <button>ADD</button>
                                </div>
                            </div>
                            <button type="button" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}