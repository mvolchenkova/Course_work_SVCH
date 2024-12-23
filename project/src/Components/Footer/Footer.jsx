
import { Link, useNavigate } from 'react-router-dom'
import '../Footer/Footer.css'
 


export default function Footer(){
    const navigate = useNavigate();
    const user = localStorage.getItem('user')
    const role = localStorage.getItem('role')
    const handleWriteReviewClick = (event) => {
        if (!user) {
            event.preventDefault(); 
            navigate('/authorization')
        }
    };

        return(
            <footer>
                <div className="footerLogo">
                    <img src="data/images/logo.png" alt=""></img>
                </div>
                <div className="footerBlocks">
                    <div className="contact">
                        <div className="contactBlock PixelFont">
                            <a href="https://t.me/hhrnyy" target="_blank" rel="noopener noreferrer" className='contactLink'>
                                <img src="data/images/footerTG.svg" alt="Telegram" />
                                <p>hhrnyy</p>
                            </a>
                        </div>
                        <div className="contactBlock PixelFont">
                            <a href="mailto:mvolchenkova7@gmail.com" target="_blank" rel="noopener noreferrer" className='contactLink'>
                                <img src="data/images/footerMAIL.svg" alt="Email" />
                                <p>mvolchenkova7@gmail.com</p>
                            </a>
                        </div>
                        <div className="contactBlock PixelFont">
                            <a href="https://instagram.com/hhoornyyy" target="_blank" rel="noopener noreferrer" className='contactLink'>
                                <img src="data/images/footerINST.svg" alt="Instagram" />
                                <p>hhoornyyy</p>
                            </a>
                        </div>
                    </div>
                    <div className="PixelFont footerLinks">
                        <Link to="/ask">Ask a question</Link>
                        <Link to="/review" onClick={handleWriteReviewClick}>Write a review</Link>
                        {role === 'user' && (
                            <Link to="/becomecoach">Become a coach</Link>
                        )}
                        {role === 'admin' && (
                            <Link to="/adminpanel">Admin Panel</Link>
                        )}
                    </div>
                </div>
            </footer>
        )
    }
