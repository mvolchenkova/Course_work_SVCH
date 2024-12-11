import Footer from '../../Components/Footer/Footer';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import '../Advices/Advices.css';
import { useState } from 'react';
import AddAdviceModal from '../../Components/AddAdviceModal';

export default function Advices() {
    const [isModalOpen, setModalOpen] = useState(false);

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
                
                <button onClick={handleOpenModal}>ADD ADVICE</button>
                <AddAdviceModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </main>
            <Footer />
        </>
    );
}