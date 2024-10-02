import { Component } from 'react'
import '../Toolbar/Toolbar.css'

class Toolbar extends Component{
    render(){
        return(
            <div className="toolbarDiv">
                <div className="toolbar ArchivoFont">
                <div className="listDiv">
                    <p className="name">TRAINING PLANS</p>
                    <div className="list">
                        <p>All training plans</p>
                        <p>All exercises</p>
                    </div>
                </div>
                <div className="listDiv">
                    <p className="name">NUTRITION</p>
                    <div className="list">
                        <p>All nutrition plans</p>
                        <p>All recipes</p>
                    </div>
                </div>
                <div className="listDiv">
                    <p className="name">ACCOUNT</p>
                    <div className="list">
                        <p>Account info</p>
                        <p>Schedule</p>
                        <p>Progress</p>
                    </div>
                </div>
                <div className="listDiv">
                    <p className="name">RECOURSES</p>
                    <div className="list">
                        <p>Articles</p>
                        <p>Advices</p>
                    </div>
                </div>
            </div>
            </div>
            
        )
    }
}
export default Toolbar;