import React from 'react'


interface RatingProps{
    rating?: number;
    numReviews?: string;
    color?: any;
}

const Rating : React.FC<RatingProps> = ({rating, numReviews, color}) => {
    return (
        <div className='rating'>
            <span>
                <i style={{color: "#FFDE2B"}}className={rating && rating >=1 ? 'fas fa-star' :rating && rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
            <i style={{color: "#FFDE2B"}} className={rating && rating >=2 ? 'fas fa-star' :rating && rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
            <i style={{color: "#FFDE2B"}} className={rating && rating >=3 ? 'fas fa-star' :rating && rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
            <i style={{color: "#FFDE2B"}} className={rating && rating >=4 ? 'fas fa-star' :rating && rating >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
            <i style={{color: "#FFDE2B"}} className={rating && rating >=5 ? 'fas fa-star' :rating && rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>{numReviews && numReviews }</span>
        </div>
    )
}


export default Rating
