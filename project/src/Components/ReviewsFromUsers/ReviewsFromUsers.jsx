import '../ReviewsFromUsers/ReviewsFromUsers.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../slices/reviewSlice';
import { fetchUsers } from '../../slices/userSlice';
import { Link } from 'react-router-dom';

export default function ReviewsFromUsers() {
    // const dispatch = useDispatch();
    // const reviewData = useSelector((state) => state.reviews.reviews);
    // const { users } = useSelector((state) => state.users);
    // const errorReviews = useSelector((state) => state.reviews.error);
    // const errorUsers = useSelector((state) => state.users.error); 
    // const [isLoading, setIsLoading] = useState(true); 


    // useEffect(() => {
    //     const fetchAllData = async () => {
    //       try {
    //         await Promise.all([dispatch(fetchReviews()), dispatch(fetchUsers())]);
    //         console.log(users)
    //       } catch (error) {
    //         console.error("Error fetching data:", error);
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     };
    
    //     fetchAllData();
    //   }, [dispatch]);


    // if (errorReviews) {
    //     return <p>Error fetching reviews: {errorReviews}</p>;
    // }

    // if (errorUsers) {
    //     return <p>Error fetching users: {errorUsers}</p>;
    // }

    // if (isLoading) {
    //     return <p>Loading reviews and users...</p>; 
    // }

    // const findUser = (idUser) => {
    //     const user = users.find(user => user.userId === idUser);
    //     return user ? user.name : "Unknown User"; 
    // };

    return (
        <div className="ReviewsFromUsers">
            <p className="reviewsTitle PixelFont">REVIEWS FROM OUR USERS</p>
            <div className="reviewsDiv">
                <div>
                    <img src="/data/images/leftArrow.png" alt="" />
                </div>
                <div className='fetchReviews'>
                    {/* {reviewData.map((review) => (
                        <div key={review.idReview} className='review'>
                            <p>{findUser(review.idUser)}</p> 
                            <p>{review.text}</p>
                        </div>
                    ))} */}
                </div>
                <div>
                    <img src="/data/images/rightArrow.png" alt="" />
                </div>
            </div>
            <Link to="/review" className='writeReviewButton'>WRITE A REVIEW</Link>
        </div>
    );
}