import Footer from '../../Components/Footer/Footer';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import '../Advices/Advices.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvices } from '../../slices/adviceSlice';
import AddAdviceModal from '../../Components/AddAdviceModal/AddAdviceModal';

export default function Advices() {
    const dispatch = useDispatch();
    const { advices, loading, error } = useSelector((state) => state.advices);
    const [isModalOpen, setModalOpen] = useState(false);
    const role = localStorage.getItem('role')
    useEffect(() => {
        dispatch(fetchAdvices());
    }, [dispatch]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <HeaderLog />
            <main className='advicesMain'>
                <h1>Advices</h1>
                
                <AddAdviceModal isOpen={isModalOpen} onClose={handleCloseModal} />

                {loading && <p>Loading advices...</p>}
                {error && <p className="error">{error}</p>}
                <div className='advicesDiv'>
                    {advices.map((advice) => (
                        <div key={advice.adviceId} className='advice'>
                            <p className='titleAdv'>{advice.title}</p>
                            <p className='advText'>{advice.text}</p>
                        </div>
                    ))}
                </div>
                {(role=='admin'||role=='trainer')&&(
                    <button onClick={handleOpenModal}>ADD ADVICE</button>
                )}
            </main>
            <Footer />
        </>
    );
}