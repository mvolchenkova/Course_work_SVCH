import '../Categories/Categories.css'

export default function Categories(){
    return(
        <>
            <div className="CategoriesDiv">
                <p className="categTitle ArchivoBlackFont">Choose your aim:</p>
                <div className="categories">
                    <div className="category">
                        <p className="categName ArchivoFont">WEIGHT LOSS</p>
                        <img src="/data/images/weightLoss.svg" alt="" />
                    </div>
                    <div className="category">
                        <p className="categName ArchivoFont">FLEXIBILITY</p>
                        <img src="/data/images/flexibility.svg" alt="" />
                    </div>
                    <div className="category">
                        <p className="categName ArchivoFont">HEALTH</p>
                        <img src="/data/images/health.svg" alt="" />
                    </div>
                    <div className="category">
                        <p className="categName ArchivoFont">STRENGTH</p>
                        <img src="/data/images/strength.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}