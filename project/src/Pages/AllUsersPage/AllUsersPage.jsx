import '../AllUsersPage/AllUsersPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleUserBlock  } from '../../slices/userSlice';
import { fetchQuestions } from '../../slices/questionSlice';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import AddUserModal from '../../Components/AddUserModal/AddUserModal';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(idUser, surname, name, phone, birthdate, role, isBlocked) {
    return { idUser, surname, name, phone, birthdate, role, isBlocked };
}

function createQuestionData(userId, question, email) {
    return { userId, question, email };
}

export default function AllUsersPage() {
    const dispatch = useDispatch();
    const { users, loading: loadingUsers, error: errorUsers } = useSelector(state => state.users);  
    const { questions, loading: loadingQuestions, error: errorQuestions } = useSelector(state => state.questions);

    const [pageUsers, setPageUsers] = useState(1);
    const [pageQuestions, setPageQuestions] = useState(1);
    const [limit] = useState(10);
    const [isModalOpen, setModalOpen] = useState(false); 

    const rows = users.map(user => (
        createData(user.idUser, user.surname, user.name, 
            user.phone, user.birthdate, user.role, user.isBlocked)
    ));

    const questionRows = questions.map(question => (
        createQuestionData(question.userId, question.text, question.email)
    ));

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

    const handleBlock = (id) => {
        dispatch(toggleUserBlock(id)); // Dispatch the thunk to toggle the block status
    };

    return (
        <>
            <HeaderLog />
            <div className='feature'>
                <p className='title'>USERS INFORMATION</p>
                {loadingUsers && <p>Loading users...</p>}
                {errorUsers && <p className="error">{errorUsers}</p>}
                {users.length > 0 ? (
                    <TableContainer component={Paper} sx={{ width: '90%' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">NAME</TableCell>
                                    <TableCell align="center">SURNAME&nbsp;</TableCell>
                                    <TableCell align="center">PHONE&nbsp;</TableCell>
                                    <TableCell align="center">BIRTHDATE&nbsp;</TableCell>
                                    <TableCell align="center">ROLE&nbsp;</TableCell>
                                    <TableCell align="center">isBlocked&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.idUser}>
                                        <TableCell component="th" scope="row">
                                            {row.idUser}
                                        </TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.surname}</TableCell>
                                        <TableCell align="center">{row.phone}</TableCell>
                                        <TableCell align="center">{row.birthdate}</TableCell>
                                        <TableCell align="center">{row.role}</TableCell>
                                        <TableCell align="center">
                                            {row.isBlocked ? <span>BLOCKED</span> : <span>NOT BLOCKED</span>}
                                        </TableCell>
                                        {(row.role === "user" || row.role === 'trainer') && (
                                            <TableCell align="center">
                                                <button className='buttonUserBlock' onClick={() => handleBlock(row.idUser)}>
                                                    {row.isBlocked ? <span>Unblock</span> : <span>Block</span>}
                                                </button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                    <TableContainer component={Paper} sx={{ width: '90%' }}>
                        <Table sx={{ minWidth: 650, fontFamily: 'Pixelify Font' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>UID</TableCell>
                                    <TableCell align="center">Question</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questionRows.map((question) => (
                                    <TableRow key={question.questionId}>
                                        <TableCell component="th" scope="row">
                                            {question.userId}
                                        </TableCell>
                                        <TableCell align="center">{question.question}</TableCell>
                                        <TableCell align="center">{question.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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