import '../TrackYourProgress/TrackYourProgress.css'
import Button from '../Button/Button.jsx'

export default function TrackYourProgress(){
    return(
        <>
            <div className="textDiv">
                <p className="trackProgressTitle ArchivoBlackFont">TRACK YOUR PROGRESS</p>
                <p className="trackProgressText ArchivoFont">Do you also keep a training diary and track your progress on a piece of paper? We provide a personal account with progress tracking capabilities for everyone! Write down your data and progress! Set yourself goals and achieve them!</p>
            </div>
            <div className="featuresDiv ArchivoFont">
                <div className="featDiv">
                    <img src="/data/images/diary.svg" alt="" />
                    <p className="featName">TRAINING DIARY</p>
                </div>
                <div className="featDiv">
                    <p className="featName">BODY MEASUREMENTS</p>
                    <img src="/data/images/measurements.svg" alt="" />
                </div>
                <div className="featDiv">
                    <img src="/data/images/history.svg" alt="" />
                    <p className="featName">HISTORY OF PROGRESS</p>
                </div>
                <div className="featDiv">
                    <p className="featName">MEAL PLANNING</p>
                    <img src="/data/images/mealPlanning.svg" alt="" />
                </div>
            </div>
            <div className="whereToStartDiv">
                <p className="whereToStart ArchivoBlackFont">DON'T KNOW WHERE TO START?</p>
                <Button text="CHOOSE YOUR TRAINING PLAN NOW" />
            </div>
            
        </>
    )
}