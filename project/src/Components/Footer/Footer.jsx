
import '../Footer/Footer.css'


export default function Footer(){
        return(
            <footer>
                <div className="footerLogo">
                    <img src="data/images/FooterLogo.svg" alt=""></img>
                </div>
                <div className="footerBlocks">
                    <div className="contact">
                        <div className="contactBlock">
                            <img src="data/images/footerTG.svg" alt="" />
                            <p>hhrnyy</p>
                        </div>
                        <div className="contactBlock">
                            <img src="data/images/footerMAIL.svg" alt="" />
                            <p>mvolchenkova7@gmail.com</p>
                        </div>
                        <div className="contactBlock">
                            <img src="data/images/footerINST.svg" alt="" />
                            <p>hhoornyyy</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </footer>
        )
    }
