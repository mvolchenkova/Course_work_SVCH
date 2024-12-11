import '../AllUsersPage/AllUsersPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../slices/userSlice';
import { fetchQuestions } from '../../slices/questionSlice';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import AddUserModal from '../../Components/AddUserModal/AddUserModal';

export default function AllUsersPage() {
    const dispatch = useDispatch();
    const { users, loading: loadingUsers, error: errorUsers } = useSelector(state => state.users);  
    const { questions, loading: loadingQuestions, error: errorQuestions } = useSelector(state => state.questions);

    const [pageUsers, setPageUsers] = useState(1);
    const [pageQuestions, setPageQuestions] = useState(1);
    const [limit] = useState(10);
    const [isModalOpen, setModalOpen] = useState(false); 

    useEffect(() => {
        dispatch(fetchUsers({ page: pageUsers, limit }));
    }, [dispatch, pageUsers, limit]);

    useEffect(() => {
        dispatch(fetchQuestions({ page: pageQuestions, limit }));
    }, [dispatch, pageQuestions, limit]);

    const handleNextPageUsers = () => {
        setPageUsers(prevPage => prevPage + 1);
    };

    const handlePrevPageUsers = () => {
        setPageUsers(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPageQuestions = () => {
        setPageQuestions(prevPage => prevPage + 1);
    };

    const handlePrevPageQuestions = () => {
        setPageQuestions(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleAddUser = () => {
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        <>
            <HeaderLog />
            <div className='feature'>
                <p className='title'>USERS INFORMATION</p>
                {loadingUsers && <p>Loading users...</p>}
                {errorUsers && <p className="error">{errorUsers}</p>}
                {users.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Phone</th>
                                <th>Birthdate</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.userId}>
                                    <td>{user.idUser}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.birthdate}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
                <div className='buttons'>
                    <button onClick={handlePrevPageUsers} disabled={pageUsers === 1}>Previous</button>
                    <button onClick={handleNextPageUsers}>Next</button>
                    <button onClick={handleAddUser} className='addButton'>ADD USER</button>
                </div>
            </div>
            <div className='feature'>
                <p className='title'>USERS QUESTIONS</p>
                {loadingQuestions && <p>Loading questions...</p>}
                {errorQuestions && <p className="error">{errorQuestions}</p>}
                {questions.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Question</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map(question => (
                                <tr key={question.questionId}>
                                    <td>{question.userId}</td>
                                    <td>{question.text}</td>
                                    <td>{question.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No questions found.</p>
                )}
                <div className='buttons'>
                    <button onClick={handlePrevPageQuestions} disabled={pageQuestions === 1}>Previous</button>
                    <button onClick={handleNextPageQuestions}>Next</button>
                </div>
            </div>
            
            <Footer />
            <AddUserModal isOpen={isModalOpen} onClose={closeModal} /> 
        </>
    );
}