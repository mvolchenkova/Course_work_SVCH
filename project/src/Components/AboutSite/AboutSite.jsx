import '../AboutSite/AboutSite.css'

export default function AboutSite(){
    return(
        <>
            <div className="AboutSiteDiv">
                <div className="AboutSiteBlock">
                    <img src="/data/images/workoutGirl.png" alt="" className="runGirlImg"/>
                    <div>
                        <p className="blockName PixelFont">Discover Tailored Workouts</p>
                        <p className="blockText PixelFont">Unleash your full potential by customizing workouts that suit your  fitness goals and preferences. Whether you're aiming to build strength,  improve endurance, or simply stay active, our workout tracker empowers  you to select routines that resonate with your body and spirit. From  high-intensity interval training to calming yoga flows, the diverse  range of exercises caters to all levels of expertise. Embrace the  freedom to curate a fitness regimen that not only challenges you but  also inspires you to push beyond your limits.</p>
                    </div>
                </div>
                <div className="AboutSiteBlock">
                    <div>
                        <p className="blockName PixelFont">Nutritious Recipes for Fuel</p>
                        <p className="blockText PixelFont">Elevate your fitness journey with a collection of nutritious recipes  designed to fuel your body for optimal performance. Explore a variety of dishes that blend taste and health, providing the essential nutrients  needed to support your active lifestyle. From protein-packed smoothie  bowls to energy-boosting snacks, these recipes are crafted to keep you  energized and satisfied throughout the day. Embrace the art of mindful  eating and discover how the right balance of nutrients can enhance your  workouts and contribute to your overall well-being.</p>
                    </div>
                    <img src="/data/images/cookingGirl.png" alt="" className="cookGirlImg"/>
                </div>
            </div>
        </>
    )
}