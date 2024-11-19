import '../ReviewsFromUsers/ReviewsFromUsers.css'
import Button from '../Button/Button.jsx'
import React, { useEffect, useState } from 'react';

export default function ReviewsFromUsers(){

    const [reviewData, setreviewData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/jsonFiles/reviews.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setreviewData(data);
            } catch (error) {
                console.error('Error fetching the reviews:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <div className="ReviewsFromUsers">
                <p className="reviewsTitle ArchivoBlackFont">REVIEWS FROM OUR USERS</p>
                <div className="reviewsDiv">
                    <div>
                        <img src="/data/images/leftArrow.svg" alt="" />
                    </div>
                    <div>
                        {reviewData.map((review) => (
                        <div>
                            <p>{review.name}</p>
                            <p>{review.review}</p>
                        </div>
                    ))} 
                    </div>
                    <div>
                        <img src="/data/images/rightArrow.svg" alt="" />
                    </div>
                </div>
                <Button text="WRITE A REVIEW" />
            </div>
        </>
    )
}