import { Component } from 'react'
import '../HeaderLog/HeaderLog.css'
import logo from '../../images/headerLogo.svg'

class Header extends Component{
    render(){
        return(
            <header>
                <img src={logo} alt="" />
                <div>
                    <p className="ArchivoBlackFont">LOG OUT</p>
                    
                </div>

            </header>
        )
    }
}

export default Header;