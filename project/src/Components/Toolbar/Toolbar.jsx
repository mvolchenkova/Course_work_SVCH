import '../Toolbar/Toolbar.css'
import {Link} from 'react-router-dom'
import List from '../../MUIcomp/List'
export default function Toolbar(){
        return(
            <div className="toolbarDiv">
                <List className="PixelFont"></List>
            </div>
            // <div className="toolbarDiv">
            //     <div className="toolbar ArchivoFont">
            //     <div className="listDiv">
            //         <p className="name">TRAINING PLANS</p>
            //         <div className="list">
            //             <Link to="/allPlans" className="listItem">All training plans</Link>
            //             <Link to="/allExercises" className="listItem">All exercises</Link>
            //         </div>
            //     </div>
            //     <div className="listDiv">
            //         <p className="name">NUTRITION</p>
            //         <div className="list">
            //             <Link className="listItem">All nutrition plans</Link>
            //             <Link className="listItem">All recipes</Link>
            //         </div>
            //     </div>
            //     <div className="listDiv">
            //         <p className="name">ACCOUNT</p>
            //         <div className="list">
            //             <Link to="/profile" className="listItem">Account info</Link>
            //             <Link className="listItem">Schedule</Link>
            //             <Link className="listItem">Progress</Link>
            //         </div>
            //     </div>
            //     <div className="listDiv">
            //         <p className="name">RECOURSES</p>
            //         <div className="list">
            //             <Link className="listItem">Articles</Link>
            //             <Link className="listItem">Advices</Link>
            //         </div>
            //     </div>
            // </div>
            // </div>
            
        )
    }