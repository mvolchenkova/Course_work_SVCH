import './HeaderLog.css'
import {Link} from 'react-router-dom'
import Button from '../Button/Button.jsx'

export default function HeaderUnlog(){
        return(
            <header>
                <Link to="/"><img src="data/images/headerLogo.svg" alt="" /></Link>
                <div>
                    <Button className="logoutButton" text="LOG OUT" />
                    <button className="themeButton">LIGHT</button>
                    <button>EN</button>
                </div>

            </header>
        )
    }
