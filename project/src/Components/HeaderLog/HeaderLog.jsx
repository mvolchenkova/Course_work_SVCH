import './HeaderLog.css'
import {Link} from 'react-router-dom'
import Button from '../Button/Button.jsx'

export default function HeaderUnlog(){
        return(
            <header>
                <Link to="/"><img src="data/images/headerLogo.svg" alt="" /></Link>
                <div className="options">
                    <button className="logoutButton ArchivoFont">LOG OUT</button>
                    <select className="themeButton">
                        <option value="light">LIGHT</option>
                        <option value="dark">DARK</option>
                    </select>

                    <select className="langButton">
                        <option value="en">EN</option>
                        <option value="ru">RU</option>
                    </select>
                </div>

            </header>
        )
    }
