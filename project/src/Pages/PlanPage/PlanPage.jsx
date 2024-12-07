import React, { useEffect, useState } from 'react';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTrainingPlan, updateTrainingPlan } from '../../slices/tplanSlice';
import UpdatePlanModal from '../../Components/UpdatePlanModal/UpdatePlanModal'; 
import '../PlanPage/PlanPage.css';
import { useNavigate } from 'react-router-dom'; 

export default function PlanPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentPlan = useSelector((state) => state.trainingPlans.currentPlan);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeletePlan = async () => {
        if (currentPlan && window.confirm('Are you sure you want to delete this plan?')) {
            await dispatch(deleteTrainingPlan(currentPlan.idTplan));
            navigate('/allPlans'); 
        }
    };

    useEffect(() => {
        if (!currentPlan) {
            navigate('/allPlans'); 
        }
    }, [currentPlan, navigate]);

    if (!currentPlan) {
        return <p>Loading...</p>; 
    }

    return (
        <>
            <HeaderLog />
            <main className='planMain'>
                <div className='imgDescrPlan'>
                    <img src={`http://localhost:5000/${currentPlan.img}`} alt="" />
                    <div>
                        <p className="planTitle">{currentPlan.title}</p>
                        <p className='planDescr'>{currentPlan.description}</p>
                    </div>
                </div>
                <div className='lessons'>
                    {currentPlan.lessons && currentPlan.lessons.length > 0 ? (
                        currentPlan.lessons.map((lesson, index) => (
                            <div key={index} className='lesson'>
                                <p>Lesson {index + 1}</p>
                                <video controls className='lessonVideo'>
                                    <source src={`http://localhost:5000/${lesson}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))
                    ) : (
                        <p>No lessons available.</p>
                    )}
                </div>
            </main>
            <button onClick={handleDeletePlan}>DELETE PLAN</button>
            <button onClick={() => setIsModalOpen(true)}>UPDATE PLAN</button>
            <Footer />
            <UpdatePlanModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                currentPlan={currentPlan}
            />
        </>
    );
}