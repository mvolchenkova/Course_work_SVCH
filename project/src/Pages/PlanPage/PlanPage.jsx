import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import '../PlanPage/PlanPage.css';

export default function PlanPage() {
    const currentPlan = useSelector((state) => state.trainingPlans.currentPlan);

    return (
        <>
            <HeaderLog />
            <main>
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
            <Footer />
        </>
    );
}