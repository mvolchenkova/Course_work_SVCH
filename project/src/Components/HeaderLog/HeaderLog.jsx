import './HeaderLog.css'
import {Link} from 'react-router-dom'
import Button from '../Button/Button.jsx'

export default function HeaderUnlog(){
        return(
            <header>
                <Link to="/"><img src="data/images/logo.png" alt="" /></Link>
                <div className="options">
                    <button className="logoutButton PixelFont">LOG OUT</button>
                </div>

            </header>
        )
    }
