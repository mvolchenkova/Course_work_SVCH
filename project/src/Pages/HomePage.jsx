 import HeaderLog from '../Components/HeaderLog/HeaderLog.jsx'
 import Toolbar from '../Components/Toolbar/Toolbar.jsx'
import TrackYourProgress from '../Components/TrackYourProgress/TrackYourProgress.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import OurGoal from '../Components/OurGoal/OurGoal.jsx'
import ReviewsFromUsers from '../Components/ReviewsFromUsers/ReviewsFromUsers.jsx'
 export default function HomePage(){
    return(
        <>
            <HeaderLog />
            <Toolbar />
            <TrackYourProgress />
            <OurGoal />
            <ReviewsFromUsers />
            <Footer />
        </>
    )
 }