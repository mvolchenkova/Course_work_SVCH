import AboutSite from '../Components/AboutSite/AboutSite.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import HeaderUnlog from '../Components/HeaderUnlog/HeaderUnlog.jsx'
import StartPlanning from '../Components/StartPlanning/StartPlanning.jsx'

export default function StartPage(){
    return(
        <>
            <HeaderUnlog />
            <StartPlanning />
            <AboutSite />
            <Footer />
        </>
    )
}