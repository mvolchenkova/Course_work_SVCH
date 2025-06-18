import AboutSite from '../Components/AboutSite/AboutSite.jsx'
import ReviewsFromUsers from '../Components/ReviewsFromUsers/ReviewsFromUsers.jsx'
import StartPlanning from '../Components/StartPlanning/StartPlanning.jsx'


export default function StartPage(){
    return(
        <>
            <StartPlanning />
            <AboutSite />
            <ReviewsFromUsers/>
        </>
    )
}