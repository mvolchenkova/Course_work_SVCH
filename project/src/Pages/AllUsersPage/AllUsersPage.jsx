import '../AllUsersPage/AllUsersPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleUserBlock  } from '../../slices/userSlice';
import { fetchQuestions } from '../../slices/questionSlice';
import { fetchExercises, getRandom } from '../../slices/exerciseSlice';
import AddUserModal from '../../Components/AddUserModal/AddUserModal';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddExerciseModal from '../../Components/AddExerciseModal/AddExerciseModal';

function createData(idUser, surname, name, phone, birthdate, role, isBlocked) {
    return { idUser, surname, name, phone, birthdate, role, isBlocked };
}

function createQuestionData(userId, question, email) {
    return { userId, question, email };
}

function createExerciseData(idExercise, exName, frontDelta, middleDelta, backDelta, trapezoids, diamondshaped,
    biceps, triceps, bigChest, middleChest, smallChest, forearm, latissimus, straightBelly, externalOblique,
    internalOblique, transeverse, straightHips, quadriceps, bicepsHips, bigGluteal, middleGluteal,
    smallGluteal, gastrocnemius, soleus, experience, predominantMuscleGroup, baseIsolation, type, restrictions, equipment) {
    return { idExercise, exName, frontDelta, middleDelta, backDelta, trapezoids, diamondshaped,
    biceps, triceps, bigChest, middleChest, smallChest, forearm, latissimus, straightBelly, externalOblique,
    internalOblique, transeverse, straightHips, quadriceps, bicepsHips, bigGluteal, middleGluteal,
    smallGluteal, gastrocnemius, soleus, experience, predominantMuscleGroup, baseIsolation, type, restrictions, equipment };
}

