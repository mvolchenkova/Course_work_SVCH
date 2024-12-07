import HeaderLog from '../Components/HeaderLog/HeaderLog'
import Footer from '../Components/Footer/Footer'

export default function FavPlans(){
    return(
        <>
            <HeaderLog/>
            <div className="favPlansDiv">
                {/* <div className="planDiv">
                    {isLoading ? (
                        <p>Loading plans...</p>
                    ) : filteredPlans.length > 0 ? (
                        filteredPlans.map(plan => (
                            <div key={plan.id} className="planData PixelFont">
                                <Link to='/plan' onClick={() => handlePlanClick(plan)} style={{ textDecoration: 'none' }}>
                                    <img src={`http://localhost:5000/${plan.img}`} alt={plan.title} className="planImg" />
                                    <div className="planText">
                                        <b>{plan.title}</b>
                                        <p>{plan.author}</p>
                                        <p>{plan.amount} trainings</p>
                                    </div>
                                </Link>
                                <IconButton 
                                    aria-label="add to favorites" 
                                    onClick={() => dispatch(toggleFavorite(plan.id))}
                                >
                                    {favorites[plan.id] ? (
                                        <FavoriteIcon style={{ color: 'red' }} />
                                    ) : (
                                        <FavoriteBorder />
                                    )}
                                </IconButton>
                            </div>
                        ))
                    ) : (
                        <p>No plans found.</p>
                    )}
                </div> */}
            </div>
            <Footer/>
        </>
    )
}