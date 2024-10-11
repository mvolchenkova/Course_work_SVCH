import './HeaderLog.css'

export default function HeaderUnlog(){
        return(
            <header>
                <img src="data/images/headerLogo.svg" alt="" />
                <div>
                    <button>LOG OUT</button>
                    <button className="themeButton">LIGHT</button>
                    <button>EN</button>
                </div>

            </header>
        )
    }
