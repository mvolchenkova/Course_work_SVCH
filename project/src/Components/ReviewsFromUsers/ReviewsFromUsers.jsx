import '../ReviewsFromUsers/ReviewsFromUsers.css';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../slices/reviewSlice';
import { getAllUsersThunk } from '../../slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import Star from '../Star/Star'; 

export default function ReviewsFromUsers() {
    const dispatch = useDispatch();
    const reviewData = useSelector((state) => state.reviews.reviews);
    const { users } = useSelector((state) => state.users);
    const errorReviews = useSelector((state) => state.reviews.error);
    const errorUsers = useSelector((state) => state.users.error); 
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const reviewsRef = useRef(null); 

    const handleWriteReviewClick = (event) => {
        if (!user) {
            event.preventDefault(); 
            navigate('/authorization');
        }
    };

    const handleScroll = (direction) => {
        if (reviewsRef.current) {
            const cardWidth = reviewsRef.current.children[0].offsetWidth; // Get width of the first card
            reviewsRef.current.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
          try {
            await Promise.all([dispatch(fetchReviews()), dispatch(getAllUsersThunk())]);
            console.log(users);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAllData();
    }, [dispatch]);

    if (errorReviews) {
        return <p>Error fetching reviews: {errorReviews}</p>;
    }

    if (errorUsers) {
        return <p>Error fetching users: {errorUsers}</p>;
    }

    if (isLoading) {
        return <p>Loading reviews and users...</p>; 
    }

    return (
        <div className="ReviewsFromUsers">
            <p className="reviewsTitle smalle">REVIEWS FROM OUR USERS</p>
            <div className="reviewsDiv">
                <div>
                    <img 
                        src="/data/images/leftArrow.png" 
                        alt="" 
                        onClick={() => handleScroll(-1)} // Scroll left
                    />
                </div>
                <div className='fetchReviews' ref={reviewsRef}>
                    {reviewData.map((review) => (
                        <div key={review.idReview} className='review'>
                            <div className="nameStar">
                                <p className='username'>{review.username}</p> 
                                <div className='rating'>
                                    {[...Array(5)].map((_, index) => (
                                        <Star key={index} filled={index < review.rating} /> 
                                    ))}
                                </div>
                            </div>
                            <p>{review.text}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <img 
                        src="/data/images/rightArrow.png" 
                        alt="" 
                        onClick={() => handleScroll(1)} // Scroll right
                    />
                </div>
            </div>
            <Link to="/review" className='writeReviewButton' onClick={handleWriteReviewClick}>WRITE A REVIEW</Link>
        </div>
    );
}