import '../ReviewsFromUsers/ReviewsFromUsers.css'
import Button from '../Button/Button.jsx'

export default function ReviewsFromUsers(){
    return(
        <>
            <div className="ReviewsFromUsers">
                <p className="reviewsTitle ArchivoBlackFont">REVIEWS FROM OUR USERS</p>
                <div className="reviewsDiv">
                    <div>
                        <img src="/data/images/leftArrow.svg" alt="" />
                    </div>
                    <div>

                    </div>
                    <div>
                        <img src="/data/images/rightArrow.svg" alt="" />
                    </div>
                </div>
                <Button text="WRITE A REVIEW" />
            </div>
        </>
    )
}