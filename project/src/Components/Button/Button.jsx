import '../Button/Button.css'
import {Link} from 'react-router-dom'

export default function Button({ text, link }) {
    return (
        <>
            <Link to={link}>
                <button className="button PixelFont">{text}</button>
            </Link>
            
        </>
    );
}