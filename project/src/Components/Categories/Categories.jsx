import '../Categories/Categories.css'

export default function Categories(){
    return(
        <>
            <div className="CategoriesDiv">
                <p className="categTitle  PixelFont">Choose your aim:</p>
                <div className="categories">
                    <div className="category">
                        <p className="categName PixelFont">WEIGHT LOSS</p>
                        <img src="/data/images/tr1.png" alt="" />
                    </div>
                    <div className="category">
                        <p className="categName PixelFont">FLEXIBILITY</p>
                        <img src="/data/images/tr2.png" alt="" />
                    </div>
                    <div className="category">
                        <p className="categName PixelFont">HEALTH</p>
                        <img src="/data/images/tr3.png" alt="" />
                    </div>
                    <div className="category">
                        <p className="categName PixelFont">STRENGTH</p>
                        <img src="/data/images/tr4.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}