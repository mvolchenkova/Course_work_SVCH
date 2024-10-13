import '../OurGoal/OurGoal.css'
import Button from '../Button/Button.jsx'
export default function OurGoal(){
    return(
        <>
            <div className="backDiv"></div>
            <div className="goalDiv">
                <img src="/data/images/ourGoalImg.svg" alt="" />
                <div>
                    <p className="ArchivoBlackFont goalText">Our main goal is to make you better!</p>
                    <Button text="SEE PROGRESS"/>
                </div>
            </div>
        </>
    )
}