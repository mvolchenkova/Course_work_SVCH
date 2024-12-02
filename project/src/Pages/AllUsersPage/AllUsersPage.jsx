import '../AllUsersPage/AllUsersPage.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../slices/userSlice'; 
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';


export default function AllUsersPage() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.users);
    const [page, setPage] = useState(1);
    const [limit] = useState(10); 

    useEffect(() => {
        dispatch(fetchUsers({ page, limit }));
    }, [dispatch, page, limit]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <>
            <HeaderLog />
            <div>
                {loading && <p>Loading users...</p>}
                {error && <p className="error">{error}</p>}
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
            </div>
            <div className='buttons'>
                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
                    
            <Footer />
        </>
    );
}