export default function AllUsersPage() {
    const dispatch = useDispatch();
    const { users, loading: loadingUsers, error: errorUsers } = useSelector(state => state.users);  
    const { questions, loading: loadingQuestions, error: errorQuestions } = useSelector(state => state.questions);
    const { items: exercises, status, error: errorExercises } = useSelector(state => state.exercises);
    const loadingExercises = status === 'loading';

    const [pageUsers, setPageUsers] = useState(1);
    const [pageQuestions, setPageQuestions] = useState(1);
    const [pageExercises, setPageExercises] = useState(1);
    const [limit] = useState(10);
    const [isModalOpen, setModalOpen] = useState(false); 
    const [isExModalOpen, setExModalOpen] = useState(false); 

    const rows = users.map(user => (
        createData(user.idUser, user.surname, user.name, 
            user.phone, user.birthdate, user.role, user.isBlocked)
    ));

    const questionRows = questions.map(question => (
        createQuestionData(question.userId, question.text, question.email)
    ));

    const exerciseRows = exercises.map(exercise => (
        createExerciseData(exercise.idExercise, exercise.exName, exercise.frontDelta, exercise.middleDelta,
        exercise.backDelta, exercise.trapezoids, exercise.diamondshaped, exercise.biceps, exercise.triceps, 
        exercise.bigChest, exercise.middleChest, exercise.smallChest, exercise.forearm, exercise.latissimus, 
        exercise.straightBelly, exercise.externalOblique, exercise.internalOblique, exercise.transeverse, 
        exercise.straightHips, exercise.quadriceps, exercise.bicepsHips, exercise.bigGluteal,
        exercise.middleGluteal, exercise.smallGluteal, exercise.gastrocnemius, exercise.soleus, exercise.experience, 
        exercise.predominantMuscleGroup, exercise.baseIsolation, exercise.type, exercise.restrictions, exercise.equipment)
    ));

   

    useEffect(() => {
        dispatch(fetchUsers({ page: pageUsers, limit }));
    }, [dispatch, pageUsers, limit]);

    useEffect(() => {
        dispatch(fetchQuestions({ page: pageQuestions, limit }));
    }, [dispatch, pageQuestions, limit]);

    useEffect(() => {
        dispatch(fetchExercises({ page: pageExercises, limit }));
    }, [dispatch, pageExercises, limit]);

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

    const handleNextPageExercises = () => {
        setPageExercises(prevPage => prevPage + 1);
    };

    const handlePrevPageExercises = () => {
        setPageExercises(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleAddUser = () => {
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close the modal
    };

    const closeExModal = () => {
        setModalOpen(false); // Close the modal
    };

    const handleBlock = (id) => {
        dispatch(toggleUserBlock(id)); // Dispatch the thunk to toggle the block status
    };

    const generateUserReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('User Report', 20, 20);
    
        doc.autoTable({
            head: [['ID', 'Name', 'Surname', 'Phone', 'Birthdate', 'Role', 'Blocked']],
            body: users.map(user => [
                user.idUser, user.name, user.surname, user.phone, user.birthdate, user.role, user.isBlocked ? 'Yes' : 'No'
            ]),
            startY: 30, // Start the table below the title
            styles: { fontSize: 12 } // Adjust font size as needed
        });
    
        doc.save('user_report.pdf');
    };
    
    
    const generateQuestionReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Question Report', 20, 20);
    
        doc.autoTable({
            head: [['User ID', 'Question', 'Email']],
            body: questions.map(question => [question.userId, question.text, question.email]),
            startY: 30,
            styles: { fontSize: 12 }
        });
    
        doc.save('question_report.pdf');
    };
    
    return (
        <>
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
                    <button onClick={generateUserReport}>Generate User Report</button>
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
                                    <TableCell>QID</TableCell>
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
                    <button onClick={generateQuestionReport}>Generate Question Report</button>
                </div>
            </div>
             <div className='feature'>
                <p className='title'>EXERCISES</p>
                {loadingExercises && <p>Loading exercises...</p>}
                {errorExercises && <p className="error">{errorExercises}</p>}
                {exercises.length > 0 ? (
                    <TableContainer 
                        component={Paper} 
                        sx={{ 
                            width: '90%',
                            maxHeight: '600px',
                            overflow: 'auto',
                            position: 'relative',
                            margin: '0 auto'
                        }}
                        >
                        <Table 
                            sx={{ 
                            minWidth: 650, 
                            fontFamily: 'Pixelify Font',
                            tableLayout: 'fixed'
                            }} 
                            aria-label="exercises table"
                            stickyHeader
                        >
                            <TableHead>
                            <TableRow>
                                {/* Фиксированная колонка EID */}
                                <TableCell sx={{
                                position: 'sticky',
                                left: 0,
                                zIndex: 3,
                                width: '80px',
                                backgroundColor: 'background.paper',
                                borderRight: '1px solid #e0e0e0',
                                fontWeight: 'bold'
                                }}>EID</TableCell>
                                
                                {/* Фиксированная колонка Exercise */}
                                <TableCell align="center" sx={{
                                position: 'sticky',
                                left: 80,
                                zIndex: 3,
                                width: '150px',
                                backgroundColor: 'background.paper',
                                borderRight: '1px solid #e0e0e0',
                                fontWeight: 'bold'
                                }}>Exercise</TableCell>
                                
                                {/* Остальные колонки */}
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Front delta</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Middle delta</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Back delta</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Trapezoids</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Diamond</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Biceps</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Triceps</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Big chest</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Middle chest</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Small chest</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Forearm</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Latissimus</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Straight belly</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>External oblique</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Internal oblique</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Transverse</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Straight hips</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Quadriceps</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Hip biceps</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Big gluteal</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Middle gluteal</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Small gluteal</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Gastrocnemius</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Soleus</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Experience</TableCell>
                                <TableCell align="center" sx={{ width: '120px', fontWeight: 'bold' }}>Predominant groups</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Base/isolation</TableCell>
                                <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Type</TableCell>
                                <TableCell align="center" sx={{ width: '120px', fontWeight: 'bold' }}>Restrictions</TableCell>
                                <TableCell align="center" sx={{ width: '120px', fontWeight: 'bold' }}>Equipment</TableCell>

                            </TableRow>
                            </TableHead>
                            
                            <TableBody>
                            {exerciseRows.map((exercise) => (
                                <TableRow key={exercise.idExercise} hover>
                                {/* Фиксированная ячейка EID */}
                                <TableCell 
                                    component="th" 
                                    scope="row"
                                    sx={{
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 2,
                                    width: '80px',
                                    backgroundColor: 'background.paper',
                                    borderRight: '1px solid #e0e0e0'
                                    }}
                                >
                                    {exercise.idExercise}
                                </TableCell>
                                
                                {/* Фиксированная ячейка Exercise */}
                                <TableCell 
                                    align="center"
                                    sx={{
                                    position: 'sticky',
                                    left: 80,
                                    zIndex: 2,
                                    width: '150px',
                                    backgroundColor: 'background.paper',
                                    borderRight: '1px solid #e0e0e0'
                                    }}
                                >
                                    {exercise.exName}
                                </TableCell>
                                
                                <TableCell align="center">{exercise.frontDelta || '-'}</TableCell>
                                <TableCell align="center">{exercise.middleDelta || '-'}</TableCell>
                                <TableCell align="center">{exercise.backDelta || '-'}</TableCell>
                                <TableCell align="center">{exercise.trapezoids || '-'}</TableCell>
                                <TableCell align="center">{exercise.diamondshaped || '-'}</TableCell>
                                <TableCell align="center">{exercise.biceps || '-'}</TableCell>
                                <TableCell align="center">{exercise.triceps || '-'}</TableCell>
                                <TableCell align="center">{exercise.bigChest || '-'}</TableCell>
                                <TableCell align="center">{exercise.middleChest || '-'}</TableCell>
                                <TableCell align="center">{exercise.smallChest || '-'}</TableCell>
                                <TableCell align="center">{exercise.forearm || '-'}</TableCell>
                                <TableCell align="center">{exercise.latissimus || '-'}</TableCell>
                                <TableCell align="center">{exercise.straightBelly || '-'}</TableCell>
                                <TableCell align="center">{exercise.externalOblique || '-'}</TableCell>
                                <TableCell align="center">{exercise.internalOblique || '-'}</TableCell>
                                <TableCell align="center">{exercise.transverse || '-'}</TableCell>
                                <TableCell align="center">{exercise.straightHips || '-'}</TableCell>
                                <TableCell align="center">{exercise.quadriceps || '-'}</TableCell>
                                <TableCell align="center">{exercise.bicepsHips || '-'}</TableCell>
                                <TableCell align="center">{exercise.bigGluteal || '-'}</TableCell>
                                <TableCell align="center">{exercise.middleGluteal || '-'}</TableCell>
                                <TableCell align="center">{exercise.smallGluteal || '-'}</TableCell>
                                <TableCell align="center">{exercise.gastrocnemius || '-'}</TableCell>
                                <TableCell align="center">{exercise.soleus || '-'}</TableCell>
                                <TableCell align="center">{exercise.experience || '-'}</TableCell>
                                <TableCell align="center">{exercise.predominantMuscleGroup || '-'}</TableCell>
                                <TableCell align="center">{exercise.baseIsolation || '-'}</TableCell>
                                <TableCell align="center">{exercise.type || '-'}</TableCell>
                                <TableCell align="center">{exercise.restrictions || '-'}</TableCell>
                                <TableCell align="center">{exercise.equipment || '-'}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                ) : (
                    <p>No exercises found.</p>
                )}
                <div className='buttons'>
                    <button onClick={handlePrevPageExercises} disabled={pageExercises === 1}>Previous</button>
                    <button onClick={handleNextPageExercises}>Next</button>
                </div>
            </div>

          

            <AddUserModal isOpen={isModalOpen} onClose={closeModal} /> 
            <p></p>
            <AddExerciseModal isOpen={isExModalOpen} onClose={closeExModal}/>

            
            
        </>
    );
}