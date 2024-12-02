import '../Account/Account.css'
import { useSelector, useDispatch } from 'react-redux'; 
import { deleteUser } from '../../slices/userSlice'

export default function Account(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.currentUser);

    const handleOnDelete = (userId) => {
        dispatch(deleteUser({userId}))
    }
    return(
        <main className="accMain">
            <div className="accDiv">
                <div>
                    {currentUser ? (
                        <div className='acc'>
                            <div className="accDiv1">
                                {currentUser.sex === 'male' ? (
                                    <img src="/data/images/boyProfile.png" alt="Boy Profile" className="profileImageAcc" />
                                ) : (
                                    currentUser.sex === 'female'&& (
                                        <img src="data/images/girlProfile.png" alt="Girl Profile" className="profileImageAcc" />
                                    )
                                )}
                                <div className="nameSurname">
                                    <p className="userName PixelFont">{currentUser.name}</p>
                                    <p className='userName PixelFont'>{currentUser.surname}</p>
                                </div>
                                
                            </div>
                            <div className='otherInfo'>
                                <p>PHONE: {currentUser.phone}</p>
                                <p>BIRTH DATE: {currentUser.birthdate}</p>
                                <button>CHANGE PASSWORD</button>
                            </div>
                            <div>
                            <button onClick={() => handleOnDelete(currentUser.idUser)}>DELETE ACCOUNT</button>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div>

                </div>
            </div>
        </main>
    )
}