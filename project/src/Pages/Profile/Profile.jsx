import '../Profile/Profile.css'
import HeaderLog from '../../Components/HeaderLog/HeaderLog.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import ProfileSidebar from '../../Components/ProfileSidebar/ProfileSidebar.jsx'
import ProfileWindow from '../../Components/ProfileWindow/ProfileWindow.jsx'
import React, { useEffect, useState } from 'react';

export default function Profile(){
    
    return(
        <>
            <HeaderLog />
            <div className="profileDiv">
                <ProfileSidebar />
                <ProfileWindow />
            </div>
           
            <Footer />
        </>
    )
}