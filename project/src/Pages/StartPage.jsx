import AboutSite from '../Components/AboutSite/AboutSite.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import HeaderLog from '../Components/HeaderLog/HeaderLog.jsx'
import ReviewsFromUsers from '../Components/ReviewsFromUsers/ReviewsFromUsers.jsx'
import StartPlanning from '../Components/StartPlanning/StartPlanning.jsx'


export default function StartPage(){
    return(
        <>
            <HeaderLog />
            <StartPlanning />
            <AboutSite />
            <ReviewsFromUsers/>
            <Footer />
        </>
    )
}