
import { Link } from 'react-router-dom'
import '../Footer/Footer.css'


export default function Footer(){
        return(
            <footer>
                <div className="footerLogo">
                    <img src="data/images/logo.png" alt=""></img>
                </div>
                <div className="footerBlocks">
                    <div className="contact">
                        <div className="contactBlock PixelFont">
                            <img src="data/images/footerTG.svg" alt="" />
                            <p>hhrnyy</p>
                        </div>
                        <div className="contactBlock PixelFont">
                            <img src="data/images/footerMAIL.svg" alt="" />
                            <p>mvolchenkova7@gmail.com</p>
                        </div>
                        <div className="contactBlock PixelFont">
                            <img src="data/images/footerINST.svg" alt="" />
                            <p>hhoornyyy</p>
                        </div>
                       
                    </div>
                    <div className="PixelFont footerLinks">
                        <p>Ask a question</p>
                        <Link to="/becomecoach">Become a coach</Link>
                        <Link to = "/homePage">home</Link>
                    </div>
                </div>
            </footer>
        )
    }
