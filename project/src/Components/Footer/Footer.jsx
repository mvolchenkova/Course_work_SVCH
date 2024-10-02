import logo from '../../images/FooterLogo.svg'
import telegram from '../../images/footerTG.svg'
import mail from '../../images/footerMAIL.svg'
import inst from '../../images/footerINST.svg'

import { Component } from 'react'
import '../Footer/Footer.css'


class Footer extends Component{
    render(){
        return(
            <footer>
                <div className="footerLogo">
                    <img src={logo} alt=""></img>
                </div>
                <div className="footerBlocks">
                    <div className="contact">
                        <div className="contactBlock">
                            <img src={telegram} alt="" />
                            <p>hhrnyy</p>
                        </div>
                        <div className="contactBlock">
                            <img src={mail} alt="" />
                            <p>mvolchenkova7@gmail.com</p>
                        </div>
                        <div className="contactBlock">
                            <img src={inst} alt="" />
                            <p>hhoornyyy</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;